import { MainLayout } from '@/components/layout/MainLayout/main-layout'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}