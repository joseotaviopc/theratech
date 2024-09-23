"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import Logo from "@/assets/images/theratec-logo.png"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const { setTheme } = useTheme()

  return (
    <main className="flex items-center min-h-screen flex-col px-4 pt-2">
      <header className="flex justify-end self-end">
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" onClick={() => setTheme("dark")} />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" onClick={() => setTheme("light")} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>
      <div className="flex flex-col items-center md:max-w-xl">
        <Image src={Logo} alt="" className="dark:invert md:max-w-md"/>
        <h1 className="text-2xl mb-4">Ops... Página não encontrada</h1>
        <div className="flex justify-center w-full mt-10">
          <Link href="/" className="text-blue-500">Página inicial</Link>
        </div>
        <p className="text-center text-sm mt-4">Não tem uma conta.<Link href="/register" className="text-blue-500"> Clique aqui para se inscrever</Link></p>
      </div>
    </main>
  );
}
