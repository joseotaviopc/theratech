import { api } from "./api";


export interface Company {
  _id: string;
  nome: string;
  nomeFantasia: string;
  cnpj: number | string;
  telefone: number | string;
  celular: number | string;
  inscriscaoMunicipal: string;
  inscricaoEstadual: string;
  email: string;
  site: string;
  cep: string;
  estado: string;
  cidade: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  admin: Admin;
  createdAt: string;
  updatedAt: string;
}
export interface CompanysResponse {
  data: Company[];
  status: number;
}

interface Admin {
  _id: string;
  nomeFantasia: string;
  cnpj: number;
  telefone1: number;
  qtdFuncionario: number;
  nomeAdm: string;
  sobreNome: string;
  telefoneAdm: number;
  cargoAdm: string;
  emailAdm: string;
  senhaAdm: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export async function getCompanys(token: string) {
  try {
    return await api.get<unknown, CompanysResponse>("/AllCompany", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

interface UpdateCompanyPayload {
  token: string;
  company: Partial<Company>;
  companyId: string;
}

export async function updateCompany({ token, company, companyId }: UpdateCompanyPayload) {
  try {
    return await api.put<UpdateCompanyPayload, CompanysResponse>(`/UpCompany/${companyId}`, company, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
}
