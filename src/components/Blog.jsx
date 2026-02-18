import React, { useState } from 'react';
import SEO from './SEO';

const BLOG_POSTS = [
  {
    id: 0,
    title: "BDDK Onaylı Tasarruf Finansman Şirketleri Hangileridir? (2026 Güncel Liste)",
    excerpt: "Eminevim, Fuzul Ev, Birevim, Katılımevim, Sinpaş ve İmece... Sektörün devleri hakkında merak edilen tüm detaylar, kuruluş hikayeleri ve öne çıkan özellikleri bu rehberde.",
    category: "Şirket İncelemeleri",
    date: "14 Şubat 2026",
    content: `
      <p>Bankacılık Düzenleme ve Denetleme Kurumu (BDDK) denetimine tabi olan ve lisanslı olarak faaliyet gösteren tasarruf finansman şirketlerini sizler için detaylıca inceledik. İşte güvenle başvurabileceğiniz sektörün öncü şirketleri:</p>

      <div class="company-review">
        <h3>1. Emlak Katılım Tasarruf</h3>
        <ul>
          <li><strong>Bağlı Olduğu Kurum:</strong> Emlak Katılım Bankası (Kamu)</li>
          <li><strong>Faaliyet İzni:</strong> 2025</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> Arkasında Emlak Katılım Bankası'nın devlet güvencesi vardır. "Çekilişli" ve "Müşteri Bazlı" modeller sunar.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>2. Eminevim</h3>
        <ul>
          <li><strong>Kuruluş:</strong> 2005 (Temelleri 1991'de Eminotomotiv ile atıldı)</li>
          <li><strong>Kurucu:</strong> Merhum Abdurrahman Emin Üstün</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> Sektörün "Elbirliği Sistemi" mucididir. Türkiye genelinde en yaygın şube ağına sahiptir. "Önce teslimat" prensibiyle çalışır.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>3. Fuzul Ev</h3>
        <ul>
          <li><strong>Kuruluş:</strong> 1992</li>
          <li><strong>Kurucular:</strong> Eyüp Akbal ve Mahmut Akbal</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> "Çekilişli Sistem" ve "Vade Ortası Teslim" modelleriyle tanınır. Fuzul Holding bünyesinde güçlü bir sermaye yapısına sahiptir.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>4. Birevim</h3>
        <ul>
          <li><strong>Kuruluş:</strong> 2016</li>
          <li><strong>Kurucu:</strong> Murat Çiftçi</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> "Birlikte Tasarruf Finansı" modelini geliştirmiştir. İnsan merkezli sosyal finans anlayışı ve yenilikçi teslimat yöntemleriyle dikkat çeker.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>5. Katılımevim</h3>
        <ul>
          <li><strong>Kuruluş:</strong> 2018</li>
          <li><strong>Kurucular:</strong> Serdar Turhan ve Yusuf Caf</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> Halka açık ve borsada işlem gören (BIST) şeffaf yapısıyla güven verir. Katılım bankacılığına geçiş süreciyle vizyonunu genişletmektedir.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>6. Sinpaş Tasarruf</h3>
        <ul>
          <li><strong>Marka Gücü:</strong> Sinpaş Holding (1974)</li>
          <li><strong>Sektöre Giriş:</strong> 2021 (Yapı Tasarruf Sandığı)</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> Türkiye'nin en köklü gayrimenkul markası Sinpaş'ın güvencesini taşır. Konut üretimindeki tecrübesini finansman modeliyle birleştirir.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>7. İmece Tasarruf</h3>
        <ul>
          <li><strong>Kuruluş:</strong> 2022</li>
          <li><strong>Yönetim:</strong> Yunus Aksu (YKB)</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> Anadolu'nun "İmece" kültürünü modern finansa uyarlamıştır. "3T Sistemi" ile esnek ve hızlı çözümler sunar.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>8. Adil Tasarruf (İyi Finans)</h3>
        <ul>
          <li><strong>Marka:</strong> İyi Finans</li>
          <li><strong>Faaliyet İzni:</strong> Temmuz 2025</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> "İyi Finans" markasıyla hizmet vermektedir. 250 aya kadar varan vade seçenekleri sunmaktadır.</li>
        </ul>
      </div>

      <div class="company-review">
        <h3>9. Albayrak Tasarruf</h3>
        <ul>
          <li><strong>Marka Gücü:</strong> Albayrak Grubu (1952)</li>
          <li><strong>Faaliyet İzni:</strong> Temmuz 2025</li>
          <li><strong>Öne Çıkan Özellikleri:</strong> Yeni Şafak, TVNET gibi medya ve sanayi devlerini bünyesinde barındıran Albayrak Grubu'nun finans sektöründeki yatırımıdır.</li>
        </ul>
      </div>

      <br/>
      <p>Bu şirketlerin tamamı BDDK denetimindedir ve yasal sermaye şartlarını sağlamaktadır. Başvuru yapmadan önce şirketlerin güncel kampanyalarını sitemizdeki hesaplama aracıyla karşılaştırabilirsiniz.</p>
    `,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 101,
    title: "Neden Tasarruf Finans Şirketleri? Banka Kredisine Göre Avantajları",
    excerpt: "Yüksek faiz yükü altında ezilmeden ev sahibi olmanın yolu tasarruf finansman sisteminden geçiyor. İşte banka kredisi yerine bu sistemi seçmeniz için 5 güçlü neden.",
    category: "Rehber",
    date: "14 Şubat 2026",
    content: `
      <p>Ev veya araç sahibi olmak isteyen milyonlarca kişi için en büyük engel yüksek faiz oranlarıdır. Tasarruf finansman sistemi, tam da bu noktada devreye girerek "faizsiz, peşinatsız ve ek maliyetsiz" bir finansman modeli sunar. Peki neden banka kredisi değil de tasarruf finansmanı tercih etmelisiniz?</p>

      <h3>1. Sıfır Faiz, Gerçek Tasarruf</h3>
      <p>Bankalar, çektiğiniz krediye karşılık sizden neredeyse anapara kadar (bazen daha fazla) faiz talep eder. Tasarruf finansman sisteminde ise <strong>faiz yoktur</strong>. Sadece organizasyon ücreti ödersiniz. Bu sayede evinizin maliyeti katlanmaz, cebinizden çıkan para evin gerçek değerine yakın olur.</p>

      <h3>2. Peşinat Zorunluluğu Yok</h3>
      <p>Konut kredisi çekmek için evin değerinin en az %20-%30'unu peşin vermeniz gerekir. Tasarruf finansman şirketlerinde ise peşinat vermek tamamen sizin tercihinize bağlıdır. Hiç peşinat vermeden de sisteme dahil olabilirsiniz.</p>

      <h3>3. Bütçenize Göre Taksit</h3>
      <p>Bankalar gelir durumunuza göre katı taksit tutarları belirler. Bu sistemde ise taksitleri <strong>siz belirlersiniz</strong>. "Ayda şu kadar ödeyebilirim" diyerek kendi ödeme planınızı oluşturursunuz.</p>

      <h3>4. Kredi Puanı Derdi Yok</h3>
      <p>Kredi notunuz düşükse bankadan kredi almanız imkansız olabilir. Ancak tasarruf finansman şirketleri, sicil notunuza değil, ödeme istikrarınıza ve karşılıklı güvene bakar.</p>

      <h3>5. Ek Masraflar Yok</h3>
      <p>Dosya masrafı, hayat sigortası, zorunlu ek ürünler... Bankaların "görünmeyen" masrafları bu sistemde yoktur. Her şey sözleşmenin başında şeffaf bir şekilde bellidir.</p>
    `,
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 102,
    title: "Evimi Teslim Aldıktan Sonra Ne Oluyor? Süreç Nasıl İşliyor?",
    excerpt: "Sıranız geldi veya çekilişte isminiz çıktı... Peki sonraki süreç nasıl işliyor? Tapu devri, ipotek işlemleri ve ödemeler hakkında merak edilenler.",
    category: "Merak Edilenler",
    date: "13 Şubat 2026",
    content: `
      <p>Tasarruf finansman sisteminin en heyecanlı anı, teslimat zamanıdır. Birikimlerinizin karşılığını alıp hayalinizdeki eve kavuştuğunuz bu süreçte sizi neler bekliyor? Adım adım inceleyelim.</p>

      <h3>1. Evin Beğenilmesi ve Ekspertiz</h3>
      <p>Teslimat hakkı kazandığınızda, Türkiye'nin dilediğiniz yerinden bütçenize uygun evi bulursunuz. Şirket, seçtiğiniz evin değerini belirlemek için bağımsız bir gayrimenkul değerleme uzmanı (eksper) yönlendirir. Bu, hem sizi hem de sistemi koruyan önemli bir adımdır.</p>

      <h3>2. Tapu Devri ve İpotek</h3>
      <p>Ekspertiz onayı sonrası tapu dairesine gidilir. Evin tapusu doğrudan <strong>sizin adınıza</strong> çıkarılır. Ancak, borcunuz bitene kadar evin üzerine şirketin lehine "satılamaz" şerhi (ipotek) konulur. Bu, borcunuz devam ederken evi başkasına satmanızı engeller, ancak evde oturmanıza veya kiraya vermenize engel değildir.</p>

      <h3>3. Ödeme Planının Sabitlenmesi</h3>
      <p>Evinizi teslim aldıktan sonra, (varsa) kira yardımı ödemeleriniz sona erer. Genellikle teslimattan sonra taksit tutarlarınızda, sözleşmede önceden belirlenen bir miktar artış olur. Çünkü artık kira öder gibi kendi evinizin taksitlerini ödemeye başlarsınız.</p>

      <h3>4. Borç Bitişi ve İpotek Kaldırma</h3>
      <p>Son taksitinizi ödediğinizde, şirketle olan borç ilişkiniz sona erer. Şirket, tapu üzerindeki ipoteği kaldırmak için resmi yazıyı yazar ve eviniz tamamen, kısıtlamasız olarak sizin olur.</p>
    `,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 103,
    title: "BDDK Onaylı Şirketlere Neden Güvenmeliyim?",
    excerpt: "2021 yılındaki yasal düzenleme ile sektör devlet güvencesi altına alındı. BDDK gözetimi, sermaye şartları ve TMSF süreci hakkında bilmeniz gerekenler.",
    category: "Güven & Mevzuat",
    date: "12 Şubat 2026",
    content: `
      <p>Tasarruf finansman sektörü, 2021 yılında 6361 sayılı Kanun kapsamına alınarak Bankacılık Düzenleme ve Denetleme Kurumu (BDDK) denetimine girdi. Bu, sektör için bir devrim niteliğindeydi. Peki bu onay neden bu kadar önemli?</p>

      <h3>Devletin Sıkı Denetimi</h3>
      <p>BDDK lisansı alan şirketler, tıpkı bankalar gibi düzenli olarak denetlenir. Mali yapıları, kasadaki nakit durumları, müşteri sözleşmeleri devletin merceği altındadır. Şirketlerin keyfi işlem yapması imkansız hale getirilmiştir.</p>

      <h3>Güçlü Sermaye Yapısı</h3>
      <p>Bir şirketin bu lisansı alabilmesi için en az <strong>100 Milyon TL</strong> ödenmiş sermayeye sahip olması yasal zorunluluktur. Bu, şirketin finansal olarak güçlü olduğunu ve olası krizlere karşı dayanıklı olduğunu gösterir.</p>

      <h3>Yasal Haklarınız Koruma Altında</h3>
      <p>İmzaladığınız sözleşmeler BDDK standartlarına uygundur. Cayma hakkınız, fesih hakkınız ve teslimat süreleriniz yasalarla garanti altına alınmıştır. Herhangi bir anlaşmazlık durumunda devletin belirlediği tüketici hakem heyetlerine ve mahkemelere başvurma hakkınız saklıdır.</p>

      <h3>Şeffaflık ve Kurumsallık</h3>
      <p>İzinli şirketler, tüm süreçlerini şeffaf yürütmek zorundadır. "Merdiven altı" tabir edilen, yetkisiz para toplayan yapılar tamamen yasaklanmıştır. Sadece listedeki 9 lisanslı şirkete güvenle başvurabilirsiniz.</p>
    `,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 104,
    title: "Başvuru Şartları Nelerdir? Kimler Katılabilir?",
    excerpt: "Tasarruf finansman sistemine dahil olmak için hangi belgeler gerekiyor? Yaş sınırı var mı? Gelir belgesi şart mı? Tüm merak edilenleri cevaplıyoruz.",
    category: "Sıkça Sorulan Sorular",
    date: "11 Şubat 2026",
    content: `
      <p>Konut veya araç sahibi olmak için tasarruf finansman sistemine katılmak, banka kredisi çekmekten çok daha kolaydır. Sistem, kapsayıcı ve erişilebilir olacak şekilde tasarlanmıştır.</p>

      <h3>Temel Başvuru Şartları</h3>
      <ul>
        <li><strong>T.C. Vatandaşı Olmak:</strong> Türkiye Cumhuriyeti vatandaşı olan herkes sisteme başvurabilir.</li>
        <li><strong>18 Yaşını Doldurmak:</strong> Reşit olan (18 yaş üstü) her birey kendi adına sözleşme imzalayabilir.</li>
      </ul>

      <h3>Neler GEREKMİYOR?</h3>
      <p>Bankaların aksine, bu sistemde sizi yoran prosedürler yoktur:</p>
      <ul>
        <li><strong>Kredi Notu Şartı YOKTUR:</strong> Kredi puanınız düşük olsa bile sisteme dahil olabilirsiniz.</li>
        <li><strong>Gelir Belgesi (Bordro) Zorunluluğu YOKTUR:</strong> Genellikle gelir belgesi istenmez, beyanınız esas alınır.</li>
        <li><strong>Kefil Zorunluluğu YOKTUR:</strong> Giriş aşamasında kefil aranmaz. (Teslimat aşamasında bazı durumlarda istenebilir).</li>
      </ul>

      <h3>Gerekli Belgeler</h3>
      <p>Sisteme kayıt olmak için sadece <strong>Nüfus Cüzdanınız (Kimlik)</strong> genellikle yeterlidir. Şubeye giderek çayınızı içerken, size en uygun ödeme planını oluşturup 15-20 dakika içinde geleceğinize yatırım yapmaya başlayabilirsiniz.</p>
    `,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000"
  },
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
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=1000"
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

import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

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
            <button className="btn-article-cta" onClick={() => navigate('/')}>Hemen Hesapla</button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="blog-container container">
      <Helmet>
        <title>Blog & Haberler - En İyi Katılım</title>
        <meta name="description" content="Tasarruf finansman sektörü haberleri, BDDK düzenlemeleri ve faizsiz ev alma rehberleri." />
      </Helmet>
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
