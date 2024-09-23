
import React from 'react';
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard!</h1>
        <p className="mb-4">Esta é uma página de dashboard simples.</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-blue-500 text-white rounded-md shadow">
            <h2 className="text-xl font-semibold">Seção 1</h2>
            <p>Conteúdo da seção 1.</p>
          </div>
          <div className="p-4 bg-green-500 text-white rounded-md shadow">
            <h2 className="text-xl font-semibold">Seção 2</h2>
            <p>Conteúdo da seção 2.</p>
          </div>
          <div className="p-4 bg-red-500 text-white rounded-md shadow">
            <h2 className="text-xl font-semibold">Seção 3</h2>
            <p>Conteúdo da seção 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
