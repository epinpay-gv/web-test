"use client"

import * as React from "react"
import { PayMethods } from "./components/PayMethods"
import Image from "next/image"
import { X, Youtube, Facebook, Instagram } from "flowbite-react-icons/solid"
import { FooterColumn } from "./components/FooterColumn"
import { FooterLink } from "./types"

export const Footer = () => {
  const supportLinks : FooterLink[] = [
    { label: "support@epinpay.com", href: "#"},
    { label: "Çözüm Merkezi", href: "#"},
    { label: "Destek Talebi Oluştur", href: "#"},
  ]

  const epinpayLinks : FooterLink[] = [
    { label: "Hakkımızda", href: "#"},
    { label: "Kategoriler", href: "#"},
    { label: "Blog", href: "#"},
    { label: "Şifremi Unuttum", href: "#"},
    { label: "Siparişlerim", href: "#"},
    { label: "Epinpay Premium", href: "#"},
    { label: "EP Puanları", href: "#"},
    { label: "Davet Et ve Kazan", href: "#"},
    { label: "Yayıncılar", href: "#"},
  ]

  const institutionalLinks : FooterLink[] = [
    { label: "Hüküm ve Koşullar", href: "#"},
    { label: "AML & KYC Politikası ", href: "#"},
    { label: "Gizlilik Sözleşmesi", href: "#"},
    { label: "KVKK Aydınlatma Metni", href: "#"},
    { label: "İade Politikası", href: "#"},
    { label: "Reklam Politikası", href: "#"},
    { label: "Ürün ve Listeleme Politikası", href: "#"},
    { label: "Alıcı Koruma Politikası", href: "#"},
    { label: "İletişim", href: "#"},
  ]

  const popularGameLinks : FooterLink[] = [
    { label: "PUBG Mobile", href: "#"},
    { label: "Valorant VP", href: "#"},
    { label: "League of Legends RP", href: "#"},
    { label: "Mobile Legends Diamonds", href: "#"},
    { label: "Steam Wallet Code", href: "#"},
    { label: "Age of Empires Apex Coins", href: "#"},
    { label: "Metin2 EP ", href: "#"},
    { label: "Wolfteam Joypara", href: "#"},
    { label: "Free Fire Diamonds", href: "#"},
    { label: "Rise Online Cash", href: "#"},
    { label: "Knight Online Cash", href: "#"},
  ]

  const popularProductLinks : FooterLink[] = [
    { label: "PUBG Mobile 60 UC", href: "#"},
    { label: "PUBG Mobile 325 UC", href: "#"},
    { label: "Valorant VP 375 VP", href: "#"},
    { label: "Valorant VP 825 VP", href: "#"},
    { label: "460 League of Legends RP", href: "#"},
    { label: "1005 League of Legends RP", href: "#"},
    { label: "Mobile Legends 172 Diamonds", href: "#"},
    { label: "Mobile Legends 1041 Diamonds", href: "#"},
    { label: "5 USD Steam Wallet Code", href: "#"},    
  ]

  return (
    <footer className="w-full">
      <PayMethods />      
      <div className="bg-(--bg-brand) text-black relative overflow-hidden">    
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-60 brightness-150 contrast-125"
          style={{ 
            backgroundImage: "url('/image/footer/bg-pattern.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            filter: "brightness(0) invert(1)"
          }} 
        />        
        <div className="relative z-10 mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
              
              <div className="space-y-6">
                <Image src="/image/logos/epinpay-white-lg.png" width={200} height={48} alt="Epinpay" className="h-10 w-auto" />
                
                <div className="flex gap-2">
                  {[X, Youtube, Facebook, Instagram].map((Icon, idx) => (
                    <a key={idx} href="#" className="bg-(--bg-dark) p-2 rounded-lg text-[#00BBE5] hover:scale-105 transition-transform">
                      <Icon size={20} className="text-white" />
                    </a>
                  ))}
                </div>

                <div className="text-sm leading-relaxed font-medium text-black">
                  <p className="font-bold ">Orpich Reklam Teknoloji LTD.</p>
                  <p>Osmangazi Mah. Bayraklı / İzmir</p>
                  <p>Sicil No: 2315416</p>
                </div>
              </div>

              <FooterColumn title="Destek" links={supportLinks} />
              <FooterColumn title="Epinpay" links={epinpayLinks} />
              <FooterColumn title="Kurumsal" links={institutionalLinks} />
              <FooterColumn title="Popüler Oyunlar" links={popularGameLinks} />
              <FooterColumn title="Popüler Ürünler" links={popularProductLinks} />
              
            </div>

            <div className="mt-12 pt-8 text-center text-[11px] leading-relaxed max-w-4xl mx-auto opacity-80">
              <p>
                epinpay.com platformunu kullanmak, Hüküm ve Koşullarını kabul etmek anlamına gelir. 
                Kişisel verilerinizi nasıl işlediğimizle ilgili bilgiler Gizlilik Sözleşmesinde bulunabilir. 
                Telif hakkı © Epinpay Team. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}