import { AxiosResponse } from "axios";
import { api } from "./api";

interface CustomResponse {
  response?: AxiosResponse<unknown, unknown>;
  status: number;
  message: string | { token: string };
}
export interface SignUp {
  nomeFantasia: string;
  cnpj: string;
  telefone1: string;
  telefone2?: string;
  site?: string;
  qtdFuncionario: number;
  nomeAdm: string;
  sobreNome: string;
  telefoneAdm: string;
  cargoAdm: string;
  emailAdm: string;
  senhaAdm: string;
  confirmSenhaAdm: string;
}

export async function signup(body: SignUp) {
  try {
    return await api.post<SignUp, CustomResponse>("/signup", body);
  } catch (error) {
    throw error;
  }
}

interface Signin {
  emailAdm: string;
  senhaAdm: string;
}

export async function signin(body: Signin) {
  try {
    return await api.post<Signin, CustomResponse>("/signin", body);
  } catch (error) {
    throw error;
  }
}

export interface UserResponse {
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
}

interface GetUserResponse {
  data: UserResponse | { message: string };
  status: number;
}

export async function getUser(token: string) {
  return await api.get<unknown, GetUserResponse>("/userLogged", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}