import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight";


export default function MasterMenu() {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-12 lg:mt-15 py-20">
        <MasterMenuLeft />
        <MasterMenuRight />
      </div>

      {/* Mobile */}
      <div className="md:hidden pb-4">
        <MasterMenuLeft section="top" />
        <MasterMenuRight />
        <MasterMenuLeft section="bottom" />
      </div>
    </div>
  );
}
