import { MainLayout } from "@/components/layout"

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  await params
  return <><MainLayout>{children}</MainLayout></>
}
