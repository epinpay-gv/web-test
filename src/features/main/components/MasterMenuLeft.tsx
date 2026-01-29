'use client'

import { BadgeCheck, ChevronDoubleRight, Wallet } from "flowbite-react-icons/outline"
import FeatureItem from "@/components/common/Label/FeatureItem"
import SectionHeader from "@/components/common/Label/SectionHeader"
import ProductCard from "@/components/common/NavLinks/ProductCard"

export default function MasterMenuLeft() {
  const infoItems = [
    { icon: ChevronDoubleRight, title: "Anında Teslimat" },
    { icon: BadgeCheck, title: "Lisanslı Epinler" },
    { icon: Wallet, title: "Güvenli Ödeme" },
  ]

const products = [
  { title: "2150 Coins", price: 599 },
  { title: "4300 Coins", price: 1099 },
  { title: "8700 Coins", price: 1999 },
  { title: "8700 Coins", price: 1999 },
  { title: "8700 Coins", price: 1999 },
  { title: "8700 Coins", price: 1999 },
]


return (
<div>
{/* Heading */}
<div className="text-3xl font-bold">
    <p className="gradient-text">Oyun paranı anında yükle</p>
    <p className="gradient-text">oyundan hiç kopma</p>
    </div>

    {/* Info icons */}
    <div className="mt-3 flex gap-6">
    {infoItems.map((item, index) => (
    <FeatureItem
    key={index}
    icon={item.icon}
    title={item.title}
    />
    ))}
    </div>

   <SectionHeader
  title="Apex Legends"
  actionLabel="Tüm Ürünleri Gör"
  onActionClick={() => {}}
  

/>

   <div className="mt-6 grid grid-cols-3 gap-3">
  {products.map((item, index) => (
    <ProductCard
      key={index}
      title={item.title}
      price={item.price}
    />
  ))}
</div>


      <style jsx>{`
        .gradient-text {
          background: linear-gradient(to right, #ffffff, #24d7ff);
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  )
}
