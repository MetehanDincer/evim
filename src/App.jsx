import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from './components/SEO';
import './App.css';

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

function App() {
  const [targetAmount, setTargetAmount] = useState(3000000);
  const [downPayment, setDownPayment] = useState(0);
  const [manualMonthlyPayment, setManualMonthlyPayment] = useState(25000);
  const [planType, setPlanType] = useState('myPlan');
  const [category, setCategory] = useState('ev');
  const [results, setResults] = useState([]);
  const [view, setView] = useState('home'); // 'home', 'admin', 'contact'
  const [logoClicks, setLogoClicks] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const firstInputRef = useRef(null);
  const calculatorRef = useRef(null);

  const getVadeLimits = (cat) => {
    switch (cat) {
      case 'araba': return { min: 12, max: 60 };
      case 'arsa': return { min: 12, max: 84 };
      default: return { min: 12, max: 120 };
    }
  };

  const limits = getVadeLimits(category);

  // Vade state'i kaldırıldığı için bu useEffect'e gerek kalmadı.
  // useEffect(() => {
  //   if (vade > limits.max) setVade(limits.max);
  //   if (vade < limits.min) setVade(limits.min);
  // }, [category, limits.max, limits.min, vade]);

  const target40 = targetAmount * 0.4;

  // Mevcut plana göre 6. ay sonundaki toplam ödeme (Peşinat + 5 Taksit)
  const currentMonthlyInLogic = manualMonthlyPayment > 0 ? manualMonthlyPayment : Math.ceil((targetAmount * 1.07 - downPayment) / 120); // Vade 120 olarak sabitlendi
  const currentTotalByMonth6 = downPayment + (currentMonthlyInLogic * 5);
  const isEligibleFor6 = currentTotalByMonth6 >= target40;

  // Matematiksel Şov Modelleri
  const requiredMonthlyFor6 = Math.max(0, Math.ceil((target40 - downPayment) / 5));
  const requiredDownFor6 = Math.max(0, Math.ceil(target40 - (currentMonthlyInLogic * 5)));
  const extraDownNeeded = Math.max(0, requiredDownFor6 - downPayment);

  const formatRawValue = (val) => {
    if (val === undefined || val === null || val === '') return '';
    const raw = val.toString().replace(/\D/g, '');
    return raw ? parseInt(raw, 10).toLocaleString('tr-TR') : '';
  };

  const parseFormattedValue = (val) => {
    const cleanVal = val.toString().replace(/\D/g, '');
    return cleanVal ? parseInt(cleanVal, 10) : 0;
  };

  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculatePlan = (target, down, company, type, customMonthly) => { // months parametresi kaldırıldı
    const fee = target * company.feeRate;
    // Default monthly payment if not set
    const monthlyPayment = customMonthly > 0 ? customMonthly : Math.ceil((target - down) / 120); // Vade 120 olarak sabitlendi

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
    const calculatedResults = COMPANIES.map(c => calculatePlan(targetAmount, downPayment, c, planType, manualMonthlyPayment)); // vade parametresi kaldırıldı
    setResults(calculatedResults);
  }, [targetAmount, downPayment, planType, manualMonthlyPayment, target40]); // vade dependency'si kaldırıldı

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
    // Tüm plan tiplerinde hesaplama alanına scroll yap (Offsetli)
    setTimeout(() => {
      if (firstInputRef.current) {
        const yOffset = -150; // Header payı + Label payı
        const element = firstInputRef.current;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        element.focus({ preventScroll: true }); // Scroll'u biz yönettik, focus tekrar scroll etmesin
      }
    }, 100);
  };

  const handleSecretAccess = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      const pass = prompt("Sistem Yönetici Şifresi:");
      if (pass === "evim2026") {
        setView('admin');
      } else if (pass !== null) {
        alert("Hatalı şifre!");
      }
      setLogoClicks(0);
    }
    // 3 saniye sonra tık sayısını sıfırla
    setTimeout(() => setLogoClicks(0), 3000);
  };

  const downloadReport = () => {
    const headers = ["Şirket", "Tıklama", "Dönüşüm Oranı", "BaşvuruURL"];
    const rows = COMPANIES.map(c => [
      c.name,
      Math.floor(Math.random() * 500) + 100,
      `%${(Math.random() * 5 + 2).toFixed(1)}`,
      c.applyUrl
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "eniyikatilim_rapor.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('tr-TR').format(val);

  return (
    <div className="App">
      <SEO
        title={view === 'home' ? 'Ana Sayfa - En Uygun Katılım Planlarını Karşılaştır' : view === 'about' ? 'Hakkımızda' : view === 'contact' ? 'İletişim' : 'Yönetim Paneli'}
        description={view === 'home' ? 'Türkiye\'nin en iyi katılım evim, tasarruf finansman şirketlerinin tekliflerini karşılaştırın. Faizsiz ev ve araba sahibi olun.' : 'En İyi Katılım hakkında bilgi alın.'}
      />
      {/* Modal - Taksit Detayları */}
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
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="container header-container">
          <div className="header-top-row">
            <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); handleSecretAccess(); }} className="logo">
              <div className="logo-icon">
                <img src="/logo.png" alt="ENİYİKATILIM Logo" />
              </div>
              <div className="logo-text">ENİYİ<span>KATILIM</span></div>
            </a>
          </div>

          <div className="header-main-row">
            <div className="header-center">
              {view === 'admin' && <span className="admin-breadcrumb">Yönetim Paneli</span>}
            </div>

            <div className="header-right">
              <div className="nav-right desktop-only">
                <a href="#" className="header-nav-link" onClick={(e) => { e.preventDefault(); setView('about'); }}>Biz Kimiz</a>
                <a href="#" className="btn-contact" onClick={(e) => { e.preventDefault(); setView('contact'); }}>Bize Ulaşın</a>
              </div>

              {/* Hamburger Icon */}
              <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} style={isMenuOpen ? { display: 'none' } : {}}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <nav className={`nav-center-mobile ${isMenuOpen ? 'mobile-visible' : ''}`}>
            <div className="mobile-menu-header">
              <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); setIsMenuOpen(false); }} className="logo">
                <div className="logo-icon">
                  <img src="/logo.png" alt="ENİYİKATILIM Logo" />
                </div>
                <div className="logo-text">ENİYİ<span>KATILIM</span></div>
              </a>
              <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>×</button>
            </div>
            <div className="mobile-menu-links">
              <a href="#" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); setView('home'); setIsMenuOpen(false); }}>Ana Sayfa</a>
              <a href="#" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); setView('home'); setIsMenuOpen(false); setTimeout(() => { const el = document.querySelector('.calculator-card'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }, 300); }}>Hesaplama Aracı</a>
              <a href="#" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); setView('about'); setIsMenuOpen(false); }}>Biz Kimiz</a>
              <a href="#" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); setView('contact'); setIsMenuOpen(false); }}>Bize Ulaşın</a>
            </div>
            <div className="mobile-menu-footer">
              <a href="#" className="mobile-menu-cta" onClick={(e) => { e.preventDefault(); setView('contact'); setIsMenuOpen(false); }}>Bize Ulaşın</a>
              <p className="mobile-menu-tagline">⚡ En İyi Katılım Fırsatları</p>
            </div>
          </nav>
        </div>
      </header>

      {view === 'admin' ? (
        <main className="admin-container container">
          <div className="admin-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>Yönetim Paneli</h2>
                <p>Platform performansı ve yönlendirme istatistikleri</p>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button className="btn-report" onClick={downloadReport}>📄 Rapor İndir (CSV)</button>
                <button className="btn-exit-admin" onClick={() => setView('home')}>Siteye Dön</button>
              </div>
            </div>
            <p>Şirketlere gönderdiğiniz form/tık sayılarını buradan takip edebilirsiniz.</p>
          </div>

          <div className="admin-stats-grid">
            <div className="stat-card glass-card">
              <label>Toplam Yönlendirme</label>
              <span className="stat-value text-primary">1,280</span>
              <small>+12% geçen aya göre</small>
            </div>
            <div className="stat-card glass-card">
              <label>Tahmini Kazanç</label>
              <span className="stat-value text-green">12.800 TL</span>
              <small>Form başı 10 TL maliyetle</small>
            </div>
          </div>

          <div className="admin-table-card glass-card">
            <h3>Şirket Bazlı İstatistikler</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Şirket</th>
                  <th>Yönlendirme Linki</th>
                  <th>Tıklanma</th>
                  <th>Dönüşüm Oranı</th>
                </tr>
              </thead>
              <tbody>
                {COMPANIES.map(comp => (
                  <tr key={comp.id}>
                    <td><strong>{comp.name}</strong></td>
                    <td className="url-cell">{comp.applyUrl}</td>
                    <td>{Math.floor(Math.random() * 200) + 50}</td>
                    <td>%4.2</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      ) : view === 'contact' ? (
        <main className="contact-container container">
          <div className="contact-header">
            <h1>Bize <span>Ulaşın</span></h1>
            <p>Sorularınız veya iş birliği talepleriniz için bize mesaj bırakabilirsiniz.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-cards">
              <div className="info-card glass-card">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <label>Adres</label>
                  <span>Levent, Büyükdere Cd. No:123, 34394 Şişli/İstanbul</span>
                </div>
              </div>
              <div className="info-card glass-card">
                <div className="info-icon">📞</div>
                <div className="info-text">
                  <label>Telefon</label>
                  <span>+90 (212) 555 00 00</span>
                </div>
              </div>
              <div className="info-card glass-card">
                <div className="info-icon">✉️</div>
                <div className="info-text">
                  <label>E-posta</label>
                  <span>iletisim@eniyikatilim.com</span>
                </div>
              </div>
            </div>

            <div className="contact-form-container glass-card">
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'event': 'contact_form_submit'
                });
                alert('Mesajınız başarıyla iletildi!');
                setView('home');
              }}>
                <div className="form-row">
                  <div className="input-group">
                    <label>Adınız Soyadınız</label>
                    <input type="text" placeholder="Örn: Ahmet Yılmaz" required />
                  </div>
                  <div className="input-group">
                    <label>E-posta Adresiniz</label>
                    <input type="email" placeholder="Örn: ahmet@mail.com" required />
                  </div>
                </div>
                <div className="input-group">
                  <label>Şirket İsmi <small style={{ fontWeight: 400, opacity: 0.7 }}>(Bu alanı doldurmak zorunda değilsiniz)</small></label>
                  <input type="text" placeholder="Şirketinizin ismi (opsiyonel)" />
                </div>
                <div className="input-group">
                  <label>Konu</label>
                  <input type="text" placeholder="Mesajınızın konusu nedir?" required />
                </div>
                <div className="input-group">
                  <label>Mesajınız</label>
                  <textarea rows="5" placeholder="Size nasıl yardımcı olabiliriz?" required></textarea>
                </div>
                <button type="submit" className="btn-submit-contact">Mesajı Gönder</button>
              </form>
            </div>
          </div>
        </main>
      ) : view === 'about' ? (
        <main className="about-container">
          <section className="about-hero">
            <div className="container">
              <h1>Biz <span>Kimiz?</span></h1>
              <p>Türkiye'nin en kapsamlı katılım finans karşılaştırma platformuyuz. Hayalinizdeki eve veya arabaya en uygun planla ulaşmanız için yanınızdayız.</p>
            </div>
          </section>

          <section className="about-mission-section">
            <div className="container">
              <div className="about-cards-grid">
                <div className="about-card glass-card">
                  <div className="about-card-icon">🎯</div>
                  <h3>Misyonumuz</h3>
                  <p>BDDK onaylı tüm katılım finans şirketlerinin tekliflerini tek bir platformda toplayarak, kullanıcılarımızın en doğru finansal kararı vermesini sağlamak.</p>
                </div>
                <div className="about-card glass-card">
                  <div className="about-card-icon">🔭</div>
                  <h3>Vizyonumuz</h3>
                  <p>Katılım finans sektöründe Türkiye'nin en güvenilir ve en çok tercih edilen dijital karşılaştırma platformu olmak.</p>
                </div>
                <div className="about-card glass-card">
                  <div className="about-card-icon">💎</div>
                  <h3>Neden Biz?</h3>
                  <p>Bağımsız ve tarafsız karşılaştırma, anlık güncel veriler ve kullanıcı dostu arayüzümüzle fark yaratıyoruz.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-stats-section">
            <div className="container">
              <div className="about-stats-grid">
                <div className="about-stat">
                  <span className="about-stat-number">10+</span>
                  <span className="about-stat-label">Katılım Şirketi</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">50K+</span>
                  <span className="about-stat-label">Karşılaştırma</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">%100</span>
                  <span className="about-stat-label">Tarafsız</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-number">7/24</span>
                  <span className="about-stat-label">Erişim</span>
                </div>
              </div>
            </div>
          </section>

          <section className="about-values-section">
            <div className="container">
              <h2>Değerlerimiz</h2>
              <div className="about-values-grid">
                <div className="about-value">
                  <div className="about-value-icon">🛡️</div>
                  <h4>Güvenilirlik</h4>
                  <p>Sadece BDDK onaylı, lisanslı şirketlerin tekliflerini sunuyoruz.</p>
                </div>
                <div className="about-value">
                  <div className="about-value-icon">⚡</div>
                  <h4>Hız</h4>
                  <p>Saniyeler içinde tüm şirketlerin tekliflerini karşılaştırın.</p>
                </div>
                <div className="about-value">
                  <div className="about-value-icon">🤝</div>
                  <h4>Şeffaflık</h4>
                  <p>Hiçbir gizli ücret veya komisyon yoktur. Ne görüyorsanız o.</p>
                </div>
                <div className="about-value">
                  <div className="about-value-icon">📊</div>
                  <h4>Doğruluk</h4>
                  <p>Verilerimiz gerçek zamanlı güncellenir, her zaman güncel bilgi.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-cta-section">
            <div className="container">
              <div className="about-cta glass-card">
                <h2>Hayalinizdeki Eve veya Arabaya Ulaşın</h2>
                <p>Hemen hesaplama aracımızı kullanarak size en uygun katılım planını keşfedin.</p>
                <button className="btn-about-cta" onClick={() => setView('home')}>Hesaplamaya Başla</button>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="main">
          <section className="hero">
            <div className="container">
              <div className="category-toggle-container hero-categories">
                {['ev', 'araba', 'arsa'].map(cat => (
                  <button
                    key={cat}
                    className={category === cat ? 'active' : ''}
                    onClick={() => {
                      setCategory(cat);
                      setView('home');
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

                  {/* Sponsor Slider Box removed for mobile optimization */}

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
      )
      }

      <footer className="footer-mini">
        <div className="container">
          <p>© 2026 ENİYİKATILIM. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div >
  );
}

export default App;
