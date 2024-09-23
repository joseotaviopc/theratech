"use client";

import React from 'react';
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


import { HamburgerMenuIcon, DoubleArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

interface SidebarProps {
  handleToogleMenu: () => void
  showMenu: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ handleToogleMenu, showMenu }) => {
  const [showCollapsible, setShowCollapsible] = React.useState({
    cadastro: true,
    atendimento: true
  })

  type Menu = keyof typeof showCollapsible

  function handleShowCollapsible(menu: Menu) {
    setShowCollapsible({ ...showCollapsible, [menu]: !showCollapsible[menu] })
  }

  return (
    <>
      <div className='absolute left-0 top-12'>
        <Button asChild variant="link" size="icon" className='hover:scale-125 transition-all'>
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " onClick={handleToogleMenu} />
        </Button>
      </div>
      {/* <Cross1Icon className={`h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`} onClick={handleToogleMenu} /> */}
      <div className={`w-64 bg-[#3097BF] flex flex-col min-h-screen font-sans transition-all ${showMenu ? "translate-x-0" : "-translate-x-full hidden"}`}>
        <div className="flex items-center justify-center h-20 shadow relative">
          <span className="text-2xl font-semibold">Theratec</span>
          <div className={`absolute  ${showMenu ? "-right-2 -bottom-2" : "rigth-0 bottom-0"}`}>
            <Button asChild variant="link" size="icon" className='hover:scale-125 transition-all'>
              <>
                <DoubleArrowLeftIcon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all`} onClick={handleToogleMenu} />
                <span className="sr-only">Toggle theme</span>
              </>
            </Button>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-zinc-500">
            Dashboard
          </Link>
          <Collapsible open={showCollapsible.cadastro}>
            <div className='flex flex-row justify-between rounded hover:bg-zinc-500'>
              <Link href="/cadastro" className="block px-4 py-2">
                Cadastro
              </Link>
              <CollapsibleTrigger>
                <Button asChild variant="link" >
                  <>
                    <ChevronUpIcon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${showCollapsible.cadastro ? 'hidden' : 'block'}`} onClick={() => handleShowCollapsible('cadastro')}/>
                    <ChevronDownIcon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${showCollapsible.cadastro ? 'block' : 'hidden'}`} onClick={() => handleShowCollapsible('cadastro')}/>
                  </>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <Link href="/cadastro/empresa" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Empresa
              </Link>
              <Link href="/cadastro/profissionais" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Profissionais
              </Link>
              <Link href="/cadastro/aprendizes" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Aprendizes
              </Link>
              <Link href="/cadastro/avaliacoes" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Avaliações
              </Link>
              <Link href="/cadastro/programas" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Programas
              </Link>
              
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible open={showCollapsible.atendimento}>
            <div className='flex flex-row justify-between rounded hover:bg-zinc-500'>
              <Link href="/atendimento" className="block px-4 py-2">
                Atendimento
              </Link>
              <CollapsibleTrigger>
                <Button asChild variant="link" >
                  <>
                    <ChevronUpIcon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${showCollapsible.atendimento ? 'hidden' : 'block'}`} onClick={() => handleShowCollapsible('atendimento')} />
                    <ChevronDownIcon className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${showCollapsible.atendimento ? 'block' : 'hidden'}`} onClick={() => handleShowCollapsible('atendimento')} />
                  </>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <Link href="/atendimento/anamnese" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Anamnese
              </Link>
              <Link href="/atendimento/evolucao" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Evolução
              </Link>
              <Link href="/atendimento/secao" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Seção
              </Link>
              <Link href="/atendimento/planoTerapeutico" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Plano Terapêutico
              </Link>
              <Link href="/atendimento/avaliacao" className="block pl-8 py-1 rounded hover:bg-zinc-500">
                Avaliação
              </Link>
            </CollapsibleContent>
          </Collapsible>
          
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
