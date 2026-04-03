import { createSeo } from "@/lib/seo";
import { CheckoutClient } from "./checkout-client";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;

//   const res = await getCategories(new URLSearchParams());

//   return createSeo({
//     title: res.metadata.title,
//     description: res.metadata.metaDescription,
//     canonical: `/${locale}/checkout`,
//     locale: locale,
//   });
// }

export default function CartPage() {

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute max-lg:hidden w-193.5 h-166 -right-60.5 -bottom-15 bg-[#4FA9E2] opacity-20 blur-[229px] z-0 pointer-events-none overflow-hidden" />
      <div className=" mx-auto pb-20 relative ">
        <CheckoutClient />
      </div>
    </div>
  );
}
