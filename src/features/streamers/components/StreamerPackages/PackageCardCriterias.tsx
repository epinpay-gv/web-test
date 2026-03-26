import { Packages } from "../../streamers.types";

interface PackageCardCriteriasProps {
  data: Packages;
  isOpen: boolean;
}

export default function PackageCardCriterias({
  data,
  isOpen
}: PackageCardCriteriasProps) {
  return (
    <div className={`flex-col justify-center gap-4 w-full 
    ${isOpen ? "flex" : "hidden"}`}>
      {data.detail_criteria.map((item) => (
        <div key={item.id}>
          <p className="text-(--text-body) text-sm font-medium leading-[150%]">
            {item.name} :
          </p>
          <p className="text-lg font-bold leading-[130%]">{item.value}</p>
        </div>
      ))}

      <div>
        <p className="text-(--text-body) text-sm font-medium leading-[150%]">
          Aylık Ödül
        </p>
        <p className="text-(--text-fg-yellow) text-lg font-bold leading-[130%]">
          {data.rewardMin}
          {data.rewardCurrenct} / {data.rewardMax}
          {data.rewardCurrenct}
        </p>
      </div>
    </div>
  );
}
