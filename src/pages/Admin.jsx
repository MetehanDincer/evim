import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

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

export default function Admin() {
    const navigate = useNavigate();

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

    return (
        <main className="admin-container container">
            <Helmet>
                <title>Yönetim Paneli - En İyi Katılım</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="admin-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2>Yönetim Paneli</h2>
                        <p>Platform performansı ve yönlendirme istatistikleri</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn-report" onClick={downloadReport}>📄 Rapor İndir (CSV)</button>
                        <button className="btn-exit-admin" onClick={() => navigate('/')}>Siteye Dön</button>
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
    );
}
