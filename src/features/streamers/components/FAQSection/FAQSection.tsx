import { AccordionItem } from "@/components/common";
import BoxWrapper from "@/components/common/Wrappers/BoxWrapper";
import { FAQ } from "@/types/types";

interface FAQSectionProps {
  data: FAQ[];
}

export default function FAQSection({ data }: FAQSectionProps) {
  return (
    <section className="bg-(--bg-brand-softer) w-full">
      <div className="flex flex-col gap-8 max-w-5xl px-4 md:px-0 py-10 mx-auto">
        <h2 className="text-4xl text-center font-bold">
          Yayıncılar hakkında sık sorulan sorular
        </h2>
        <BoxWrapper>
          {data.map((item) => (
            <AccordionItem key={item.id} title={item.name}>
              {item.description}
            </AccordionItem>
          ))}
        </BoxWrapper>
      </div>
    </section>
  );
}
