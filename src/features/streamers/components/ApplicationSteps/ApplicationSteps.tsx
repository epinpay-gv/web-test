export default function ApplicationSteps() {
  const data = [
    {
      title: "Başvuru formunu doldur ve gönder",
      text: "Sosyal medya kanallarını ve yayın mecralarını içeren formu doldurarak bize gönder.",
      image: "",
    },
    {
      title: "Başlangıç ligiyle topluluğa katıl",
      text: "Bu paket, senin performansını ölçmemize ve seni en doğru lige yerleştirmemize yardımcı olur.",
      image: "",
    },
    {
      title: "Belirtilen hedefleri tamamla",
      text: "Paket içeriğindeki performans kriterlerini (izlenme, etkileşim, dönüşüm) incele.",
      image: "",
    },
    {
      title: "Ödülünü kazan.",
      text: "Seviyene uygun lige yüksel, hedeflerini tamamla ve ödülünü kap!",
      image: "",
    },
  ];
  return (
    <section className="space-y-8">
      <h2 className="text-4xl text-center font-bold">Nasıl yayıncı olunur?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((i, index) => (
          <div
            key={index}
            className="w-125 h-89 rounded-xl p-8 relative overflow-hidden"
            style={{
              background: `radial-gradient(89.91% 315.77% at 12.94% 70.24%, rgba(0, 0, 0, 0.3416) 0%, rgba(255, 255, 255, 0.448) 0.01%, rgba(0, 0, 0, 0.56) 80.77%), #8B0836`,
              backgroundBlendMode: "screen",
            }}
          >
            <div className="text-[#AF5575] z-0 font-bold absolute -left-8 -bottom-26 text-[320px]">
              {index + 1}
            </div>
            <div className="absolute bottom-4 z-10">
              <p className="text-2xl font-bold text-lime-300 leading-[150%]">
                {i.title}
              </p>
              <p className="text-sm text-white leading-[150%]">{i.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
