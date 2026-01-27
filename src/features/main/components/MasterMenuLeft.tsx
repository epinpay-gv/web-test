'use client'

import { BadgeCheck, ChevronDoubleRight, Wallet } from "flowbite-react-icons/outline"
import GameCard from "@/components/common/GameCard/GameCard"

export default function MasterMenuLeft() {
  const infoItems = [
    { icon: ChevronDoubleRight, title: "Anında Teslimat" },
    { icon: BadgeCheck, title: "Lisanslı Epinler" },
    { icon: Wallet, title: "Güvenli Ödeme" },
  ]

  const gameCards = [
    { coins: "2150 Coins", price: "₺599" },
    { coins: "4300 Coins", price: "₺1.099" },
    { coins: "8700 Coins", price: "₺1.999" },
    { coins: "8700 Coins", price: "₺1.999" },
    { coins: "8700 Coins", price: "₺1.999" },
    { coins: "8700 Coins", price: "₺1.999" },
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
        {infoItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-center gap-1">
              <Icon size={20} className="text-fg-brand" />
              <p className="text-xs text-(--text-body)">{item.title}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex gap-2 text-sm font-medium">
        <p>Apex Legends</p>
        <button className="text-(--text-fg-brand)">Tüm Ürünleri Gör</button>
      </div>

    <div className="mt-6 grid grid-cols-3 gap-3">
  {gameCards.map((item, index) => (
    <GameCard
      key={index}
      coins={item.coins}
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
