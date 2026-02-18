import React, { useState } from 'react';
import SEO from './SEO';

const BLOG_POSTS = [
    {
        id: 1,
        title: "2026: Tasarruf Finansman Sektöründe Tüketici Hakları ve Güven Dönemi",
        excerpt: "Geçmişte yaşanan mağduriyetler tarih oldu. 14 gün cayma hakkı, organizasyon ücreti iadesi ve zorunlu karşılıklar ile tüketiciler artık tam koruma altında.",
        category: "Mevzuat & Haklar",
        date: "12 Şubat 2026",
        content: `
      <p>Tasarruf finansman sektörü, geçmiş yıllarda yaşanan 'teslimat gecikmesi' ve 'ücret iadesi' sorunlarını, 2021 yasası ve ardından gelen 2025 düzenlemeleriyle tamamen aştı. Artık sistem, BDDK'nın sıkı gözetimi altında, bankacılık standartlarında işliyor.</p>
      
      <h3>Tüketici Lehine Devrim Niteliğinde Haklar</h3>
      <p>Müşterilerin en çok şikayet ettiği konuların başında gelen "sistemden çıkışta kesinti yapılması" sorunu çözüldü.</p>
      <ul>
        <li><strong>14 Gün Cayma Hakkı:</strong> Sözleşme imzaladıktan sonra 14 gün içinde hiçbir gerekçe göstermeden ayrılabiliyorsunuz. Bu durumda şirket, organizasyon ücreti dahil ödediğiniz tüm tutarı iade etmek zorunda.</li>
        <li><strong>Sözleşme Fesih Hakkı:</strong> Tasarruf dönemi bitene kadar istediğiniz an sistemden çıkabilirsiniz. Birikimleriniz Kurulca belirlenen sürelerde iade edilir.</li>
        <li><strong>Şeffaflık:</strong> Tüm sözleşmeler standart hale getirildi, sürpriz kesintiler yasaklandı.</li>
      </ul>
      
      <p>Bu düzenlemeler, sisteme olan güveni tazeledi ve müşteri şikayetlerini minimum düzeye indirdi.</p>
    `,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 2,
        title: "BDDK'dan Kritik Likidite Hamlesi: Teslimatlar Güvence Altında",
        excerpt: "Kasım 2025'te yayınlanan yeni tebliği ile şirketlerin nakit yeterlilik oranları artırıldı. Bu düzenleme, teslimatların aksamadan yapılmasını garanti altına alıyor.",
        category: "Sektör Haberleri",
        date: "28 Kasım 2025",
        content: `
      <p>Bankacılık Düzenleme ve Denetleme Kurumu (BDDK), tasarruf finansman şirketlerinin finansal sağlamlığını artırmak için yeni bir likidite düzenlemesi yayınladı. 1 Ocak 2026'da yürürlüğe giren bu karar, sektörün geleceği için hayati önem taşıyor.</p>

      <h3>Neden Önemli?</h3>
      <p>Geçmişte bazı şirketlerin nakit akışını yönetememesi nedeniyle teslimatlarda gecikmeler yaşanabiliyordu. Yeni düzenleme ile:</p>
      <ol>
        <li>Şirketler, taahhüt ettikleri teslimatları yapabilecek kadar nakit varlığı (likidite) kasalarında tutmak zorunda.</li>
        <li>Olası ekonomik dalgalanmalara karşı şirketlerin direnci artırıldı.</li>
        <li>Müşterilerin "sıram geldiğinde paramı alabilir miyim?" endişesi ortadan kaldırıldı.</li>
      </ol>

      <p>Bu hamle, sektörün kurumsallaşması adına atılmış en büyük adımlardan biri olarak görülüyor.</p>
    `,
        image: "https://images.unsplash.com/photo-1611974765270-ca1258822fde?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 3,
        title: "Tasarruf Finansman Sektörü 2024'te %300 Büyüdü",
        excerpt: "2021'deki tasfiye sürecinden sonra arınan sektör, 2024 yılında rekor kırdı. İşlem hacmi 300 Milyar TL'yi aştı.",
        category: "Piyasa Analizi",
        date: "15 Ocak 2025",
        content: `
      <p>2021 yılındaki büyük temizliğin ardından, sektörde kalan güçlü ve lisanslı şirketler (Katılımevim, Eminevim, Fuzul, Birevim, Sinpaş vb.) güven tazeledi. Finansal Kurumlar Birliği (FKB) verilerine göre 2024 yılı sektör için altın yıl oldu.</p>

      <h3>Rakamlarla Büyüme</h3>
      <ul>
        <li><strong>İşlem Hacmi:</strong> Bir önceki yıla göre %300 artışla 334 Milyar TL seviyesine ulaştı.</li>
        <li><strong>Sözleşme Sayısı:</strong> Aktif müşteri sözleşmesi sayısı 400 bine yaklaştı.</li>
        <li><strong>Sermaye Gücü:</strong> Şirketlerin özkaynak karlılığı ve sermaye yeterlilikleri BDDK standartlarının üzerine çıktı.</li>
      </ul>

      <p>Bu büyüme, halkın faizsiz sisteme olan ilgisinin ve sisteme duyulan güvenin en somut göstergesi.</p>
    `,
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 4,
        title: "Faizsiz Ev Almanın Avantajları Nelerdir?",
        excerpt: "Yüksek faiz oranlarından kaçınarak ev sahibi olmak isteyenler için tasarruf finansman modelleri büyük fırsatlar sunuyor. Peki sistemin avantajları neler?",
        category: "Rehber",
        date: "10 Mart 2024",
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
        id: 5,
        title: "2021 Yasası ve Milat: Tasfiye Sürecinden Bugüne Neler Değişti?",
        excerpt: "Sektörün dönüm noktası: 7 Mart 2021. 21 şirketin tasfiyesi, 100 Milyon TL sermaye şartı ve devlet denetiminin başlangıcı.",
        category: "Tarihçe & Arşiv",
        date: "07 Mart 2021",
        content: `
      <p>Tasarruf finansman sektörü için 2021 yılı bir milat oldu. 7292 sayılı Kanun ile sektör ilk kez yasal bir zemine oturtuldu ve BDDK denetimine girdi. Bu süreç, sancılı olsa da sektörün geleceği için gerekli bir 'arınma' dönemiydi.</p>

      <h3>Neler Yaşandı?</h3>
      <p>Yasanın yürürlüğe girmesiyle birlikte, mali yapısı yetersiz olan ve gerekli şartları sağlayamayan 21 şirketin faaliyet izinleri iptal edildi ve tasfiye süreçleri başlatıldı. Bu şirketlerin müşterileri, TMSF güvencesiyle süreçlerini yönetti.</p>
      
      <h3>Yeni Dönem Şartları</h3>
      <ul>
        <li><strong>Sermaye Şartı:</strong> Asgari sermaye tutarı 100 Milyon TL'ye çıkarıldı. Merdiven altı yapılar engellendi.</li>
        <li><strong>İzinsiz Faaliyet Yasağı:</strong> BDDK lisansı olmayan hiçbir kurumun "faizsiz, tasarruf, elbirliği" gibi vaatlerle para toplamasına izin verilmiyor.</li>
      </ul>

      <p>Bugün geldiğimiz noktada, o gün alınan radikal kararların meyvelerini "güvenli ve denetlenebilir" bir sektör olarak topluyoruz.</p>
    `,
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1000"
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
                <h1>Sektörden <span>Haberler</span> ve Gelişmeler</h1>
                <p>Son 5 yılın önemli olayları, yasal düzenlemeler ve güncel fırsatlar.</p>
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
