"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = useRouter()
  function handleCreateProfissionais() {
    // setShowEditProfissional(true)
    route.replace('/cadastro/profissionais/0')
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className=' w-100 flex justify-between'>
        <div>
          <h1 className="text-2xl font-bold mb-4">Profissionais</h1>
          <Button variant="outline" className="bg-blue-500 text-white px-5" onClick={handleCreateProfissionais}><Plus />Novo Proffisional</Button>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/cadastro">Cadastro</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/cadastro/profissionais">Profissionais</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {children}
    </div>
  )
}
