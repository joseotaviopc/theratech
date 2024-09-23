"use client";

import ListaProfissional from "./ProfissionalList";
import { useEffect, useState } from "react";
import { getAllProfissionais } from "@/lib/api";
import { CreateProfissionalType } from "./createProfissionalSchema";
import { useRouter } from "next/navigation";

interface ProfissionaisPageProps { }

const ProfissionaisPage: React.FC<ProfissionaisPageProps> = () => {
  const route = useRouter()
  const [showEditProfissional, setShowEditProfissional] = useState(false);
  const [profissionais, setProfissionais] = useState<CreateProfissionalType[]>([]);

  async function handleGetProfissionais(token: string) {
    const { data } = await getAllProfissionais(token);
    if (data) {
      setProfissionais(data);
    }
  }

  function handleCreateProfissionais() {
    setShowEditProfissional(true)
    route.replace('/cadastro/profissionais/0')
  }

  async function handleCreateProfissional(profissional: CreateProfissionalType) {
    // const token = window?.localStorage.getItem('token');
    // if (!token) {
    //   console.log('sem token')
    //   return
    // }
    // const { data } = await createProfissionais({token, profissional});
    // console.log('handleCreateProfissional', data)
  }

  useEffect(() => {
    const token = window?.localStorage.getItem('token');
    if (token) {
      handleGetProfissionais(token);
    }
  }, []);

  return (
      <ListaProfissional profissionais={profissionais} setShowEditProfissional={setShowEditProfissional} />
  )
}

export default ProfissionaisPage;
