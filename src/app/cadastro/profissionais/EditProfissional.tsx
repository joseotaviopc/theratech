"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Check, Contact, ArrowLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createProfissionais, getByIdProfissional, updateProfissionais } from "@/lib/api";
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { CreateProfissionalType, StatusEnum, TipoEnum, createProfissionalSchema } from "./createProfissionalSchema";
import { normalizeCepNumber, normalizeCpfNumber, normalizePhoneNumber, onlyString } from "@/utils/stringHelpers";
import { estadosBrasil } from "@/utils/constants";
import { useParams, useRouter } from "next/navigation";
import { isValid } from 'date-fns'

const tipos = Object.values(TipoEnum) as string[]
const status = Object.values(StatusEnum) as string[]

interface EditProfissionalProps {
  profissional?: CreateProfissionalType;
  profissionais?: CreateProfissionalType[]
  setProfissionais?: Dispatch<SetStateAction<CreateProfissionalType[]>>
  setShowEditProfissional?: Dispatch<SetStateAction<boolean>>
}

function formatDate(date?: string) {
  // console.log('== date ==', date)
  if (date && date.length === 10 && !isValid(date)) return undefined
  return date ? Intl.DateTimeFormat("pt-br",{dateStyle: "short"})?.format(new Date(date)) : ''
}

