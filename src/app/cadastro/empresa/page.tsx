"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { type Company, getCompanys } from "@/lib/api";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";
import EditEmpresa from "./EditEmpresa";

type EmpresaPageProps = {};

const EmpresaPage: React.FC<EmpresaPageProps> = () => {
  const [companys, setCompanys] = useState<Company[]>([]);

  async function handleGetCompanys(token: string) {
    const { data } = await getCompanys(token);
    if (data) {
      setCompanys(data);
    }
  }

  useEffect(() => {
    const token = window?.localStorage.getItem('token');
    if (token) {
      handleGetCompanys(token);
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className=" w-100 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Empresa</h1>
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
                <BreadcrumbLink href="/cadastro/empresa">Empresa</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {companys?.map((company) => (
        <EditEmpresa key={company._id} company={company} />
      ))}
    </div>
  );
};

export default EmpresaPage;
