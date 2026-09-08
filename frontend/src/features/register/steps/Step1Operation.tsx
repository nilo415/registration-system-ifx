import { useRegistration } from '../../../contexts/RegistrationContext';

export default function Step1Operation() {
  const { formData, updateFormData } = useRegistration();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
          Tipo de Cadastro <span className="text-red-500">*</span>
        </label>

        <div className="relative max-w-md">
          <select
            className="w-full h-10 px-3 rounded-md text-sm appearance-none outline-none transition-colors cursor-pointer"
            style={{
              background: 'transparent',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
            }}
            value={formData.operationType ?? ''}
            onChange={(e) => updateFormData({ operationType: e.target.value })}
          >
            <option value="" disabled hidden>Selecione o tipo de operação...</option>
            <option value="VENDA_A_PRAZO" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Venda a Prazo</option>
            <option value="VENDA_A_VISTA" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Venda a Vista</option>
            <option value="AMOSTRA_REMESSA" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Amostra/Remessa</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
          Define os documentos exigidos e a necessidade de referências comerciais.
        </p>
      </div>
    </div>
  );
}
