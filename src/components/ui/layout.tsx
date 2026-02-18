import { MainLayout } from "@/components/layout"
import PageAnimate from '@/components/common/PageAnimate/PageAnimate'; 

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  await params
  return <><MainLayout><PageAnimate>{children}</PageAnimate></MainLayout></>
}
