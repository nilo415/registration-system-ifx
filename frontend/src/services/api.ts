import axios from 'axios';

export interface Representative {
  fullName?: string;
  cpf?: string;
  role?: string;
  email?: string;
  phone?: string;
  signatory?: boolean;
}

export interface BankReference {
  id?: string;
  empresa?: string;
  nomeFantasia?: string;
  cnpj?: string;
  banco?: string;
  agencia?: string;
  contaCorrente?: string;
  gerencia?: string;
  fone?: string;
  relato?: string;
  informacoesData?: string;
  bankName?: string;
  account?: string;
  contact?: string;
  [key: string]: any;
}

export interface CommercialReference {
  id?: string;
  empresa?: string;
  nomeFantasia?: string;
  cnpj?: string;
  clienteDesde?: string;
  maiorFaturaData?: string;
  maiorFaturaValor?: string;
  ultimaFaturaData?: string;
  ultimaFaturaValor?: string;
  mediasMensalValor?: string;
  condicaoPagamento?: string;
  diasPrazo?: string;
  formaPagamento?: {
    boleto?: boolean;
    deposito?: boolean;
    cheque?: boolean;
    [key: string]: any;
  };
  pagamentoPontual?: boolean;
  pagamentoAtraso?: boolean;
  mediaAtraso?: string;
  pagamentoCartorio?: string;
  debitosVencidos?: string;
  debitosVencer?: string;
  limiteCredito?: string;
  conceito?: string;
  produtoFornecido?: string;
  observacoes?: string;
  informacoesData?: string;
  companyName?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

export interface RegistrationPayload {
  operationType?: string; // e.g., 'VENDA_A_PRAZO', 'VENDA_A_VISTA', etc.
  cnpj?: string;
  companyName?: string;
  tradeName?: string;
  openingDate?: string;
  legalNature?: string;
  businessActivity?: string;

  // Step 3 - Principal
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;

  // Step 3 - Contatos
  contactPerson?: string;
  phone?: string;
  mobilePhone?: string;
  email?: string;
  purchasingEmail?: string;
  website?: string;

  // Step 3 - Endereço Financeiro
  financialContact?: string;
  financialZipCode?: string;
  financialStreet?: string;
  financialNeighborhood?: string;
  financialCity?: string;
  financialState?: string;
  financialPhone?: string;
  financialMobilePhone?: string;
  financialEmail?: string;

  // Step 3 - Endereço de Entrega
  deliveryZipCode?: string;
  deliveryStreet?: string;
  deliveryNeighborhood?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryContact?: string;
  deliveryPhone?: string;
  deliveryObservation?: string;

  // Step 4 - Fiscal
  taxRegime?: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  simplesNacional?: boolean;
  ipiExemption?: boolean;
  suframaDiscount?: boolean;
  suframaNumber?: string;
  cdiIncentive?: boolean;
  requiresPurchaseOrder?: boolean;

  // Step 5 - Representantes e Referências
  representatives?: Representative[];
  bankReferences?: BankReference[];
  commercialReferences?: CommercialReference[];

  // Step 6 - Documentos
  documentFileNames?: string[];

  status?: string;
  savedAt?: string;
  [key: string]: any;
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
