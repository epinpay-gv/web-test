import { mockStreamerApplicationPageData } from "@/mocks/streamers.mock";
import PerformanceCriteriaCard from "./PerformanceCriteriaCard";

export default function PerformanceCriteriaSection() {
  const { criteriaTitle, criteriaDescription, criteriaItems } = mockStreamerApplicationPageData;

  return (
    <div className="bg-(--bg-neutral-primary-strong) rounded-xl flex flex-col gap-6 py-8 px-6 mt-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-[20px]">{criteriaTitle}</h2>
        <p className="text-[16px]">{criteriaDescription}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {criteriaItems.map((item) => (
          <PerformanceCriteriaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}