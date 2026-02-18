import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <main className="about-container">
            <Helmet>
                <title>Hakkımızda - En İyi Katılım</title>
                <meta name="description" content="En İyi Katılım hakkında bilgi alın. Misyonumuz, vizyonumuz ve değerlerimiz." />
            </Helmet>

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
                        <Link to="/" className="btn-about-cta">Hesaplamaya Başla</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
