import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const COMPANIES = [
    { id: 'katilimevim', name: 'Katılımevim', feeRate: 0.07, applyUrl: 'https://www.katilimevim.com.tr/basvuru' },
    { id: 'eminevim', name: 'Eminevim', feeRate: 0.08, applyUrl: 'https://www.eminevim.com/online-basvuru' },
    { id: 'fuzul', name: 'Fuzul Tasarruf', feeRate: 0.075, applyUrl: 'https://fuzul.com.tr/hemen-basvur' },
    { id: 'sinpas', name: 'Sinpaş Tasarruf', feeRate: 0.080, applyUrl: 'https://www.sinpastasarruf.com.tr/basvuru' },
    { id: 'birevim', name: 'Birevim', feeRate: 0.075, applyUrl: 'https://www.birevim.com/basvuru' },
    { id: 'imece', name: 'İmece Tasarruf', feeRate: 0.070, applyUrl: 'https://imece.com/basvuru' },
    { id: 'albayrak', name: 'Albayrak Tasarruf', feeRate: 0.080, applyUrl: 'https://albayraktasarruf.com.tr/basvuru' },
    { id: 'emlakkatilim', name: 'Emlak Katılım', feeRate: 0.065, applyUrl: 'https://www.emlakkatilim.com.tr/basvuru' },
    { id: 'adil', name: 'Adil Tasarruf', feeRate: 0.070, applyUrl: 'https://adiltasarruf.com.tr/basvuru' },
];

