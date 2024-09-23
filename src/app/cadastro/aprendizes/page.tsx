import { Slash, Plus } from "lucide-react"
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import ListaAprendiz, { Status } from "./AprendizList";

const aprendizes = [
  {
    nome: 'Ana Leticia Jorge Figueiredo',
    status: Status.ATIVO,
    telefone: '',
    idade: '',
    dataNascimento: ''
  },
  {
    nome: 'Andreo Joaquim Rodrigues',
    dataNascimento: '24/06/2020',
    idade: '4 anos, 2 meses',
    telefone: '(96) 98808-3515',
    status: Status.ATIVO,
  },
];




interface AprendizesPageProps { }

const AprendizesPage: React.FC<AprendizesPageProps> = () => {
  return (
    <div className="p-4 flex flex-col gap-4 ">
      <div className=' w-100 flex justify-between'>
        <div>  
          <h1 className="text-2xl font-bold mb-4">Aprendizes</h1>
          <Button variant="outline" className="bg-blue-500 text-white px-5"><Plus />Novo Aprendiz</Button>
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
                <BreadcrumbLink href="/cadastro/aprendiz">Aprendizes</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
   
      <ListaAprendiz aprendizes={aprendizes} />
    </div>
  );
};

export default AprendizesPage;
