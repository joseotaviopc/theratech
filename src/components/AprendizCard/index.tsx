import React from 'react';
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
        <div className="bg-white shadow-2xl rounded-md flex flex-col  my-4 ">
            <div className="flex items-start gap-4 bg-slate-100 p-4 rounded-tr-md rounded-tl-md">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{nome.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 ">
                    <h3 className="font-semibold text-lg truncate text-blue-500 ">{nome}</h3>
                    <span className="text-sm font-light text-slate-600">
                        {cpf || "CPF: Indisponível"}
                    </span>
                </div>
                <Badge variant="secondary" className={`text-xs rounded ${status === 'ATIVO' ? 'bg-lime-500 text-white' : 'bg-red-500 text-white'}`}>
                    {status}
                </Badge>
            </div>

            <div className=" p-4 bg-slate-50 ">
                <div className="grid gap-2 grid-cols-2">
                    {/* Data de Nascimento e Idade */}
                    <div className="p-2">
                        <p className='font-semibold text-sm'>Data de Nascimento</p>
                        <p className="text-xs text-gray-600 ">
                            {dataNascimento
                                ? `${dataNascimento}`
                                : " - "}
                        </p>
                    </div>

                    <div className="p-2">
                        <p className='font-semibold text-sm'>Idade</p>
                        <p className="text-xs text-gray-600">
                            {idade
                                ? `(${idade})`
                                : " - "}
                        </p>
                    </div>

                    <div className="p-2">
                        <p className='font-semibold text-sm'>Telefone</p>
                        <p className="text-xs text-gray-600">
                            {telefone
                                ? `${telefone}`
                                : " - "}
                        </p>
                    </div>

                    <div className="p-2">
                        <p className='font-semibold text-sm'>Celular</p>
                        <p className="text-xs text-gray-600">
                            {celular
                                ? `${celular}`
                                : " - "}
                        </p>
                    </div>


                </div>

            </div>
            <div className='flex justify-end gap-4  px-10 py-4 w-full'>
                <div><Eye /></div>
                <div><Ellipsis /></div>
            </div>
        </div>

    );
};

export default AprendizCard;
