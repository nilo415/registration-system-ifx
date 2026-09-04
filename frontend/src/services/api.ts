import axios from 'axios';

export interface Representative {
  fullName?: string;
  cpf?: string;
  role?: string;
  email?: string;
  phone?: string;
  signatory?: boolean;
}

export interface RegistrationPayload {
  cnpj?: string;
  companyName?: string;
  tradeName?: string;
  openingDate?: string;
  legalNature?: string;
  businessActivity?: string;

  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;

  phone?: string;
  email?: string;
  website?: string;

  taxRegime?: string;
  stateRegistration?: string;
  municipalRegistration?: string;

  representatives?: Representative[];
  documentFileNames?: string[];

  status?: string;
  savedAt?: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/registration',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCurrentRegistration = async (): Promise<RegistrationPayload | null> => {
  try {
    const response = await api.get<RegistrationPayload>('/current');
    if (response.status === 204) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o cadastro atual:', error);
    throw error;
  }
};

export const saveDraft = async (payload: RegistrationPayload) => {
  try {
    const response = await api.post('/draft', payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar rascunho:', error);
    throw error;
  }
};

export const finalizeRegistration = async (payload: RegistrationPayload) => {
  try {
    const response = await api.post('/finalize', payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao finalizar cadastro:', error);
    throw error;
  }
};

export const uploadFile = async (file: File, cnpj: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cnpj', cnpj);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
};

export default api;
