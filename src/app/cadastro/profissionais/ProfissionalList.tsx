import React, { Dispatch, SetStateAction } from 'react';
import {
  Search,
  ListFilter
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfissionalCard from './ProfissionalCard';
import { CreateProfissionalType } from './createProfissionalSchema';

export enum Status {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

interface ListaProfissionalProps {
  profissionais: Array<CreateProfissionalType>;
  setShowEditProfissional: Dispatch<SetStateAction<boolean>>
}

const ListaProfissional: React.FC<ListaProfissionalProps> = ({ profissionais, setShowEditProfissional }) => {
  return (
    <div className="flex flex-col bg-white p-8 rounded-md">
      <div className="mb-4 flex flex-row w-100  justify-between items-center">
        <div className="relative  flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] "
          />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 border-blue-400 p-4 text-blue-500">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filtros
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='flex flex-wrap gap-4'>
        {profissionais.map((profissional, index) => (
          <ProfissionalCard key={index} profissional={profissional} setShowEditProfissional={setShowEditProfissional} />
        ))}
      </div>
    </div>
  );
};

export default ListaProfissional;
