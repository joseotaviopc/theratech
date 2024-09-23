"use client";

import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { UserCircle } from "@phosphor-icons/react";
import { LogOut, User } from "lucide-react";
import Logo from "@/assets/images/theratec-logo-icon.png"
import { useUser } from '@/context/user';
import { useRouter } from 'next/navigation';

const Topbar: React.FC = () => {
  const { setTheme } = useTheme()
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleLogout() {
    window?.localStorage.removeItem('token');;
    setUser(null);
    router.push("/");
  }

  return (
    <div className="w-full shadow flex items-center justify-between px-4 pl-6 py-2 font-sans">
      <div className="flex items-center">
        <Link href="/" className="block rounded ">
          <Image src={Logo} alt="Logo" className="dark:invert h-auto w-10" width={40} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <span>{user?.nomeAdm} {user?.sobreNome}</span>
          <span className="text-gray-500 text-sm ml-1">{user?.cargoAdm}</span>
        </div>
        <div className="relative">
          <button className="focus:outline-none">
            <span className="text-gray-500">🔔</span>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">1150</span>
          </button>
        </div>
        <div className="relative">
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" onClick={() => setTheme("dark")} />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" onClick={() => setTheme("light")} />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="">
              <UserCircle size={40} className="dark:white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem className="px-0 ">
              <Button variant="ghost" size="sm" className="px-3 flex flex-row gap-1 justify-between w-full">
                <>
                  <User />
                  <p>Perfil</p>
                </>
              </Button>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="px-0 ">
              <Button
                variant="ghost"
                size="sm"
                className="px-3 flex flex-row gap-1 justify-between w-full"
                onClick={handleLogout}
              >
                <>
                  <LogOut />
                  <p>Sair</p>
                </>
              </Button>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Topbar;
