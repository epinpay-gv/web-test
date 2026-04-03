import Link from "next/link"
import StatusState from "@/components/common/StatusState/StatusState"
import ApplicationHero from "@/features/streamers/components/Application/ApplicationHero"


export default function SuccessForm() {
  return (
    <div>
      <ApplicationHero />
      <StatusState
        image="/streamers/application/success-streamers-form.webp"
        title="Başvurunuz alınmıştır. Değerlendirme aşamasındadır."
        titleClassName="text-[var(--colors-text-text-fg-success-strong,#5EE9B5)]"
        descriptionNode={
          <>
            Başvurunuz için teşekkür ederiz. Başvuru durumunuzu Kullanıcı Paneli{" "}
            <Link href="/user/streamer" className="text-blue-400 hover:underline">
              Yayıncı Başvurusu
            </Link>{" "}
            bölümünden takip edebilirsiniz. Ayrıca değerlendirme sonucunuz burak@gmail.com
            iletişim adresinizden bildirilecektir.
          </>
        }
      />
    </div>
  )
}

// ! Yayıncı Başvurusu kısmındaki yönlendirme, user panelinde yayıncı başvuru sayfa tasarımı yapıldığında değiştirilecek. 