import { LoadBalance } from "@/features/user/components";

export default function Balance() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute max-lg:hidden w-193.5 h-166 -right-60.5 -bottom-15 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />
      <div className=" mx-auto pt-10 pb-20 relative ">
        <LoadBalance />
      </div>
    </div>
  );
}
