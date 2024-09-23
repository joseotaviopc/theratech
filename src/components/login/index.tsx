"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { getUser, signin } from "@/lib/api"
import { useUser } from "@/context/user"
import { useEffect } from "react"

interface FormSchemaType {
  email: string;
  password: string;
}

const formSchema: z.ZodType<FormSchemaType> = z.object({
  email: z.string().email("Coloque um email válido"),
  password: z.string().min(8, { message: "Senha deve conter pelo menos 8 caracteres" }),
})

// const mockEmail = "admin@example.com"
// const mockPassword = "password123"

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { setUser } = useUser();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "all"
  })

  const email = form.watch('email')


  async function onSubmit(data: FormSchemaType) {
    const response = await signin({ emailAdm: data.email, senhaAdm: data.password})

    if (response.status === 201) {
      toast({
        variant: "success",
        title: "OK",
        description: "Login realizado com sucesso",
      });
      const token = typeof response.message === "object" ? response.message.token : "";
      window?.localStorage.setItem('token', token);

      const { data } = await getUser(token);
      setUser(data);

      router.push("/cadastro");
    } else {
      if (response.response) {
        const backendResponse = JSON.stringify(response.response)
        if (backendResponse.match(/cnpj/gi)) {
          form.setError('password', { message: 'Email ou senha incorretos' }, { shouldFocus: true })
        }
      }

      toast({
        variant: "destructive",
        title: "Erro",
        description: "Email ou senha incorretos",
      })
    }
  }

  useEffect(() => {
    console.log()
  }, [email])

  return (
    <Form {...form}>
      <form className="w-full md:w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} value={form.watch('email')}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-1">
          <Link href="/register" className="text-blue-500">Esqueceu a senha?</Link>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>Entrar</Button>
        </div>
      </form>
    </Form>
  )
}
