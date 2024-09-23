"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"

import Link from "next/link";
import { signup } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { RegisterFormSchemaType, registerSchema } from "./registerSchema";



export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  async function onSubmit(data: RegisterFormSchemaType) {
    const response = await signup({... data, qtdFuncionario: Number(data.qtdFuncionario)});
    
    if (response.status === 200) {
      toast({
        variant: "success",
        title: "OK",
        description: typeof response.message === "string" ? response.message : "Cadastro realizado com sucesso",
      })
      router.push(`/?${createQueryString("user", data.emailAdm)}`);
    } else {
      if (response.response) {
        const backendResponse = JSON.stringify(response.response)
        toast({
          variant: "destructive",
          title: "Erro",
          description: `Falha no cadastro: CNPJ ou email já cadastrado`,
        })
        if (backendResponse.match(/cnpj/gi)) {
          form.setError('cnpj', {message: 'CNPJ já cadastrado'}, { shouldFocus: true })
        }
        if (backendResponse.match(/email/gi)) {
          form.setError('emailAdm', {message: 'Email já cadastrado'})
        }
        if (backendResponse.includes('email válido')) {
          form.setError('emailAdm', {message: 'Email inválido'})
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full items-center">
        <div className="flex sm:flex-row flex-col w-full sm:space-x-6">
          <FormField
            control={form.control}
            name="nomeFantasia"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Nome da clínica *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome fantasia da clínica" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>CNPJ *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o CNPJ da clínica" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:space-x-6">
          <FormField
            control={form.control}
            name="qtdFuncionario"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Quantidade de funcionários *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a quantidade de funcionários da clínica"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:space-x-6">
          <FormField
            control={form.control}
            name="nomeAdm"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Nome *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sobreNome"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Sobrenome *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:space-x-6">
          <FormField
            control={form.control}
            name="emailAdm"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>E-mail *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone1"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Telefone *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu telefone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:space-x-6">
          <FormField
            control={form.control}
            name="cargoAdm"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Cargo do administrador *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o cargo do administrador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefoneAdm"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Telefone do administrador *</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o telefone do administrador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:space-x-6">
          <FormField
            control={form.control}
            name="senhaAdm"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Senha *</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmSenhaAdm"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Confirme sua senha *</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col w-full sm:items-center gap-1 mt-4">
          <Link href="/register" className="text-blue-500">
            Esqueceu a senha?
          </Link>
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </Form>
  );
}
