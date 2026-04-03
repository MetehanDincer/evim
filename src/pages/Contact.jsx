import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const navigate = useNavigate();

    return (
        <main className="contact-container container">
            <Helmet>
                <title>İletişim - En İyi Katılım</title>
                <meta name="description" content="Sorularınız veya iş birliği talepleriniz için bize mesaj bırakabilirsiniz." />
            </Helmet>

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
                            <span>Göktürk Merkez Mah. İstanbul Caddesi NO:28 Gökmahal Sitesi A15 Ofis - Göktürk - Eyüp - İSTANBUL</span>
                        </div>
                    </div>
                    <div className="info-card glass-card">
                        <div className="info-icon">📞</div>
                        <div className="info-text">
                            <label>Telefon</label>
                            <span><a href="tel:+905344274718" style={{ color: 'inherit', textDecoration: 'none' }}>0 534 427 47 18</a></span>
                        </div>
                    </div>
                    <div className="info-card glass-card">
                        <div className="info-icon">✉️</div>
                        <div className="info-text">
                            <label>E-posta</label>
                            <span><a href="mailto:info@eniyikatilim.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@eniyikatilim.com</a></span>
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
                        navigate('/');
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
    );
}
