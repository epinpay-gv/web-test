import { ApplicationRecord, StreamerApplicationPageData } from "@/features/application/types/application.type";


export const mockStreamerApplications: ApplicationRecord[] = [
  {
    applicationId: "1234567890",
    fullName: "Burak Yılmaz",
    email: "burak@gmail.com",
    createdAt: "2026-04-01T10:00:00",
    status: "PENDING",
  },
  {
    applicationId: "0987654321",
    fullName: "Burak Yılmaz",
    email: "burak@gmail.com",
    createdAt: "2026-04-01T10:00:00",
    status: "REJECTED",
  },
];

export const mockStreamerApplicationPageData: StreamerApplicationPageData = {
  hero: {
    title: "Yayıncı başvuru formu",
  },
  criteriaTitle: "Başlangıç Paketi Performans Kriterleri:",
  criteriaDescription: "Liglere giriş yapmak ve yerini sağlamlaştırmak için 5 ana odak noktamız var.",
  criteriaItems: [
 {
    id: "1",
    image: "/streamers/application/criteria-1.webp",
    title: "İzlenme Gücü",
    description: "Takipçi sayına oranla minimum %30 izlenme başarısı (Örn: 1M takipçi için 300K izlenme).",
  },
  {
    id: "2",
    image: "/streamers/application/criteria-2.webp",
    title: "Etkileşim & Erişim",
    description: "Sana özel hazırlanan linklerin tıklanma oranları ve içeriklerine gelen beğeni, yorum, paylaşım etkileşimleri.",
  },
  {
    id: "3",
    image: "/streamers/application/criteria-3.webp",
    title: "Dönüşüm Performansı",
    description: "Platforma kazandırdığın yeni üye sayısı ve gerçekleştirdiğin satış hacmi.",
  },
  {
    id: "4",
    image: "/streamers/application/criteria-4.webp",
    title: "İçerik Kalitesi & Marka Uyumu",
    description: "Briefe tam uyum, net mesaj aktarımı ve markamızla en iyi şekilde temsil eden yayın dili.",
  },
  {
    id: "5",
    image: "/streamers/application/criteria-5.webp",
    title: "Süreklilik",
    description: "Her yayında sözlü tanıtımlar ve hikaye/ek içeriklerle desteklenen aktif bir iş birliği süreci.",
  },
  ],
};

