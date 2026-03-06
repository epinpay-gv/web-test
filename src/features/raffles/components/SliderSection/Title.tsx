import { NavLink } from "@/components/common";

interface TitleProps {
  title: string;
}
export default function Title({ title }: TitleProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <NavLink title="Tümünü gör" url="/all-raffles"/>
    </div>
  );
}
