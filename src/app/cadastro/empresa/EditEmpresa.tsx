"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Building2, Camera, Check, Clock, Contact } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { type Company, updateCompany } from "@/lib/api";
import { useEffect } from "react";
import { type FormOutputData, editEmpresaSchema } from "./editEmpresaSchema";
import { formatInTimeZone } from 'date-fns-tz';
import { normalizeCepNumber, normalizeCnpjNumber, normalizePhoneNumber, onlyString } from "@/utils/stringHelpers";
import { estadosBrasil } from "@/utils/constants";

const brazilTimeZone = 'America/Sao_Paulo';
function formattedDate(dateString: string) {
  return formatInTimeZone(dateString, brazilTimeZone,'dd/MM/yyyy HH:mm');
}

interface EditEmpresaProps {
  company: Company;
}

const EditEmpresa = ({ company }: EditEmpresaProps) => {
  const {
    admin,
    bairro,
    celular,
    cep,
    cidade,
    cnpj,
    complemento,
    email,
    estado,
    inscricaoEstadual,
    inscriscaoMunicipal,
    logradouro,
    nome,
    nomeFantasia,
    site,
    telefone,
    createdAt,
    _id: companyId,
  } = company;
  const { toast } = useToast();

  const form = useForm<FormOutputData>({
    resolver: zodResolver(editEmpresaSchema),
    defaultValues: {
      bairro,
      celular: String(celular),
      cep,
      cidade,
      cnpj: String(cnpj),
      complemento,
      email,
      estado,
      inscricaoEstadual,
      inscriscaoMunicipal,
      logradouro,
      nome,
      nomeFantasia,
      site,
      telefone: String(telefone),
    },
  });
  const { control, getValues, handleSubmit, watch, setValue, setError, clearErrors } = form;

  async function onSubmit(data: FormOutputData) {
    const cnpjString = onlyString(data.cnpj);
    const celularString = onlyString(data.celular);
    const telefoneString = onlyString(data.telefone);
    const updateData = {
      ...data,
      cnpj: cnpjString,
      celular: celularString,
      telefone: telefoneString,
    };

    const { status } = await updateCompany({
      token: window?.localStorage.getItem('token') || "",
      company: updateData,
      companyId,
    });
    if (status === 201) {
      toast({
        variant: "success",
        title: "OK",
        description: "Empresa atualizada com sucesso",
      });
    }
  }

  async function handleCep(event: React.ChangeEvent<HTMLInputElement>) {
    const cep = event.target.value;

    clearErrors("cep");

    if (cep && cep.length === 7)
      try {
        const respCep = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const data = await respCep.json();

        if (data.erro) {
          throw new Error("CEP não encontrado.");
        }

        setValue("logradouro", data.street);
        setValue("bairro", data.neighborhood);
        setValue("cidade", data.city);
        setValue("estado", data.state);
        setValue("complemento", "");
      } catch (error) {
        console.error(error);
        setError("cep", { message: "Erro ao buscar informações do CEP" });
      }
  }

  const cnpjValue = watch("cnpj");
  const celPhoneValue = watch("celular");
  const phoneValue = watch("telefone");
  const cepValue = watch("cep");

  useEffect(() => {
    setValue("cnpj", normalizeCnpjNumber(cnpjValue));
    setValue("celular", normalizePhoneNumber(celPhoneValue));
    setValue("telefone", normalizePhoneNumber(phoneValue));
    setValue("cep", normalizeCepNumber(cepValue));
  }, [celPhoneValue, cepValue, cnpjValue, setValue, phoneValue]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full items-center mt-4">
        <div className="flex flex-col gap-2 px-8 py-6 rounded-lg bg-white">
          <div className="flex flex-row gap-2">
            <div className="relative">
              <Building2 size={56} absoluteStrokeWidth className="mr-2" />
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 rounded-full p-1 absolute bottom-0 right-1">
                <Camera size={16} />
              </Badge>
            </div>
            <div className="flex flex-col items-start justify-between">
              <h2 className="uppercase text-xl">{nomeFantasia}</h2>
              <div className="flex flex-row items-center justify-center gap-1">
                <span className="h-3 w-3 bg-green-600 rounded-full" />
                <p className="text-xs uppercase">{normalizeCnpjNumber(cnpj)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <div>
              <p>Plano: </p>
              <p>Data cadastro: </p>
              <p>Código empresa: </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-orange-400">Profissional</p>
              <div className="flex flex-row items-center justify-center gap-1">
                <Clock size={16} color="black" strokeWidth={1.5} />
                <p>{formattedDate(createdAt)}</p>
              </div>
              <p>776</p>
            </div>
          </div>
          <hr className="h-[1px] w-full bg-gray-400 mt-1 mb-1" />
          <div className="flex flex-col w-full mt-4">
            <FormField
              control={control}
              name="nome"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome da clinica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nomeFantasia"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome Fantasia *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome fantasia da clínica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CNPJ *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o CNPJ da clínica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-full md:items-start gap-1 mt-4">
            <Button type="submit" variant="outline" className="bg-green-700 hover:bg-green-700/80 text-white px-5">
              <Check size={14} className="mr-1" />
              Salvar
            </Button>
          </div>
        </div>

        <div className="px-8 py-6 rounded-lg bg-white mt-4">
          <div className="flex flex-row gap-2">
            <Building />
            <h2>Dados Gerais</h2>
          </div>
          <hr className="h-[1px] w-full bg-gray-400 mt-4 mb-4" />
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="telefone"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="celular"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu celular" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="inscriscaoMunicipal"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Inscrição Municipal</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a inscrição municipal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="inscricaoEstadual"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Inscrição Estadual</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a inscrição estadual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="w-full md:w-1/3">
              <FormLabel>Contato</FormLabel>
              <Input placeholder={admin.nomeAdm || "Nome da pessoa para contato"} />
            </FormItem>
            <FormField
              control={control}
              name="site"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <FormLabel>Site</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu site" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="px-8 py-6 rounded-lg bg-white mt-4">
          <div className="flex flex-row gap-2">
            <Contact />
            <h2>Endereço</h2>
          </div>
          <hr className="h-[1px] w-full bg-gray-400 mt-4 mb-4" />
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="cep"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu CEP" {...field} onChange={(event) => handleCep(event)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="estado"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <FormLabel>Estado </FormLabel>
                  <FormControl className="bg-orange-400/60">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue className="text-orange-800 bg-white">
                          {field.value || "Selecione seu estado"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {estadosBrasil.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cidade"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value || "Selecione sua cidade"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="logradouro"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o logradouro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="bairro"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="complemento"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col w-full md:items-start gap-1 mt-4">
            <Button type="submit" variant="outline" className="bg-green-700 hover:bg-green-700/80 text-white px-5">
              <Check size={14} className="mr-1" />
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditEmpresa;
