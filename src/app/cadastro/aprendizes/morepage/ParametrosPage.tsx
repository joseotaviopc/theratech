import React from 'react';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TeamMember {
  id: number;
  name: string;
  cpf: string;
  participationDate: string;
  role: string;
  isSupervisor: boolean;
}

const members: TeamMember[] = [
  {
    id: 50634,
    name: "Caroline Gabrielle Nascimento da Silva",
    cpf: "024.482.912-84",
    participationDate: "2 semanas atrás",
    role: "Aplicador ABA",
    isSupervisor: false,
  },
  {
    id: 81877,
    name: "Marcia Valerio Dias de Souza",
    cpf: "",
    participationDate: "09/07/2024 09:57:56",
    role: "Coordenador(a) Administrativo(a)",
    isSupervisor: true,
  },
  {
    id: 90332,
    name: "Luiza Helena Valente",
    cpf: "",
    participationDate: "28/06/2024 16:13:39",
    role: "Aplicador ABA",
    isSupervisor: false,
  },
];

const ParamentrosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestão da equipe</h2>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white px-4 py-2 rounded mb-4" >  + Incluir Profissional</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Incluir Profissional</DialogTitle>
       
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">PROFISSIONAL</th>
            <th className="border p-2 text-left">DATA PARTICIPAÇÃO</th>
            <th className="border p-2 text-left">CARGO</th>
            <th className="border p-2 text-left">SUPERVISOR</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="border p-2">{`#${member.id}`}</td>
              <td className="border p-2">
                {member.name} <br />
                {member.cpf}
              </td>
              <td className="border p-2">{member.participationDate}</td>
              <td className="border p-2">{member.role}</td>
              <td className="border p-2">{member.isSupervisor ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button className="bg-gray-300 text-black px-4 py-2 rounded">❮</button>
        <span>Página 1 de 1 de 3 registros.</span>
        <button className="bg-gray-300 text-black px-4 py-2 rounded">❯</button>
      </div>

    </div>
  );
};

export default ParamentrosPage;
