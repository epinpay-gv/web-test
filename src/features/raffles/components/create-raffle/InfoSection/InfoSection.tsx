import { CheckBox, Input, Textarea } from "@/components/common";
import { RaffleFormData, SectionProps } from "@/features/raffles/raffle.types";
import { ParticipationConstraint } from "@/types/types";

const participationTypes: { 
  id: RaffleFormData["type"];
  title: string; 
  description: string; 
}[] = [
  {
    id: "free",
    title: "Bedelsiz",
    description: 'Kullanıcının ücret ödemeden, "Katıl" butonuna basarak dahil olduğu çekiliş tipidir.',    
  },
  {
    id: "ep",
    title: "EP",
    description: "Kullanıcı, aktivitelerden kazandığı puanla katılır.",
  },
  {
    id: "coupon",
    title: "Kupon",
    description: "Kullanıcı, promosyon kodunu girerek katılır.",
  },
];

export function InfoSection({ data, onUpdate, onNext }: SectionProps) {
  // Seçenekleri bir dizi olarak tanımlayalım
  const constraintOptions = [
    { value: ParticipationConstraint.EVERYONE, label: "Herkes", color: "text-blue-400", disabled: false },
    { value: ParticipationConstraint.REFERENCE, label: "Referanslı kullanıcılara özel", color: "text-gray-400", disabled: false },
    { value: ParticipationConstraint.PREMIUM, label: "Premium kullanıcılar", color: "text-amber-400", disabled: true },
    // { value: ParticipationConstraint.FOLLOWER, label: "Sadece Takipçiler", color: "text-purple-400" },
  ];


  return (
    <div className="space-y-6 p-6 bg-(--bg-neutral-primary-soft) rounded-(--radius-base)">
      <div className="border-b border-(--border-default) pb-4 text-(--text-body)">
        Çekiliş oluşturuluyor
      </div>
      
      {/* Çekiliş Adı Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-(--text-heading) tracking-wider">
          Çekiliş Adı / Başlığı
        </label>
        <Input
          value={data.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          onClear={() => onUpdate({ title: "" })} 
          placeholder="Çekiliş adı girin"
          inputSize="base"
          variant="default"        
          wrapperClassName="w-full relative"
          className=" border border-(--border-default-medium) "
        />
      </div>

      {/* Çekiliş Açıklaması */}
      <div className="flex flex-col w-1/2 gap-2">
        <label className="text-sm font-bold text-(--text-heading) tracking-wider">
          Çekiliş Açıklaması
        </label>
        <Textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}          
          placeholder="Çekiliş açıklaması girebilirsiniz"
          rows={5}
          className="bg-(--bg-neutral-secondary-medium)! border-(--border-default-medium)"
        />
        <p className="text-xs text-(--text-body)  ">Opsiyonel</p>
      </div>

      {/* Katılımcı Türü */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-(--text-heading) uppercase tracking-wider">
          Kimler katılabilir
        </label>              
        <div className="flex flex-wrap items-center gap-6 p-1">
          {constraintOptions.map((option) => (
            <CheckBox
              key={option.value}
              id={`constraint-${option.value}`}
              label={option.label}
              variant="square" 
              checked={data.constraint ==  option.value}
              disabled={option.disabled}
              onCheckedChange={(checked) => {                
                if (checked) {
                  onUpdate({ constraint: option.value });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === " " && data.constraint === option.value) {
                  e.preventDefault();
                }
              }}
            />
          ))}
        </div>
      </div>        
      
      {/* Katılım Türü */}
      <div className="flex flex-col gap-4">
        <label className="text-sm font-bold text-(--text-heading) tracking-wider">
          Katılım Tipi
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">        
          <div 
            onClick={() => onUpdate({ type: participationTypes[0].id })}
            className="p-4 rounded-(--radius-base) border-2 border-(--border-default) cursor-pointer transition-all duration-300"              
          >
            <CheckBox
              label={participationTypes[0].title}
              checked={data.type === participationTypes[0].id}
              onCheckedChange={() => onUpdate({ type: participationTypes[0].id })}
              className="mb-2"
            />
            <p className="text-[10px] text-(--text-body) leading-relaxed pl-9">
              {participationTypes[0].description}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {participationTypes.slice(1).map((type) => (
              <div
                key={type.id}                
                className="p-4 rounded-(--radius-base) opacity-40 border-2 border-(--border-default) cursor-not-allowed transition-all duration-300 flex flex-col gap-1"
              >
                <CheckBox
                  label={type.title}
                  checked={data.type === type.id}
                  onCheckedChange={() => onUpdate({ type: type.id })}
                  disabled={true}
                />
                <p className="text-[11px] text-(--text-body) cursor-not-allowed leading-snug pl-9">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onNext} 
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors mt-4"
      >
        Sonraki Adım
      </button>
    </div>
  );
}
