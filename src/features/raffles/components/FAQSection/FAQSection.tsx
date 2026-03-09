import { AccordionItem } from "@/components/common";
import BoxWrapper from "@/components/common/Wrappers/BoxWrapper";
import { FAQ } from "@/types/types";

interface FAQSectionProps {
  data: FAQ[];
}

export default function FAQSection({ data }: FAQSectionProps) {
  return (
    <section className="flex flex-col gap-2 max-w-5xl px-4 md:px-0">
      <BoxWrapper title={"Çekilişler hakkında sık sorulan sorular"}>
        {data.map((item) => (
          <AccordionItem key={item.id} title={item.name}>
            {item.description}
          </AccordionItem>
        ))}
      </BoxWrapper>
    </section>
  );
}
