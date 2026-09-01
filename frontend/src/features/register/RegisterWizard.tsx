import { useState } from 'react';
import Stepper from '../../components/ui/Stepper';
import Step1Operation from './steps/Step1Operation';
import Step2Company from './steps/Step2Company';
import Step3Address from './steps/Step3Address';

const STEPS = [
  'OPERAÇÃO',
  'EMPRESA',
  'ENDEREÇO',
  'FISCAL',
  'DOCUMENTOS',
];

const STEP_TITLES = [
  'Operação Comercial',
  'Dados da Empresa',
  'Endereço',
  'Dados Fiscais',
  'Documentos',
];

export default function RegisterWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="p-6 max-w-[1000px] mx-auto flex flex-col gap-6">
      
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
          {/* Reset/Action Button Placeholder */}
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80 cursor-pointer"
            style={{ background: 'var(--border-color)', color: 'var(--text-muted)' }}
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
          {currentStep === 0 && <Step1Operation />}
          {currentStep === 1 && <Step2Company />}
          {currentStep === 2 && <Step3Address />}
          {currentStep > 2 && (
            <div className="text-center mt-10">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Os campos deste passo serão construídos na próxima fase.
              </p>
            </div>
          )}
        </div>

        <div className="w-full h-px" style={{ background: 'var(--border-color)' }} />

        {/* Footer / Navigation */}
        <div className="flex items-center justify-between px-8 py-5">
          {currentStep > 0 ? (
            <button
              id="wizard-back-btn"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2"
              style={{
                background: 'var(--tertiary)',
                color: 'var(--primary)',
                border: 'none',
              }}
              onClick={() => setCurrentStep((s) => s - 1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Voltar
            </button>
          ) : (
            <div></div> /* Empty div to keep flex-between alignment if there is no back button */
          )}

          <div className="flex gap-4">
            <button
              id="wizard-save-draft-btn"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer"
              style={{
                background: 'transparent',
                color: 'var(--primary)',
                border: '1.5px solid var(--primary)',
              }}
              onClick={() => alert('Rascunho salvo!')}
            >
              Salvar Rascunho
            </button>

            <button
              id="wizard-next-btn"
              className="px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer hover:opacity-90 flex items-center gap-2"
              style={{
                background: currentStep === STEPS.length - 1 ? '#16a34a' : 'var(--primary)',
                color: '#ffffff',
                border: 'none',
              }}
              onClick={() => {
                if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
                else alert('Cadastro finalizado!');
              }}
            >
              {currentStep === STEPS.length - 1 ? 'Concluir' : 'Próximo'} 
              {currentStep !== STEPS.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
