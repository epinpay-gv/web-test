import { User, ShoppingBag, Receipt, Heart, SalePercent, Messages, Bell, Star, Cog, UserHeadset, UsersGroup, LifeSaver } from "flowbite-react-icons/outline"

export const userMenu = [
    {icon: User, label: "Kullanıcı Bilgilerim", url: "/user"},
    {icon: ShoppingBag, label: "Siparişlerim", url: "/user/orders"},
    // {icon: Receipt, label: "Çekilişlerim", url: "/user/raffles"},
    // {icon: Heart, label: "Favorilerim", url: "/user/favorites"},
    // {icon: SalePercent, label: "Kuponlarım", url: "/user/coupons"},
    // {icon: Messages, label: "Mesajlarım", url: "/user/messages"},
    // {icon: Bell, label: "Bildirimlerim", url: "/user/notifications"},
    {icon: Star, label: "Bakiye İşlemleri", url: "/user/balance"},
    {icon: Cog, label: "Ayarlar", url: "/user/settings"},
]

export const userMenuSecondary = [
    // {icon: UserHeadset, label: "Destek Taleplerim", url: "/user/tickets"},
    // {icon: UsersGroup, label: "Yayıncı Başvurusu", url: "/user/streamer-application"},
    // {icon: LifeSaver, label: "Yardım", url: "/support-hub"},
]