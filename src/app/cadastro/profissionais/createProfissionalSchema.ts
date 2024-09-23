import { z } from "zod";

export enum TipoEnum { "PROFISSIONAL"= "Profissional", "SUPERVISOR"= "Supervisor"};
export enum StatusEnum { "ATIVO"= "Ativo", "INATIVO"= "Inativo"};

export const createProfissionalSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  nomePai: z.string(),
  nomeMae: z.string(),
  dataNascimento: z.string().length(10, 'Data de nascimento inválida'),
  telefone: z.string().length(14).or(z.string().length(15)),
  celular: z.string().length(14).optional().or(z.string().length(15).optional()),
  email: z.string().email(),
  cargo: z.string(),
  especialidade: z.string(),
  dataAdmissao: z.string().length(10, 'Data de admissão inválida'),
  dataDemissao: z.string().optional(),
  estado: z.string(),
  cidade: z.string(),
  logradouro: z.string(),
  bairro: z.string(),
  complemento: z.string(),
  cep: z.string(),
  companyId: z.string().optional(),
  tipo: z.nativeEnum(TipoEnum),
  status: z.nativeEnum(StatusEnum),
  _id: z.string().optional(),
});

export type CreateProfissionalType = z.infer<typeof createProfissionalSchema>;

export type CreateProfissionalKeys = keyof z.infer<typeof createProfissionalSchema>;
