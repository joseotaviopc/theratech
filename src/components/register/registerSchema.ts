import { z } from "zod";

export const registerSchema = z
  .object({
    nomeFantasia: z.string({
      required_error: "Nome Fantasia é obrigatório",
      invalid_type_error: "Nome Fantasia deve ser um texto",
    }),
    cnpj: z
      .string({ required_error: "CNPJ é obrigatório" })
      .length(14, "CNPJ deve ter exatamente 14 dígitos")
      .regex(/^\d+$/, "CNPJ deve conter apenas números"),
    telefone1: z
      .string({ required_error: "Telefone é obrigatório" })
      .regex(/^\d+$/, "Telefone deve conter apenas números")
      .min(10, "Telefone deve ter no mínimo 10 dígitos")
      .max(15, "Telefone deve ter no mínimo 15 dígitos"),
    telefone2: z
      .string()
      .regex(/^\d+$/, "Telefone deve conter apenas números")
      .min(10, "Telefone deve ter no mínimo 10 dígitos")
      .max(15, "Telefone deve ter no mínimo 15 dígitos")
      .optional(),
    site: z.string().trim().url("Site deve ser uma URL válida").optional(),
    // , invalid_type_error: 'Quantidade de Funcionários deve ser um número' }).int('Quantidade de Funcionários deve ser um número inteiro').min(0, 'Quantidade de Funcionários deve ser no mínimo 0')
    qtdFuncionario: z.string({ required_error: "Quantidade de Funcionários é obrigatória" }),
    nomeAdm: z
      .string({
        required_error: "Nome do Administrador é obrigatório",
        invalid_type_error: "Nome do Administrador deve ser um texto",
      })
      .trim(),
    sobreNome: z
      .string({
        required_error: "Sobrenome do Administrador é obrigatório",
        invalid_type_error: "Sobrenome do Administrador deve ser um texto",
      })
      .trim(),
    telefoneAdm: z
      .string({ required_error: "Telefone do Administrador é obrigatório" })
      .regex(/^\d+$/, "Telefone do Administrador deve conter apenas números")
      .min(10, "Telefone do Administrador deve ter no mínimo 10 dígitos")
      .max(15, "Telefone do Administrador deve ter no máximo 15 dígitos"),
    cargoAdm: z
      .string({
        required_error: "Cargo do Administrador é obrigatório",
        invalid_type_error: "Cargo do Administrador deve ser um texto",
      })
      .trim(),
    emailAdm: z
      .string({ required_error: "Email do Administrador é obrigatório" })
      .email("Email do Administrador deve ser um email válido")
      .toLowerCase(),
    senhaAdm: z
      .string({ required_error: "A senha é obrigatória" })
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(30, "A senha deve ter no máximo 30 caracteres")
      .regex(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$"),
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      ),
    confirmSenhaAdm: z.string({ required_error: "A confirmação de senha é obrigatória" }),
  })
  .refine(
    (values) => {
      return values.senhaAdm === values.confirmSenhaAdm;
    },
    {
      message: "A confirmação de senha deve corresponder à senha",
      path: ["confirmSenhaAdm"],
    }
  );

export type RegisterFormSchemaType = z.infer<typeof registerSchema>;