const EditProfissional = ({ }: EditProfissionalProps) => {
  const { toast } = useToast();
  const route = useRouter()
  const params = useParams();
  const id = params?.id as string || '0';
  const [profissional, setProfissional] = useState<CreateProfissionalType>();

  async function handleGetProfissionais(token: string, id: string) {
    const { data } = await getByIdProfissional(token, id);
    setProfissional(data);
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digitsOnly = input.replace(/\D/g, '');

    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
  }

  const formatCep = (input: string) => {
    const digitsOnly = input.replace(/\D/g, '');
    return `${digitsOnly.slice(0, 2)}.${digitsOnly.slice(2, 5)}-${digitsOnly.slice(5, 8)}`;
  }

  const form = useForm<CreateProfissionalType>({
    resolver: zodResolver(createProfissionalSchema),
    defaultValues: {
      nome: profissional?.nome,
      cpf: profissional?.cpf,
      nomePai: profissional?.nomePai,
      nomeMae: profissional?.nomeMae,
      dataNascimento: formatDate(profissional?.dataNascimento || ''),
      telefone: profissional?.telefone,
      status: profissional?.status,
      email: profissional?.email,
      cargo: profissional?.cargo,
      especialidade: profissional?.especialidade,
      dataAdmissao: formatDate(profissional?.dataAdmissao || ''),
    }
  });
  const { control, reset, handleSubmit, watch, setValue, setError, clearErrors, formState: {errors} } = form;

  async function onSubmit(form: CreateProfissionalType) {
    const validdataAdmissao = new Date(`${form.dataAdmissao.slice(6,10)}/${form.dataAdmissao.slice(3,5)}/${form.dataAdmissao.slice(0,2)}`);
    const validdataNascimento = new Date(`${form.dataNascimento.slice(6,10)}/${form.dataNascimento.slice(3,5)}/${form.dataNascimento.slice(0,2)}`);
    if (!isValid(validdataAdmissao)) {
      console.log('==  ==', validdataAdmissao)
      setError('dataAdmissao', {message: 'Data de admissão inválida'})
      return
    }
    if (!isValid(validdataNascimento)) {
      setError('dataNascimento', {message: 'Data de nascimento inválida'})
      return
    }

    if (form.cpf.length < 11) {
      setError('cpf', {message: 'CPF inválido'})
      return;
    }

    const cleanForm = Object.fromEntries(Object.entries(form).filter(([key]) => (key !== '_id' && key !== 'dataDemissao')));
    const updateForm = {
      ...cleanForm,
      celular: onlyString(form.celular),
      telefone: onlyString(form.telefone),
      cep: form.cep.replace('.', ''),
      dataAdmissao: validdataAdmissao.toISOString(),
      dataNascimento: validdataNascimento.toISOString(),
    };

    if (id !== '0') {
      const {data, status} = await updateProfissionais({
        token: window?.localStorage.getItem('token') || "",
        id,
        profissional: updateForm,
      })
      if (status === 201) {
        toast({
          variant: "success",
          title: "OK",
          description: data,
        });
        return route.push(`/cadastro/profissionais`)
      }
      toast({
        variant: "destructive",
        title: "Erro",
        description: data || 'Erro ao atualizar profissional',
      })
    } else {
      const { status, data } = await createProfissionais({
        token: window?.localStorage.getItem('token') || "",
        profissional: updateForm,
      });
      if (status === 201) {
        // setProfissionais([...profissionais, updateForm]);
        // setShowEditProfissional(false);
        toast({
          variant: "success",
          title: "OK",
          description: "Profissional criado com sucesso",
        });
        return route.push(`/cadastro/profissionais`)
      }
      toast({
        variant: "destructive",
        title: "Erro",
        description: data || 'Erro ao criar profissional',
      })
    }
  }

  async function getCep(cep: string) {
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

  function handleCep(event: React.ChangeEvent<HTMLInputElement>) {
    // console.log(event.nativeEvent.data)
    console.log(event.target.value)
    // return;
    const cep = formatCep(event.target.value);
    console.log('==  ==', cep)

    clearErrors("cep");

    if (cep && cep.length === 10)
      getCep(cep)

    return cep;
  }

  function handleGoBack() {
    route.replace('/cadastro/profissionais')
  }

  const celPhoneValue = watch("celular");
  const phoneValue = watch("telefone");
  const cepValue = watch("cep");
  const cpfValue = watch("cpf");
  const dataNascimentoValue = watch("dataNascimento");
  const dataAdmissaoValue = watch("dataAdmissao");
  const dataDemissaoValue = watch("dataDemissao");

  useLayoutEffect(() => {
    setValue("celular", normalizePhoneNumber(celPhoneValue));
    setValue("telefone", normalizePhoneNumber(phoneValue));
    if (cepValue) setValue("cep", formatCep(cepValue))
    setValue("cpf", normalizeCpfNumber(cpfValue));
    setValue("dataDemissao", formatDate(dataDemissaoValue) || '');
    // setValue("dataNascimento", formatDate(dataNascimentoValue) || '');
  }, [celPhoneValue, cepValue, setValue, phoneValue, cpfValue, dataAdmissaoValue, dataDemissaoValue]);

  useEffect(() => {
    reset({
      ...profissional,
      dataAdmissao: formatDate(profissional?.dataAdmissao || ''),
      dataNascimento: formatDate(profissional?.dataNascimento || ''),
      dataDemissao: formatDate(profissional?.dataDemissao || ''),
    })
  },[profissional])

  useEffect(() => {
    const token = window?.localStorage.getItem('token');
    if (id === '0') return;
    if (token && id) {
      handleGetProfissionais(token, id)
    }
  },[id])

  return (
    <Form {...form}>
      <form className="w-full items-center mt-4">
        <div className="flex flex-col gap-2 px-8 py-6 rounded-lg bg-white">
          <hr className="h-[1px] w-full bg-gray-400 mt-1 mb-1" />
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="nome"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do profissional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>CPF *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o CPF do profissional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="nomePai"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Nome do pai *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do pai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nomeMae"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Nome da mãe *</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome da mãe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="flex flex-col w-full md:items-start gap-1 mt-4">
            <Button type="submit" variant="outline" className="bg-green-700 hover:bg-green-700/80 text-white px-5">
              <Check size={14} className="mr-1" />
              Salvar
            </Button>
          </div> */}
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
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="cargo"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o cargo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="especialidade"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Especialidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a especialidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="dataAdmissao"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Data de adimissão</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a data de admissão"
                      {...field}
                      onChange={(e) => field.onChange(handleDateChange(e))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="dataNascimento"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a data de nascimento"
                      {...field}
                      onChange={(e) => field.onChange(handleDateChange(e))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:flex-row flex-col w-full md:space-x-6">
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Status </FormLabel>
                  <FormControl className="bg-orange-400/60">
                    <Select onValueChange={field.onChange} >
                      <SelectTrigger>
                        <SelectValue className="text-orange-800 bg-white">
                          {field.value || "Selecione seu estado"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {status.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
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
              name="tipo"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2">
                  <FormLabel>Tipo </FormLabel>
                  <FormControl className="bg-orange-400/60">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue className="text-orange-800 bg-white">
                          {field.value || "Selecione seu estado"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {tipos.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Input
                      placeholder="Digite seu CEP"
                      {...field}
                      // onChange={handleCep}
                      onChange={(event) => field.onChange(handleCep(event))}
                    />
                    {/* <Input placeholder="Digite seu CEP" {...field} /> */}
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
          <div className="flex flex-row w-full md:items-start gap-1 mt-4">
            <Button type="button" onClick={handleSubmit(onSubmit)} variant="outline" className="bg-green-700 hover:bg-green-700/80 text-white px-5">
              <Check size={14} className="mr-1" />
              Salvar
            </Button>
            <Button type="button" onClick={handleGoBack} variant="outline" className="bg-green-700 hover:bg-green-700/80 text-white px-5">
              <ArrowLeft size={14} className="mr-1" />
              Voltar
            </Button>
          </div>
          {/* <pre className="text-orange-600 text-sm">{JSON.stringify(form.getValues().cpf, null, 3)}</pre>
          <pre className="text-orange-600 text-sm">{JSON.stringify(errors, null, 3)}</pre> */}
        </div>
      </form>
    </Form>
  );
};

export default EditProfissional;
