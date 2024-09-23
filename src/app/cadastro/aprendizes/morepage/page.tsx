"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ParamentrosPage from "./ParametrosPage";

import React from 'react';

interface MorePageProps { }

const MorePage: React.FC<MorePageProps> = () => {
  return (
    <div className="p-4 flex flex-col gap-4 ">
      <Tabs defaultValue="team" >
        <div className="fixed-top  h-12 ">
          <TabsList className=" flex gap-4  ">
            <TabsTrigger value="team" className="font-bold tex-3xl">Equipe Terapêutica</TabsTrigger>
            <TabsTrigger value="reinforcers" className="font-bold tex-3xl">Reforçadores</TabsTrigger>
            <TabsTrigger value="behaviors" className="font-bold tex-3xl">Comportamentos Inadequados</TabsTrigger>
            <TabsTrigger value="evolution" className="font-bold tex-3xl">Parâmentros de Evolução</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex items-center px-4 py-2">
          <TabsContent value="team">
          <ParamentrosPage />
          </TabsContent>
          <TabsContent value="reinforcers">
          <ParamentrosPage />
          </TabsContent>
          <TabsContent value="behaviors">Make changes to your account here.</TabsContent>
          <TabsContent value="evolution">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MorePage;
