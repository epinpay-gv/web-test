import { LegalDocument } from "@/features/legal/types";

export const legalMockData: LegalDocument[] = [
    {
        id: "1",
        type: "terms-of-use",
        title: "Epinpay Kullanım Koşulları",
        description: "Platformu kullanmadan önce lütfen bu koşulları dikkatlice okuyunuz.",
        publishedAt: "2025-01-01",
        updatedAt: "2025-01-15",
        blocks: [
            {
                id: "1-1",
                content:
                    "Lütfen platformumuzu kullanmadan önce aşağıdaki kullanım koşullarını dikkatlice okuyunuz. Epinpay platformuna erişerek veya platformu kullanarak bu koşulları kabul etmiş ve bunlara uymayı taahhüt etmiş olursunuz. Bu koşulları kabul etmiyorsanız, lütfen platformumuzu kullanmayınız.\n\nEpinpay, aşağıda tanımlanan hizmetlerini önceden haber vermeksizin değiştirme, düzenleme, askıya alma veya sonlandırma hakkını saklı tutar. Ayrıca, tamamen kendi takdirine bağlı olarak belirli özellikleri sınırlama veya Epinpay hizmetlerinin bir kısmına veya tamamına erişiminizi kısıtlama hakkını da saklı tutar."
            },
            {
                id: "1-2",
                title: "1. Giriş",
                content:
                    "1.1. Bu Kullanım Koşulları (“Sözleşme”), epinpay.com web sitesi üzerinden sunulan tüm hizmetlerin kullanım kurallarını düzenler.\n1.2. Platformu ziyaret eden, üye olan veya herhangi bir işlem gerçekleştiren herkes bu Sözleşmeyi kabul etmiş sayılır.\n1.3. Platformu kullanmayan, üyeliğini iptal eden veya şartları kabul etmeyen kişiler Epinpay hizmetlerinden yararlanamaz.\n1.4. Epinpay, hizmetlerini önceden bildirimde bulunmaksızın değiştirme, askıya alma veya sonlandırma hakkını saklı tutar."
            },
            {
                id: "1-3",
                title: "2. Tanımlar",
                content:
                    "Platform: epinpay.com ve ilişkili dijital hizmetleri.\nSatıcı: Platformda ürün listeleyen ve satan gerçek/tüzel kişi.\nAlıcı: Platform üzerinden ürün satın alan kişi.\nÜrün: Dijital oyun kodları, e-pinler, oyun içi para gibi maddi olmayan ürünler.\nPremium Üye: Özel avantajlara sahip ücretli üyelik.\nBlokaj Süresi: Satıcının kazançlarını çekilebilir hale gelmeden önce bekletildiği süre.\nEpinpay Destek Ekibi: Kullanıcı sorunlarını çözmekle görevli müşteri hizmetleri ekibi.\nKVKK: 6698 sayılı Kişisel Verilerin Korunması Kanunu."
            },
            {
                id: "1-4",
                title: "3. Kullanıcı Kapsamı ve Üyelik",
                content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n\n• It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n• It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.\n• More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
        ]
    },

    {
        id: "2",
        type: "privacy-policy",
        title: "Gizlilik Sözleşmesi",
        description: "Kişisel verilerinizin korunmasına ilişkin esaslar.",
        publishedAt: "2025-01-01",
        blocks: [
            {
                id: "3-1",
                title: "1. Amaç ve Kapsam",
                content:
                    "Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca hazırlanmıştır. Kişisel verileriniz, Orphci Reklam Teknoloji Ltd. Şti. (\"Şirket\" veya \"Epinpay\") tarafından veri sorumlusu sıfatıyla işlenmektedir. Bu bilgilendirme metninde, kişisel verilerinizin nasıl toplandığı, işlendiği, saklandığı ve korunduğu hakkında detaylı bilgi verilmektedir."
            },
            {
                id: "3-2",
                title: "2. Toplanan Veri Türleri ve Toplama Yöntemleri",
                content:
                    "Platform üzerinden gerçekleştirdiğiniz işlemler kapsamında aşağıdaki kişisel verileriniz işlenebilir:\n\n• Kimlik Bilgileri: Ad, soyad, doğum tarihi, T.C. kimlik numarası (yasal zorunluluk halinde).\n• İletişim Bilgileri: E-posta adresi, telefon numarası, adres bilgisi.\n• Finansal Bilgiler: Banka hesap bilgileri, ödeme geçmişi, işlem kayıtları.\n• İşlem Güvenliği Bilgileri: IP adresi, cihaz bilgileri, tarayıcı türü, çerez verileri.\n• Müşteri İşlem Bilgileri: Satın alma geçmişi, favori ürünler, sepet bilgileri."
            },
            {
                id: "3-3",
                title: "3. Yasal ve Düzenleyici Çevre",
                content:
                    "Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında işlenmektedir:\n\n• Platform üyeliği oluşturma ve yönetme.\n• Ürün alım-satım işlemlerinin gerçekleştirilmesi.\n• Ödeme ve fatura işlemlerinin yürütülmesi.\n• Müşteri memnuniyeti ve destek hizmetlerinin sağlanması.\n• Yasal yükümlülüklerin yerine getirilmesi (AML, KYC, vergi mevzuatı).\n• Platform güvenliğinin sağlanması ve dolandırıcılık önleme.\n• İstatistiksel analiz ve raporlama."
            },

        ]
    },

    {
        id: "3",
        type: "kvkk",
        title: "KVKK Bilgilendirme Metni",
        description: "6698 sayılı KVKK kapsamında bilgilendirme.",
        publishedAt: "2025-01-01",
        blocks: [
            {
                id: "3-1",
                title: "1. Veri Sorumlusu",
                content:
                    "Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca hazırlanmıştır. Kişisel verileriniz, Orphci Reklam Teknoloji Ltd. Şti. (\"Şirket\" veya \"Epinpay\") tarafından veri sorumlusu sıfatıyla işlenmektedir. Bu bilgilendirme metninde, kişisel verilerinizin nasıl toplandığı, işlendiği, saklandığı ve korunduğu hakkında detaylı bilgi verilmektedir."
            },
            {
                id: "3-2",
                title: "2. İşlenen Kişisel Verileriniz",
                content:
                    "Platform üzerinden gerçekleştirdiğiniz işlemler kapsamında aşağıdaki kişisel verileriniz işlenebilir:\n\n• Kimlik Bilgileri: Ad, soyad, doğum tarihi, T.C. kimlik numarası (yasal zorunluluk halinde).\n• İletişim Bilgileri: E-posta adresi, telefon numarası, adres bilgisi.\n• Finansal Bilgiler: Banka hesap bilgileri, ödeme geçmişi, işlem kayıtları.\n• İşlem Güvenliği Bilgileri: IP adresi, cihaz bilgileri, tarayıcı türü, çerez verileri.\n• Müşteri İşlem Bilgileri: Satın alma geçmişi, favori ürünler, sepet bilgileri."
            },
            {
                id: "3-3",
                title: "3. Kişisel Verilerin İşlenme Amaçları",
                content:
                    "Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında işlenmektedir:\n\n• Platform üyeliği oluşturma ve yönetme.\n• Ürün alım-satım işlemlerinin gerçekleştirilmesi.\n• Ödeme ve fatura işlemlerinin yürütülmesi.\n• Müşteri memnuniyeti ve destek hizmetlerinin sağlanması.\n• Yasal yükümlülüklerin yerine getirilmesi (AML, KYC, vergi mevzuatı).\n• Platform güvenliğinin sağlanması ve dolandırıcılık önleme.\n• İstatistiksel analiz ve raporlama."
            },
            {
                id: "3-4",
                title: "4. Kişisel Verilerin Aktarımı",
                content:
                    "Kişisel verileriniz, yukarıda belirtilen amaçlarla sınırlı olmak üzere aşağıdaki taraflara aktarılabilir:\n\n• Ödeme kuruluşları ve bankalar (işlem güvenliği için).\n• Yasal merciler ve düzenleyici kurumlar (yasal zorunluluk halinde).\n• Hizmet sağlayıcılar (sunucu, e-posta hizmetleri, veri analizi).\n• İş ortakları (lojistik, müşteri destek hizmetleri)."
            },
            {
                id: "3-5",
                title: "5. KVKK Hakları",
                content:
                    "KVKK'nın 11. maddesi uyarınca, kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme.\n• Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.\n• Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.\n• Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.\n• Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme.\n• KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme."
            }
        ]
    },

    {
        id: "4",
        type: "refund-policy",
        title: "İade Politikası",
        description: "İade süreçlerine ilişkin kurallar.",
        publishedAt: "2025-01-01",
        blocks: [
            {
                id: "4-1",
                title: "1. Genel Kurallar",
                content:
                    "Epinpay üzerinden satın alınan dijital ürünler (oyun kodları, e-pinler, oyun içi para vb.) maddi olmayan ürünler kapsamındadır. 6502 sayılı Tüketicinin Korunması Hakkında Kanun'un 15. maddesi uyarınca, dijital içerik tesliminin başlamasıyla birlikte cayma hakkı ortadan kalkar.\n\nAncak Epinpay, belirli durumlarda kullanıcı memnuniyetini ön planda tutarak iade taleplerini değerlendirir."
            },
            {
                id: "4-2",
                title: "2. İade Şartları",
                content:
                    "İade talebi aşağıdaki durumlarda değerlendirilebilir:\n\n• Satın alınan ürün kodunun çalışmaması veya geçersiz olması.\n• Ürünün tanımında belirtilenden farklı bir içerik teslim edilmesi.\n• Teknik bir hata sonucu yanlış ürün gönderilmesi.\n• Ödeme yapıldığı halde ürünün teslim edilmemesi."
            },
            {
                id: "4-3",
                title: "3. İade Süreci",
                content:
                    "İade talebi için aşağıdaki adımları izlemeniz gerekmektedir:\n\n1. Destek ekibimize support@epinpay.com adresi üzerinden başvuru yapın.\n2. Sipariş numaranızı, ürün bilgilerini ve iade sebebini detaylı şekilde belirtin.\n3. Varsa ekran görüntüsü veya kanıt belgelerini ekleyin.\n4. Talebiniz en geç 3 iş günü içinde incelenir ve sonuç tarafınıza bildirilir."
            },
            {
                id: "4-4",
                title: "4. İade Kabul Edilmeyen Durumlar",
                content:
                    "Aşağıdaki durumlarda iade talebi kabul edilmez:\n\n• Ürün kodu kullanılmış veya aktive edilmişse.\n• Kullanıcı hatasından kaynaklanan yanlış ürün seçimi.\n• Cayma hakkı süresinin dolmuş olması (dijital ürünlerde teslimle birlikte hak düşer).\n• Satıcı tarafından doğru şekilde teslim edilmiş ancak kullanıcı tarafından kaybedilmiş kodlar."
            },
            {
                id: "4-5",
                title: "5. Para İadesi ve Kredi Sistemi",
                content:
                    "İade talebi onaylandığında:\n\n• Ödeme, orijinal ödeme yönteminize 5-10 iş günü içinde iade edilir.\n• Alternatif olarak, talep etmeniz halinde iade tutarı Epinpay hesap bakiyenize kredi olarak yüklenebilir. Bu kredi, platformdaki diğer alışverişlerinizde kullanılabilir."
            }
        ]
    },

    {
        id: "5",
        type: "advertising-policy",
        title: "Reklam Politikası",
        description: "Platformda yayınlanan reklam kuralları.",
        publishedAt: "2025-01-01",
        blocks: [
            {
                id: "5-1",
                title: "1. Genel İlkeler",
                content:
                    "Epinpay, kullanıcılarına güvenli, şeffaf ve kaliteli bir alışveriş deneyimi sunmayı hedefler. Bu kapsamda platform üzerinde yayınlanan tüm reklamlar, aşağıdaki ilkelere uygun olmalıdır:\n\n• Yanıltıcı, aldatıcı veya yanlış bilgi içermemelidir.\n• Yasalara, etik kurallara ve toplumsal değerlere aykırı olmamalıdır.\n• Kullanıcı deneyimini olumsuz etkilememelidir."
            },
            {
                id: "5-2",
                title: "2. İçerik Yasakları",
                content:
                    "Platformda aşağıdaki içeriklere sahip reklamlara izin verilmez:\n\n• Yasa dışı ürün veya hizmetlerin tanıtımı.\n• Nefret söylemi, ayrımcılık veya şiddete teşvik.\n• Çocuklara yönelik uygunsuz içerik.\n• Sahte, taklit veya lisanssız ürünlerin tanıtımı.\n• Kumar, alkol, tütün veya yasadışı maddelerin reklamı.\n• Kişisel verilerin izinsiz kullanımı veya gizlilik ihlali."
            },
            {
                id: "5-3",
                title: "3. Satıcı Sorumlulukları",
                content:
                    "Platformda ürün listeleyen satıcılar, yayınladıkları reklamlardan ve ürün açıklamalarından sorumludur:\n\n• Ürün açıklamaları doğru, net ve güncel olmalıdır.\n• Görsel ve metin içerikler telif haklarına uygun olmalıdır.\n• Fiyatlandırma şeffaf ve yanıltıcı olmayan şekilde belirtilmelidir.\n• Satıcılar, reklamlarının bu politikaya uygun olmadığı tespit edildiğinde gerekli düzeltmeleri derhal yapmalıdır."
            },
            {
                id: "5-4",
                title: "4. Epinpay'in Hakları ve Yükümlülükleri",
                content:
                    "Epinpay, platform üzerindeki reklamlar üzerinde aşağıdaki haklara sahiptir:\n\n• Reklam içeriklerini inceleme ve onaylama.\n• Politikaya aykırı reklamları kaldırma veya düzenleme.\n• Tekrarlayan ihlallerde satıcı hesabını askıya alma veya kapatma.\n• Kullanıcı şikayetlerini değerlendirme ve gerekli önlemleri alma.\n\nEpinpay, reklamların doğruluğundan veya satıcıların taahhütlerinden doğrudan sorumlu değildir, ancak platform standartlarını korumak için gerekli denetimleri yapar."
            },
            {
                id: "5-5",
                title: "5. Kullanıcı Geri Bildirimleri",
                content:
                    "Kullanıcılar, yanıltıcı veya uygunsuz gördükleri reklamları support@epinpay.com adresi üzerinden bildirebilirler. Tüm şikayetler değerlendirilir ve gerekli aksiyonlar alınır."
            }
        ]
    },

    {
        id: "6",
        type: "aml-kyc-policy",
        title: "AML & KYC Politikası",
        description: "Kara para aklama ve kimlik doğrulama süreçleri.",
        publishedAt: "2025-01-01",
        blocks: [
            {
                id: "6-1",
                title: "1. Satıcı Tanımı ve Başvuru",
                content:
                    "Satıcı, Epinpay platformu üzerinde dijital ürünler (oyun kodları, e-pinler, oyun içi para vb.) listeleyen ve satan gerçek veya tüzel kişidir.\n\nSatıcı olmak isteyen kişiler, platform üzerinden başvuru yaparak kimlik doğrulama ve KYC (Müşterini Tanı) süreçlerini tamamlamalıdır. Başvurular Epinpay tarafından değerlendirilir ve onaylanır."
            },
            {
                id: "6-2",
                title: "2. Satıcı Yükümlülükleri",
                content:
                    "Satıcılar, platform üzerindeki faaliyetlerinde aşağıdaki kurallara uymayı kabul eder:\n\n• Listelenen tüm ürünler orijinal, geçerli ve kullanılabilir olmalıdır.\n• Ürün açıklamaları doğru, net ve güncel bilgiler içermelidir.\n• Fiyatlandırma şeffaf ve yanıltıcı olmayan şekilde yapılmalıdır.\n• Satıcı, alıcıya ürünü zamanında ve eksiksiz teslim etmelidir.\n• Müşteri şikayetlerine ve iade taleplerине makul sürede yanıt verilmelidir.\n• Satıcı, sahte, çalıntı veya yasadışı ürün satışı yapamaz."
            },
            {
                id: "6-3",
                title: "3. Komisyon ve Ödeme Koşulları",
                content:
                    "Epinpay, her satıştan belirli bir komisyon oranı alır. Komisyon oranları ürün kategorisine ve satıcı düzeyine göre değişebilir.\n\n• Satıcı kazançları, satış gerçekleştikten sonra blokaj süresine tabi tutulur.\n• Blokaj süresi, olası iade ve şikayet durumlarını değerlendirmek için uygulanan bir güvenlik önlemidir.\n• Blokaj süresi sona erdikten sonra, kazançlar satıcının hesabına aktarılır.\n• Satıcılar, kazançlarını banka hesabına çekebilir veya platformda bakiye olarak tutabilir."
            },
            {
                id: "6-4",
                title: "4. İade ve Şikayet Yönetimi",
                content:
                    "Satıcılar, alıcılardan gelen iade ve şikayet taleplerini zamanında değerlendirmekle yükümlüdür:\n\n• Geçersiz veya hatalı ürün teslimi durumunda satıcı, ürünü değiştirmeli veya iade yapmalıdır.\n• Haklı iade taleplerinde ödeme, alıcıya iade edilir ve ilgili tutar satıcının kazancından düşülür.\n• Tekrarlayan şikayetler veya olumsuz değerlendirmeler, satıcı hesabının askıya alınmasına yol açabilir."
            },
            {
                id: "6-5",
                title: "5. Hesap Askıya Alma ve Fesih",
                content:
                    "Epinpay, aşağıdaki durumlarda satıcı hesabını askıya alma veya kalıcı olarak kapatma hakkını saklı tutar:\n\n• Sahte, çalıntı veya yasadışı ürün satışı.\n• Müşteri şikayetlerinin tekrar etmesi veya çözülmemesi.\n• Platform kurallarının ihlali.\n• Dolandırıcılık veya manipülasyon girişimi.\n• Yasal mercilerden gelen talepler.\n\nHesap kapatma durumunda, satıcının bekleyen ödemeleri incelenir ve haklı kazançları ödenir."
            }
        ]
    }
];
