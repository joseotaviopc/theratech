import { z } from "zod";

export const editEmpresaSchema = z.object({
  nome: z.string(),
  nomeFantasia: z.string(),
  cnpj: z.string().length(18),
  telefone: z.string().length(14).or(z.string().length(15)),
  celular: z.string().length(14).optional().or(z.string().length(15).optional()),
  inscriscaoMunicipal: z.string(),
  inscricaoEstadual: z.string(),
  email: z.string().email(),
  site: z.string().url().optional(),
  cep: z.string().regex(/^\d{5}-\d{3}$/),
  estado: z.string().length(2),
  cidade: z.string(),
  logradouro: z.string(),
  bairro: z.string(),
  complemento: z.string(),
});

export type FormInputData = z.input<typeof editEmpresaSchema>;
export type FormOutputData = z.output<typeof editEmpresaSchema>;

export type EditEmpresaSchemaType = z.infer<typeof editEmpresaSchema>;
