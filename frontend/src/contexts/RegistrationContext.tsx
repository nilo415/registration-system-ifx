import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { RegistrationPayload } from '../services/api';

interface RegistrationContextProps {
  formData: RegistrationPayload;
  updateFormData: (partialData: Partial<RegistrationPayload>) => void;
  loadFormData: (data: RegistrationPayload) => void;
  resetForm: () => void;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

const initialFormData: RegistrationPayload = {
  operationType: '',
  salesRepresentative: '',
  preparedBy: '',
  cnpj: '',
  companyName: '',
  tradeName: '',
  commercialRegistry: '',
  businessActivity: '',
  clientType: '',
  clientGroup: '',
  tesDefault: '',

  // Step 3 - Principal
  zipCode: '',
  street: '',
  neighborhood: '',
  city: '',
  state: '',
  poBox: '',

  // Step 3 - Contatos
  contactPerson: '',
  phone: '',
  mobilePhone: '',
  email: '',
  purchasingEmail: '',

  // Step 3 - Endereço Financeiro
  financialContact: '',
  financialZipCode: '',
  financialStreet: '',
  financialNeighborhood: '',
  financialCity: '',
  financialState: '',
  financialPoBox: '',
  financialPhone: '',
  financialMobilePhone: '',
  financialEmail: '',

  // Step 3 - Endereço de Entrega
  deliveryZipCode: '',
  deliveryStreet: '',
  deliveryNeighborhood: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryContact: '',
  deliveryPhone: '',
  deliveryObservation: '',

  // Step 4 - Fiscal
  taxRegime: '',
  stateRegistration: '',
  municipalRegistration: '',
  simplesNacional: false,
  ipiExemption: false,
  suframaDiscount: false,
  suframaNumber: '',
  cdiIncentive: false,
  requiresPurchaseOrder: false,

  // Step 5 & 6
  representatives: [],
  bankReferences: [],
  commercialReferences: [],
  documentFileNames: [],
  status: 'DRAFT',
};

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<RegistrationPayload>(initialFormData);

  const updateFormData = useCallback((partialData: Partial<RegistrationPayload>) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...partialData };

      // Regra de Negócio: Se a operação for alterada para algo diferente de 'VENDA_A_PRAZO',
      // limpamos as referências comerciais e bancárias.
      if (
        partialData.operationType !== undefined && 
        partialData.operationType !== 'VENDA_A_PRAZO'
      ) {
        updatedData.bankReferences = [];
        updatedData.commercialReferences = [];
      }

      return updatedData;
    });
  }, []);

  // Carrega o formulário completo direto do servidor, sem acionar regras de negócio
  const loadFormData = useCallback((data: RegistrationPayload) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return (
    <RegistrationContext.Provider value={{ formData, updateFormData, loadFormData, resetForm }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextProps => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration deve ser usado dentro de um RegistrationProvider');
  }
  return context;
};
