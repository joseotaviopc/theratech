import DashboardLayout from "@/components/dashboardLayout";

export default function RootAtendimentoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}