import { MegaMenuLink } from "./types";
import { ArrowRight } from "flowbite-react-icons/outline";
import Navlink from "./Navlink";
import { Dribbble } from "flowbite-react-icons/solid";

interface MegaMenuProps {
  mainLinks: MegaMenuLink[];
  productLinks: { name: string; url: string }[];
}

export default function MegaMenu({ mainLinks, productLinks }: MegaMenuProps) {
  return (
    <div className="w-152 flex rounded-lg border border-(--border-light) overflow-hidden items-stretch">
      {/* LEFT SIDE */}
      <div className="w-[384px] flex flex-col p-6 gap-3 mega-menu-left-bg ">
        {mainLinks.map((item, index) => (
          <Navlink
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
        <p className="font-semibold px-2">Oyunlar</p>

        <div className="flex flex-col font-base">
          {productLinks.map((item, index) => (
            <Navlink key={index} title={item.name} url={item.url} />
          ))}
        </div>

        <Navlink
          title="Tümünü incele"
          url="/categories"
          leftIcon={<ArrowRight size={18} />}
          className="w-34 text-(--text-fg-brand)"
        />
      </div>
    </div>
  );
}
