import { User, ShoppingBag, Receipt, Heart, SalePercent, Messages, Bell, Star, Cog } from "flowbite-react-icons/outline"

export const userMenu = [
    {icon: User, label: "Kullanıcı Bilgilerim", url: "/"},
    {icon: ShoppingBag, label: "Siparişlerim", url: "/user/orders"},
    {icon: Receipt, label: "Çekilişlerim", url: "/user/raffles"},
    {icon: Heart, label: "Favorilerim", url: "/user/favorites"},
    {icon: SalePercent, label: "Kuponlarım", url: "/user/coupons"},
    {icon: Messages, label: "Mesajlarım", url: "/user/messages"},
    {icon: Bell, label: "Bildirimlerim", url: "/user/notifications"},
    {icon: Star, label: "Bakiye İşlemleri", url: "/user/wallet"},
    {icon: Cog, label: "Ayarlar", url: "/user/settings"},
    
]