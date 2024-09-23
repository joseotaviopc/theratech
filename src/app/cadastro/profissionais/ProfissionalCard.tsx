import React, { Dispatch, SetStateAction } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Pencil, Ellipsis } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { normalizePhoneNumber } from '@/utils/stringHelpers';
import { CreateProfissionalType, StatusEnum } from './createProfissionalSchema';
import { useRouter } from 'next/navigation';

interface ProfissionalCardProps {
    profissional: CreateProfissionalType
    setShowEditProfissional: Dispatch<SetStateAction<boolean>>
}

const ProfissionalCard: React.FC<ProfissionalCardProps> = ({ profissional, setShowEditProfissional }) => {
    const { nome, dataNascimento, telefone, celular, cpf, status, cargo, _id: id } = profissional
    // console.log('== ==', JSON.stringify(profissional, null, 4))
    const route = useRouter()

    function handleEditProfissional(profissional: CreateProfissionalType) {
      setShowEditProfissional(true)
      route.push(`/cadastro/profissionais/${id}`)
    }

    return (
        <div className="bg-white shadow-2xl rounded-md flex flex-col space-y-4 my-4 p-4">
            <div className="flex items-start gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{nome.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{nome}</h3>
                    <span className="text-sm font-light text-slate-600">
                        {cpf || "CPF: Indisponível"}
                    </span>
                </div>
                <Badge variant="secondary" className={`text-xs rounded text-white ${status === StatusEnum.ATIVO ? 'bg-lime-700' : 'bg-red-500'}`}>
                    {status}
                </Badge>
            </div>

            <div className="bg-slate-100 p-4 rounded-md">
                <div className="grid gap-2 grid-cols-2">
                    {/* Data de Nascimento e Idade */}
                    <div className="p-2">
                        <p className='text-xs text-gray-400'>Data Nascimento</p>
                        <p className="text-sm text-gray-600 font-medium">
                            {dataNascimento
                                ? `${Intl.DateTimeFormat("pt-br",{dateStyle: "medium"}).format(new Date(dataNascimento))}`
                                : "-"}
                        </p>
                    </div>

                    {/* Idade */}
                    <div className="p-2">
                        <p className='text-xs text-gray-400'>Idade</p>
                        <p className="text-sm text-gray-600 font-medium">
                            {cargo ? `${cargo}` : "-"}
                        </p>
                    </div>

                    {/* Cargo */}
                    <div className="p-2">
                        <p className='text-xs text-gray-400'>Telefone</p>
                        <p className="text-sm text-gray-600 font-medium">
                            {telefone ? `${normalizePhoneNumber(telefone)}` : "-"}
                        </p>
                    </div>

                    { }
                    <div className="p-2">
                        <p className='text-xs text-gray-400'>Supervisor</p>
                        <p className="text-sm text-gray-600 font-medium">
                            {celular ? `: ${celular}` : "-"}
                        </p>
                    </div>
                </div>

            </div>
            <div className='flex items-start gap-4 justify-between px-10 w-full'>
                <div className='flex flex-col gap-1 items-center'>
                    <Eye />
                    <p className='text-sm'>Vizualizar</p>
                </div>
                <div className='flex flex-col gap-1 items-center cursor-pointer' onClick={() => handleEditProfissional(profissional)}>
                    <Pencil />
                    <p className='text-sm'>Editar</p>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <Switch checked />
                    <p className='text-sm mt-1'>Inativar</p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    {/* <Button variant="outline">Open popover</Button> */}
                    <div className='flex flex-col gap-1 items-center cursor-pointer'>
                        <Ellipsis />
                        <p className='text-sm'>Mais</p>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
            </div>
        </div>

    );
};

export default ProfissionalCard;
