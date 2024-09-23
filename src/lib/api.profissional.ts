import { api } from "./api";

async function getAllProfissionais(token: string) {
  try {
    return await api.get<unknown, { data: any, status: number }>("/AllPro", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
}

async function getByIdProfissional(token: string, id: string) {
  try {
    return await api.get<unknown, { data: any, status: number }>(`/ProId/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
}

interface CreateProfissionalPayload {
  token: string;
  profissional: unknown;
}

async function createProfissionais({token, profissional}: CreateProfissionalPayload) {
  try {
    return await api.post<unknown, { data: any, status: number }>("/CreatePro", profissional, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
}

interface UpdateProfissionalPayload {
  token: string;
  id: string;
  profissional: unknown;
}

async function updateProfissionais({token, id, profissional}: UpdateProfissionalPayload) {
  try {
    return await api.put<unknown, { data: any, status: number }>(`/UpPro/${id}`, profissional, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export { createProfissionais, getAllProfissionais, getByIdProfissional, updateProfissionais }
