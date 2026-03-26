import { Packages } from "../../streamers.types";

interface PackageCardDescriptionProps {
  data: Packages;
  isOpen: boolean;
}

export default function PackageCardDescription({
  data,
  isOpen
}: PackageCardDescriptionProps) {
  return (
    <div className={`flex-col justify-center min-w-75 gap-4
    ${isOpen ? "flex" : "hidden"}`}>
      <p className="text-sm md:text-lg font-bold leading-[130%]">Hedefler</p>
      <ul>
        {data.description.map((item, index) => (
          <li
            key={index}
            className="text-(--text-body) text-sm font-normal leading-[150%]"
          >
            - {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
