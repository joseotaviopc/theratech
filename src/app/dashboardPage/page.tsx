// pages/dashboard.tsx
import React from 'react';
import DashboardLayout from '@/components/dashboardLayout';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Conteudo */}
      <h1 className="text-2xl font-bold">Desempenho por Sessões</h1>
      <div className="mt-4">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
            <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Final</label>
            <input type="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aprendiz</label>
            <input type="text" placeholder="Busque pelo aprendiz..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Aprendiz</th>
                <th className="px-4 py-2">Profissional</th>
                <th className="px-4 py-2">Sessões</th>
                <th className="px-4 py-2">Tentativas</th>
                <th className="px-4 py-2">Omissões</th>
                <th className="px-4 py-2">Erros</th>
                <th className="px-4 py-2">Ajudas</th>
                <th className="px-4 py-2">Independ.</th>
                <th className="px-4 py-2">Med. Tent.</th>
                <th className="px-4 py-2">Med. Ind.</th>
                <th className="px-4 py-2">% Ind. Med.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Ana Leticia Jorge Figueiredo Castro</td>
                <td className="border px-4 py-2">Odenilsa Santos dos Reis</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">46</td>
                <td className="border px-4 py-2">3</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">41</td>
                <td className="border px-4 py-2">46</td>
                <td className="border px-4 py-2">41</td>
                <td className="border px-4 py-2">89.13</td>
              </tr>
              {/* Adicione mais linhas conforme necessário */}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
