import { MegaMenuLink } from "../types";
import { ArrowRight } from "flowbite-react-icons/outline";
import { Dribbble } from "flowbite-react-icons/solid";
import NavLink from "./NavLink";

interface MegaMenuProps {
  mainLinks: MegaMenuLink[];
  productLinks: { name: string; url: string }[];
  open: boolean; // açık mı?
  onMouseEnter?: () => void; // içine girince açık kalsın
  onMouseLeave?: () => void; // çıkınca kapansın
  className?: string; // positioning için
}

export default function MegaMenu({
  mainLinks,
  productLinks,
  open,
  onMouseEnter,
  onMouseLeave,
  className,
}: MegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-152 flex rounded-lg border border-(--border-light) overflow-hidden items-stretch absolute top-full left-0
    transition-all duration-200
    ${
      open
        ? "opacity-100 visible translate-y-0"
        : "opacity-0 invisible -translate-y-2"
    }`}
    >
      {/* LEFT SIDE */}
      <div className="w-[384px] flex flex-col p-6 gap-3 mega-menu-left-bg">
        {mainLinks.map((item, index) => (
          <NavLink
            key={index}
            type="withBg"
            titleType="header"
            title={item.title}
            helper={item.description}
            url={item.url}
            leftIcon={
              <ArrowRight size={20} className="hidden group-hover:block" />
            }
            rigthIcon={<Dribbble size={20} />}
            withIconCircle={true}
          />
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className=" w-56 p-6 gap-4 text-sm rounded-r-lg flex flex-col bg-[linear-gradient(rgba(29,48,58,0.6),rgba(29,48,58,0.6)),url('/bg-image.png')] bg-cover bg-center bg-no-repeat">
        <p className="font-semibold">Oyunlar</p>

        <div className="flex flex-col font-base gap-3">
          {productLinks.map((item, index) => (
            <NavLink key={index} title={item.name} url={item.url} />
          ))}
        </div>

        <NavLink
          title="Tümünü incele"
          url="/categories"
          leftIcon={<ArrowRight size={18} />}
          className="w-34 text-(--text-fg-brand)"
        />
      </div>
    </div>
  );
}
