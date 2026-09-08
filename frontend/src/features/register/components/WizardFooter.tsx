interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onFinalize: () => void;
  isSavingDraft?: boolean;
  isFinalizing?: boolean;
}

export default function WizardFooter({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSaveDraft,
  onFinalize,
  isSavingDraft = false,
  isFinalizing = false,
}: WizardFooterProps) {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <footer className="flex items-center justify-between px-8 py-5">
      {/* Botão Voltar */}
      {currentStep > 0 ? (
        <button
          type="button"
          id="wizard-back-btn"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'var(--tertiary)',
            color: 'var(--primary)',
            border: 'none',
          }}
          onClick={onBack}
          disabled={isSavingDraft || isFinalizing}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar
        </button>
      ) : (
        <div /> /* Elemento vazio para manter o alinhamento flex-between */
      )}

      {/* Ações da direita */}
      <div className="flex items-center gap-3">
        {/* Salvar Rascunho */}
        <button
          type="button"
          id="wizard-save-draft-btn"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'transparent',
            color: 'var(--primary)',
            border: '1.5px solid var(--primary)',
          }}
          onClick={onSaveDraft}
          disabled={isSavingDraft || isFinalizing}
        >
          {isSavingDraft ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"></path>
              </svg>
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span>Salvar Rascunho</span>
            </>
          )}
        </button>

        {/* Próximo ou Finalizar */}
        {isLastStep ? (
          <button
            type="button"
            id="wizard-finalize-btn"
            className="px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer hover:opacity-90 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: '#16a34a',
              color: '#ffffff',
              border: 'none',
            }}
            onClick={onFinalize}
            disabled={isSavingDraft || isFinalizing}
          >
            {isFinalizing ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"></path>
                </svg>
                <span>Finalizando...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Finalizar Cadastro</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            id="wizard-next-btn"
            className="px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer hover:opacity-90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
            }}
            onClick={onNext}
            disabled={isSavingDraft || isFinalizing}
          >
            <span>Próximo</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        )}
      </div>
    </footer>
  );
}
