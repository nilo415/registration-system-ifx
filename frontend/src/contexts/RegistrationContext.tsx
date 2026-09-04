import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { RegistrationPayload } from '../services/api';

interface RegistrationContextProps {
  formData: RegistrationPayload;
  updateFormData: (partialData: Partial<RegistrationPayload>) => void;
  resetForm: () => void;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

const initialFormData: RegistrationPayload = {
  operationType: '',
  cnpj: '',
  companyName: '',
  tradeName: '',
  openingDate: '',
  legalNature: '',
  businessActivity: '',
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
  website: '',
  taxRegime: '',
  stateRegistration: '',
  municipalRegistration: '',
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

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return (
    <RegistrationContext.Provider value={{ formData, updateFormData, resetForm }}>
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
