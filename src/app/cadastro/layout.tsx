import DashboardLayout from "@/components/dashboardLayout";

export default function RootCadastroLayout({
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