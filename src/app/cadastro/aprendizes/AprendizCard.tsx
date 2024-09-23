import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Pencil, Ellipsis } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface AprendizCardProps {
    nome: string;
    dataNascimento?: string;
    idade?: string;
    telefone?: string;
    celular?: string;
    cpf?: string;
    status: 'ATIVO' | 'INATIVO';
}

const AprendizCard: React.FC<AprendizCardProps> = ({
    nome,
    dataNascimento,
    idade,
    telefone,
    celular,
    cpf,
    status,
}) => {
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
                <Badge variant="secondary" className={`text-xs rounded ${status === 'ATIVO' ? 'bg-lime-700 text-white' : 'bg-red-500 text-white'}`}>
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
                                ? `${dataNascimento}`
                                : "-"}
                        </p>
                    </div>

                    {/* Idade */}
                    <div className="p-2">
                        <p className='text-xs text-gray-400'>Idade</p>
                        <p className="text-sm text-gray-600 font-medium">
                            {idade ? `${idade}` : "-"}
                        </p>
                    </div>

                    {/* Cargo */}
                    <div className="p-2">
                        <p className='text-xs text-gray-400'>Telefone</p>
                        <p className="text-sm text-gray-600 font-medium">
                            {telefone ? `${telefone}` : "-"}
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
                <div className='flex flex-col gap-1 items-center'>
                    <Pencil />
                    <p className='text-sm'>Editar</p>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <Switch checked />
                    <p className='text-sm mt-1'>Inativar</p>
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <Link href="/cadastro/aprendizes/morepage" >
                        <Ellipsis />
                        <p className='text-sm'>Mais</p>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default AprendizCard;