export default function Home() {
    const [targetAmount, setTargetAmount] = useState(3000000);
    const [downPayment, setDownPayment] = useState(0);
    const [manualMonthlyPayment, setManualMonthlyPayment] = useState(25000);
    const [planType, setPlanType] = useState('myPlan');
    const [category, setCategory] = useState('ev');
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const firstInputRef = useRef(null);
    const calculatorRef = useRef(null);

    const target40 = targetAmount * 0.4;
    const currentMonthlyInLogic = manualMonthlyPayment > 0 ? manualMonthlyPayment : Math.ceil((targetAmount * 1.07 - downPayment) / 120);
    const currentTotalByMonth6 = downPayment + (currentMonthlyInLogic * 5);
    const isEligibleFor6 = currentTotalByMonth6 >= target40;

    const requiredMonthlyFor6 = Math.max(0, Math.ceil((target40 - downPayment) / 5));
    const requiredDownFor6 = Math.max(0, Math.ceil(target40 - (currentMonthlyInLogic * 5)));

    const formatRawValue = (val) => {
        if (val === undefined || val === null || val === '') return '';
        const raw = val.toString().replace(/\D/g, '');
        return raw ? parseInt(raw, 10).toLocaleString('tr-TR') : '';
    };

    const parseFormattedValue = (val) => {
        const cleanVal = val.toString().replace(/\D/g, '');
        return cleanVal ? parseInt(cleanVal, 10) : 0;
    };

    const calculatePlan = (target, down, company, type, customMonthly) => {
        const fee = target * company.feeRate;
        const monthlyPayment = customMonthly > 0 ? customMonthly : Math.ceil((target - down) / 120);

        let deliveryMonth = 6;
        let calculatedTotalMonths = Math.ceil((target - down) / monthlyPayment);

        if (type === 'percent40' || type === 'myPlan') {
            const currentTarget40 = target * 0.4;
            const remainingFor40 = currentTarget40 - down;
            if (remainingFor40 <= 0) {
                deliveryMonth = 6;
            } else if (monthlyPayment > 0) {
                const monthsToReach40 = Math.ceil(remainingFor40 / monthlyPayment) + 1;
                deliveryMonth = Math.max(6, monthsToReach40);
            }
        } else if (type === 'midTerm') {
            deliveryMonth = Math.max(6, Math.ceil(calculatedTotalMonths / 2));
        } else if (type === 'lottery') {
            deliveryMonth = "1 - " + Math.ceil(calculatedTotalMonths / 2);
        }

        const getLabel = (t) => {
            switch (t) {
                case 'percent40': return '%40 KURALI';
                case 'midTerm': return 'VADE ORTASI';
                case 'lottery': return 'ÇEKİLİŞLİ';
                default: return 'SERBEST PLAN';
            }
        };

        return {
            company: company.name,
            companyId: company.id,
            applyUrl: company.applyUrl,
            fee,
            deliveryMonth,
            monthlyPayment,
            totalMonths: calculatedTotalMonths,
            typeLabel: getLabel(type),
            target: targetAmount,
            down: downPayment
        };
    };

    useEffect(() => {
        const calculatedResults = COMPANIES.map(c => calculatePlan(targetAmount, downPayment, c, planType, manualMonthlyPayment));
        setResults(calculatedResults);
    }, [targetAmount, downPayment, planType, manualMonthlyPayment, target40]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    const handleOpenDetails = (res) => {
        setSelectedResult(res);
        setIsModalOpen(true);
    };

    const generateInstallments = (res) => {
        const list = [];
        const initialDebt = res.target - res.down;
        let debt = initialDebt;

        for (let i = 1; i <= res.totalMonths; i++) {
            const isDelivery = i === res.deliveryMonth;
            const currentPayment = Math.min(debt, res.monthlyPayment);
            debt -= currentPayment;

            list.push({
                month: i,
                payment: currentPayment,
                remainingDebt: Math.max(0, debt),
                isDelivery
            });
        }
        return list;
    };

    const handlePlanChange = (type) => {
        setPlanType(type);
        if (type === 'percent40') {
            setTargetAmount(1000000);
            setDownPayment(0);
            setManualMonthlyPayment(80000);
        }
        setTimeout(() => {
            if (firstInputRef.current) {
                const yOffset = -150;
                const element = firstInputRef.current;
                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                element.focus({ preventScroll: true });
            }
        }, 100);
    };

    const formatCurrency = (val) => new Intl.NumberFormat('tr-TR').format(val);

    return (
        <main className="main">
            <Helmet>
                <title>Ana Sayfa - En Uygun Katılım Planlarını Karşılaştır</title>
                <meta name="description" content="Türkiye'nin en iyi katılım evim, tasarruf finansman şirketlerinin tekliflerini karşılaştırın. Faizsiz ev ve araba sahibi olun." />
            </Helmet>

            {isModalOpen && selectedResult && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content glass-card shadow-lg" onClick={e => e.stopPropagation()}>
                        <div className="modal-inner">
                            <div className="modal-sidebar">
                                <div className="modal-header">
                                    <div className="modal-header-top">
                                        <h2>{selectedResult.company}</h2>
                                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                                    </div>
                                    <span className="modal-badge">{selectedResult.typeLabel}</span>
                                </div>

                                <div className="modal-summary-grid">
                                    <div className="m-detail">
                                        <label>Bedel</label>
                                        <span>{formatCurrency(selectedResult.target)} TL</span>
                                    </div>
                                    <div className="m-detail">
                                        <label>Peşinat</label>
                                        <span>{formatCurrency(selectedResult.down)} TL</span>
                                    </div>
                                    <div className="m-detail">
                                        <label>Taksit</label>
                                        <span className="text-highlight">{formatCurrency(selectedResult.monthlyPayment)} TL</span>
                                    </div>
                                    <div className="m-detail delivery-detail">
                                        <label>Tahmini Teslimat</label>
                                        <span className="delivery-month-value">
                                            {typeof selectedResult.deliveryMonth === 'string'
                                                ? selectedResult.deliveryMonth + ". Ay"
                                                : selectedResult.deliveryMonth + ". Ay"}
                                        </span>
                                    </div>
                                </div>

                                <div className="lead-form-section">
                                    <h3>Resmi Başvuru Sayfası</h3>
                                    <p>Bu plan için şirket temsilcisi ile görüşmek ve resmi süreci başlatmak için şirketin başvuru sayfasına yönlendirileceksiniz.</p>
                                    <a href={selectedResult.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-submit-lead-link" onClick={() => {
                                        window.dataLayer = window.dataLayer || [];
                                        window.dataLayer.push({
                                            'event': 'offer_click',
                                            'company_id': selectedResult.companyId,
                                            'company_name': selectedResult.company,
                                            'plan_type': selectedResult.typeLabel
                                        });
                                        console.log(`Lead Clicked: ${selectedResult.companyId}`);
                                    }}>
                                        Şirket Sayfasına Git ve Başvur
                                    </a>
                                    <p className="form-footer">Başvurunuz doğrudan ilgili finansman şirketi tarafından alınacaktır.</p>
                                </div>
                            </div>

                            <div className="modal-main">
                                <div className="installment-scroll-area">
                                    <table className="installment-table">
                                        <thead>
                                            <tr>
                                                <th>Taksit</th>
                                                <th>Ödeme Tutarı</th>
                                                <th>Kalan Borç</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {generateInstallments(selectedResult).map((item, idx) => (
                                                <tr key={idx} className={item.isDelivery ? 'delivery-row highlight-green' : ''}>
                                                    <td>{item.month}. Ay</td>
                                                    <td>{formatCurrency(item.payment)} TL</td>
                                                    <td className="debt-cell">
                                                        <span>{formatCurrency(item.remainingDebt)} TL</span>
                                                        {item.isDelivery && <span className="delivery-tag-inline">TESLİMAT</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="hero">
                <div className="container">
                    <div className="category-toggle-container hero-categories">
                        {['ev', 'araba', 'arsa'].map(cat => (
                            <button
                                key={cat}
                                className={category === cat ? 'active' : ''}
                                onClick={() => {
                                    setCategory(cat);
                                    setTimeout(() => {
                                        calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 150);
                                }}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <h1>Hayalindeki <span className="text-secondary">{category.toUpperCase()}</span> kapında!</h1>
                    <p>Siz sadece hayalinizi kurun, biz Türkiye'nin en seçkin BDDK onaylı şirketlerinden tekliflerinizi alarak size en uygun olanı bulalım.</p>
                </div>
            </section>

            <section className="calculator-section">
                <div className="container">
                    <div className="calculator-grid">
                        <aside ref={calculatorRef} className="calculator-card glass-card">
                            <h3>Hesaplama Aracı</h3>
                            <div className="plan-type-selector">
                                <label>Plan Türü Seçin</label>
                                <div className="type-buttons">
                                    <button className={planType === 'myPlan' ? 'active' : ''} onClick={() => handlePlanChange('myPlan')}>Benim Planım</button>
                                    <button className={planType === 'percent40' ? 'active' : ''} onClick={() => handlePlanChange('percent40')}>6. Ay Teslimat</button>
                                    <button className={planType === 'midTerm' ? 'active' : ''} onClick={() => handlePlanChange('midTerm')}>Vade Ortası</button>
                                    <button className={planType === 'lottery' ? 'active' : ''} onClick={() => handlePlanChange('lottery')}>Çekilişli</button>
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Alınacak {category.charAt(0).toUpperCase() + category.slice(1)} Bedeli</label>
                                <div className="input-wrapper">
                                    <input ref={firstInputRef} type="text" value={formatRawValue(targetAmount)} onChange={(e) => setTargetAmount(parseFormattedValue(e.target.value))} />
                                    <span className="currency">TL</span>
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Peşinat Miktarı</label>
                                <div className="input-wrapper">
                                    <input type="text" value={formatRawValue(downPayment)} onChange={(e) => setDownPayment(parseFormattedValue(e.target.value))} />
                                    <span className="currency">TL</span>
                                </div>
                            </div>
                            <div className="input-group manual-payment-group">
                                <label>Aylık Ödeme Gücü (Taksit)</label>
                                <div className="input-wrapper">
                                    <input type="text" placeholder="Örn: 50.000" value={manualMonthlyPayment === 0 ? '' : formatRawValue(manualMonthlyPayment)} onChange={(e) => setManualMonthlyPayment(parseFormattedValue(e.target.value))} />
                                    <span className="currency">TL</span>
                                </div>
                            </div>
                        </aside>

                        <div className="results-content">
                            <div className="results-header"><h3>En Uygun Teklifler</h3></div>
                            {planType === 'percent40' && (
                                <div className={`info-panel premium-frame ${isEligibleFor6 ? 'success' : 'warning'}`}>
                                    <div className="info-header"><div className="pulse-icon"></div><strong>6. AY TESLİMAT SİMÜLASYONU</strong></div>
                                    <div className="info-body">
                                        <p>6. ayda teslimatın anahtarı olan <span className="highlight-text">%40 barajı ({formatCurrency(target40)} TL)</span> için planınız analiz edildi.</p>
                                        {!isEligibleFor6 ? (
                                            <div className="marginal-solutions-grid">
                                                <div className="solution-card"><span className="sol-label">YOL A</span><div className="sol-content"><p>Taksit tutarını güncelleyin:</p><button className="btn-optimize-marginal" onClick={() => setManualMonthlyPayment(requiredMonthlyFor6)}>{formatCurrency(requiredMonthlyFor6)} TL Taksit Yap</button></div></div>
                                                <div className="solution-card shadow-text sol-divider">VEYA</div>
                                                <div className="solution-card"><span className="sol-label">YOL B</span><div className="sol-content"><p>Peşinata ekleme yapın:</p><button className="btn-optimize-marginal alt" onClick={() => setDownPayment(requiredDownFor6)}>Peşinatı {formatCurrency(requiredDownFor6)} TL Yap</button></div></div>
                                            </div>
                                        ) : (
                                            <div className="success-show"><span>🥇 MÜKEMMEL PLAN! 6. AYDA TESLİMATINIZ GARANTİLENMİŞTİR.</span></div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="results-list">
                                {results.slice().sort((a, b) => a.fee - b.fee).map((res, index) => (
                                    <div key={index} className="result-card glass-card">
                                        <div className="company-info">
                                            <div className="company-meta"><span className="company-name">{res.company}</span><span className="plan-type-badge">{res.typeLabel}</span></div>
                                            <span className={`delivery-badge ${res.deliveryMonth === 6 ? 'highlight' : ''}`}>
                                                {typeof res.deliveryMonth === 'string' ? "TAHMİNİ " + res.deliveryMonth + ". AY" : res.deliveryMonth + ". AY TESLİMAT"}
                                            </span>
                                        </div>
                                        <div className="payment-details">
                                            <div className="detail"><label>Aylık Taksit</label><span className="text-highlight">{formatCurrency(res.monthlyPayment)} TL</span></div>
                                            <div className="detail"><label>Katılım Bedeli</label><span>{formatCurrency(res.fee)} TL</span></div>
                                            <div className="detail"><label>Toplam Vade</label><span>{res.totalMonths} Ay</span></div>
                                        </div>
                                        <button className="btn-apply" onClick={() => handleOpenDetails(res)}>Taksitleri Gör ve Ücretsiz Başvur</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
