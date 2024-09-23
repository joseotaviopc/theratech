import React from 'react';

import { DataTable } from './Data-table';

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
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + Incluir Profissional
      </button>
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
