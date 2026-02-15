import React, { useState } from 'react';
import SEO from './SEO';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Tasarruf Finansman Şirketleri İçin Yeni BDDK Düzenlemeleri",
        excerpt: "Bankacılık Düzenleme ve Denetleme Kurumu (BDDK), tasarruf finansman şirketlerinin sermaye yeterlilikleri ve işleyiş süreçleriyle ilgili yeni yönetmelik taslağını yayınladı.",
        category: "Düzenleme",
        date: "15 Şubat 2026",
        content: `
      <p>Bankacılık Düzenleme ve Denetleme Kurumu (BDDK), tasarruf finansman sektörünün daha şeffaf ve güvenilir bir yapıya kavuşması amacıyla yeni düzenlemeler getirdi. Bu düzenlemeler, hem şirketlerin finansal sağlamlığını artırmayı hem de müşteri haklarını daha etkin bir şekilde korumayı hedefliyor.</p>
      
      <h3>Öne Çıkan Başlıklar</h3>
      <ul>
        <li><strong>Sermaye Artırımı:</strong> Şirketlerin asgari ödenmiş sermaye tutarları yeniden güncellendi. Buna göre şirketlerin mali yapıları güçlendirilecek.</li>
        <li><strong>Sözleşme Standartları:</strong> Müşterilerle yapılan sözleşmelerde yer alması gereken asgari unsurlar netleştirildi. Cayma hakkı ve taksit dondurma gibi konularda tüketici lehine iyileştirmeler yapıldı.</li>
        <li><strong>Tasfiye Süreci:</strong> Olası bir tasfiye durumunda tasarruf sahiplerinin mağduriyetini önleyecek yeni mekanizmalar kuruldu.</li>
      </ul>
      
      <p>Bu düzenlemelerle birlikte, sektördeki lisanslı şirketlerin rekabet gücünün ve hizmet kalitesinin artması bekleniyor. Yatırımcılar ve ev sahibi olmak isteyenler için sistem artık çok daha güvenli bir liman haline geldi.</p>
    `,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 2,
        title: "Faizsiz Ev Almanın Avantajları Nelerdir?",
        excerpt: "Yüksek faiz oranlarından kaçınarak ev sahibi olmak isteyenler için tasarruf finansman modelleri büyük fırsatlar sunuyor. Peki sistemin avantajları neler?",
        category: "Rehber",
        date: "10 Şubat 2026",
        content: `
      <p>Artan konut fiyatları ve kredi faiz oranları, ev sahibi olmak isteyenleri alternatif finansman yöntemlerine yöneltiyor. Tasarruf finansman (eski adıyla Elbirliği) sistemi, faiz maliyetine katlanmadan ev sahibi olmanın en popüler yolu haline geldi.</p>

      <h3>Sistemin Temel Avantajları</h3>
      <ol>
        <li><strong>Faizsiz Finansman:</strong> Sistemin en büyük avantajı, borcunuza eklenen bir faiz yükünün olmamasıdır. Sadece organizasyon ücreti ödersiniz.</li>
        <li><strong>Esnek Ödeme Planları:</strong> Bütçenize göre aylık taksitleri kendiniz belirleyebilirsiniz. Peşinatlı veya peşinatsız seçenekler mevcuttur.</li>
        <li><strong>Teslimat Garantisi:</strong> BDDK denetimindeki şirketler, noter huzurunda yapılan çekilişlerle veya belirlenen vadelerde teslimat garantisi sunar.</li>
      </ol>

      <p>Kendi birikiminizle yıllarca beklemek yerine, bu sisteme dahil olarak çok daha kısa sürede, dayanışmanın gücüyle hayalinizdeki eve kavuşabilirsiniz.</p>
    `,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 3,
        title: "2026 Yılında Öne Çıkan Tasarruf Finansman Şirketleri",
        excerpt: "Sektörde faaliyet gösteren BDDK lisanslı şirketlerin güncel listesi ve sundukları kampanyalar hakkında detaylı inceleme.",
        category: "Sektör Haberleri",
        date: "05 Şubat 2026",
        content: `
      <p>2026 yılı itibarıyla Türkiye'de tasarruf finansman sektörü büyümesini sürdürüyor. BDDK lisansı ile faaliyet gösteren şirketler, sundukları yenilikçi kampanyalarla dikkat çekiyor.</p>

      <h3>Sektörün Önde Gelenleri</h3>
      <p>Platformumuzda da karşılaştırmalı olarak bulabileceğiniz üzere Katılımevim, Eminevim, Fuzul Tasarruf, Birevim ve Sinpaş Tasarruf gibi köklü şirketler, sektörün lokomotifi konumunda. Bu şirketler, çekilişli planlardan vade ortası teslimat modellerine kadar geniş bir yelpazede çözümler sunuyor.</p>

      <p>Yeni yıl ile birlikte birçok şirket, "Enflasyon Korumalı Plan" veya "Erken Teslimat Fırsatları" gibi kampanyalar başlattı. Detaylı bilgi ve size özel teklifler için ana sayfamızdaki hesaplama aracını kullanabilirsiniz.</p>
    `,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
    }
];

export default function Blog({ setView }) {
    const [selectedPost, setSelectedPost] = useState(null);

    if (selectedPost) {
        return (
            <div className="blog-detail-container container">
                <SEO
                    title={selectedPost.title}
                    description={selectedPost.excerpt}
                    type="article"
                    image={selectedPost.image}
                />
                <button className="btn-back" onClick={() => setSelectedPost(null)}>← Geri Dön</button>

                <article className="blog-article glass-card">
                    <div className="article-header">
                        <span className="article-category">{selectedPost.category}</span>
                        <span className="article-date">{selectedPost.date}</span>
                        <h1>{selectedPost.title}</h1>
                    </div>

                    <div className="article-image">
                        <img src={selectedPost.image} alt={selectedPost.title} />
                    </div>

                    <div className="article-content" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

                    <div className="article-footer">
                        <h3>İlginizi Çekebilir: Hesaplama Aracı</h3>
                        <p>Bu makalede bahsedilen fırsatları kaçırmamak için hemen size özel ödeme planını oluşturun.</p>
                        <button className="btn-article-cta" onClick={() => setView('home')}>Hemen Hesapla</button>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="blog-container container">
            <SEO
                title="Blog & Haberler"
                description="Tasarruf finansman sektörü haberleri, BDDK düzenlemeleri ve faizsiz ev alma rehberleri."
            />
            <div className="blog-head">
                <h1>Güncel <span>Haberler</span> ve Rehber</h1>
                <p>Sektördeki son gelişmeler, yasal düzenlemeler ve tasarruf ipuçları.</p>
            </div>

            <div className="blog-grid">
                {BLOG_POSTS.map(post => (
                    <div key={post.id} className="blog-card glass-card" onClick={() => setSelectedPost(post)}>
                        <div className="blog-card-image">
                            <img src={post.image} alt={post.title} loading="lazy" />
                            <span className="blog-category-badge">{post.category}</span>
                        </div>
                        <div className="blog-card-content">
                            <span className="blog-date">{post.date}</span>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <button className="btn-read-more">Devamını Oku →</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
