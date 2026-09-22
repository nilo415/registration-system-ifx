import { useState, useEffect } from 'react';
import Stepper from '../../components/ui/Stepper';
import { finalizeRegistration, fetchCurrentRegistration, previewRegistrationPdf } from '../../services/api';
import { useRegistration } from '../../contexts/RegistrationContext';
import WizardFooter from './components/WizardFooter';
import Step1Operation from './steps/Step1Operation';
import Step2Company from './steps/Step2Company';
import Step3Address from './steps/Step3Address';
import Step4Tax from './steps/Step4Tax';
import Step5References from './steps/Step5References';

const STEPS = [
  'OPERAÇÃO',
  'EMPRESA',
  'ENDEREÇO',
  'FISCAL',
  'REFERÊNCIAS',
];

const STEP_TITLES = [
  'Operação Comercial',
  'Dados da Empresa',
  'Endereço',
  'Dados Fiscais',
  'Referências',
];

interface Toast {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export default function RegisterWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [finalizedCnpj, setFinalizedCnpj] = useState<string | null>(null);

  const { formData, updateFormData, resetForm } = useRegistration();

  const showToast = (type: Toast['type'], message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Carregar dados existentes no backend ao montar o componente
  useEffect(() => {
    let isMounted = true;
    const loadDraft = async () => {
      try {
        const existingData = await fetchCurrentRegistration();
        if (existingData && isMounted) {
          updateFormData(existingData);
          showToast('info', 'Dados recuperados do servidor local.');
        }
      } catch (error) {
        console.warn('Nenhum cadastro prévio ou backend offline:', error);
      }
    };
    loadDraft();
    return () => {
      isMounted = false;
    };
  }, [updateFormData]);

  const handlePreview = async () => {
    setIsPreviewing(true);
    try {
      const blob = await previewRegistrationPdf(formData);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Erro ao gerar prévia da impressão:', error);
      // Fallback para abrir o PDF existente em disco
      window.open('http://localhost:8080/api/registration/pdf', '_blank');
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleFinalize = async () => {
    // Validações básicas de negócio
    if (!formData.operationType) {
      showToast('warning', 'Por favor, selecione o Tipo de Cadastro no passo 1 (Operação).');
      setCurrentStep(0);
      return;
    }
    if (!formData.cnpj || formData.cnpj.trim() === '') {
      showToast('warning', 'Por favor, preencha o CNPJ no passo 2 (Empresa).');
      setCurrentStep(1);
      return;
    }
    if (!formData.companyName || formData.companyName.trim() === '') {
      showToast('warning', 'Por favor, preencha a Razão Social no passo 2 (Empresa).');
      setCurrentStep(1);
      return;
    }

    // Limpar campos condicionais que não devem ir para o PDF se desabilitados
    const payload = {
      ...formData,
      suframaNumber: formData.suframaDiscount ? formData.suframaNumber : '',
    };

    setIsFinalizing(true);
    try {
      const response = await finalizeRegistration(payload);
      setFinalizedCnpj(response?.cnpj ?? formData.cnpj ?? null);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Erro ao finalizar cadastro:', error);
      showToast('error', 'Falha ao finalizar cadastro. Verifique a conexão com o servidor.');
    } finally {
      setIsFinalizing(false);
    }
  };


  const handleReset = () => {
    if (window.confirm('Deseja reiniciar o formulário? Todos os dados atuais serão apagados da tela.')) {
      resetForm();
      setCurrentStep(0);
      showToast('info', 'Formulário reiniciado.');
    }
  };

  const handleNewRegistration = () => {
    setShowSuccessModal(false);
    resetForm();
    setCurrentStep(0);
  };

  return (
    <div className="p-6 max-w-[1000px] mx-auto flex flex-col gap-6 relative">
      {/* Toast Alert */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 text-sm font-medium"
          style={{
            background:
              toast.type === 'success'
                ? '#16a34a'
                : toast.type === 'error'
                ? '#dc2626'
                : toast.type === 'warning'
                ? '#d97706'
                : 'var(--primary)',
            color: '#ffffff',
          }}
        >
          {toast.type === 'success' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {toast.type === 'warning' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
          {toast.type === 'info' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-3 hover:opacity-75 cursor-pointer"
            title="Fechar"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Top Card: Header & Stepper ── */}
      <div
        className="rounded-xl p-6"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
              Novo Cliente
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Preencha os dados abaixo para cadastrar um novo cliente no sistema.
            </p>
          </div>
          {/* Botão Reiniciar Cadastro */}
          <button
            type="button"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80 cursor-pointer"
            style={{ background: 'var(--border-color)', color: 'var(--text-muted)' }}
            onClick={handleReset}
            title="Reiniciar Cadastro"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        <div className="w-full h-px mb-6" style={{ background: 'var(--border-color)' }} />

        <div className="px-4">
          <Stepper steps={STEPS} currentStep={currentStep} />
        </div>
      </div>

      {/* ── Bottom Card: Step Content & Footer ── */}
      <div
        className="rounded-xl flex flex-col"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          minHeight: '400px',
        }}
      >
        {/* Step Title */}
        <div className="px-8 py-6">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>
            {STEP_TITLES[currentStep]}
          </h2>
        </div>

        <div className="w-full h-px" style={{ background: 'var(--border-color)' }} />

        {/* Step Content */}
        <div className="px-8 py-8 flex-1">
          <div style={{ display: currentStep === 0 ? 'block' : 'none' }}><Step1Operation /></div>
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}><Step2Company /></div>
          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}><Step3Address /></div>
          <div style={{ display: currentStep === 3 ? 'block' : 'none' }}><Step4Tax /></div>
          <div style={{ display: currentStep === 4 ? 'block' : 'none' }}><Step5References /></div>
        </div>

        <div className="w-full h-px" style={{ background: 'var(--border-color)' }} />

        {/* Modular Wizard Footer */}
        <WizardFooter
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onBack={() => setCurrentStep((s) => Math.max(s - 1, 0))}
          onNext={() => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))}
          onFinalize={handleFinalize}
          onPreview={handlePreview}
          isFinalizing={isFinalizing}
          isPreviewing={isPreviewing}
        />
      </div>

      {/* ── Success Modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl border relative"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
            }}
          >
            {/* Botão fechar */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              title="Fechar"
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-black/10"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center text-green-500 mb-5">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
              Cadastro Finalizado com Sucesso!
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {finalizedCnpj ? `Empresa CNPJ: ${finalizedCnpj}. Os` : 'Os'} dados foram registrados no servidor local e o documento PDF (ficha cadastral) foi gerado na pasta de armazenamento.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.open('http://localhost:8080/api/registration/pdf', '_blank')}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                style={{ background: 'var(--primary)' }}
              >
                Visualizar Impressão
              </button>
              <button
                type="button"
                onClick={handleNewRegistration}
                className="py-3 px-5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                style={{
                  background: 'var(--tertiary)',
                  color: 'var(--text-main)',
                }}
              >
                Novo Cadastro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
