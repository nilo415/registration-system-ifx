import { useRegistration } from '../../../contexts/RegistrationContext';

export default function Step2Company() {
  const { formData, updateFormData } = useRegistration();

  const inputStyle = {
    background: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
  };

  const labelStyle = { color: 'var(--text-main)' };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* ── Left Panel: Info Card ── */}
      <div
        className="w-full md:w-1/3 rounded-2xl p-6 flex flex-col gap-4 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%)',
          minHeight: '400px',
        }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <path d="M9 22v-4h6v4"></path>
            <path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path>
            <path d="M12 10h.01"></path><path d="M12 14h.01"></path>
            <path d="M16 10h.01"></path><path d="M16 14h.01"></path>
            <path d="M8 10h.01"></path><path d="M8 14h.01"></path>
          </svg>
          <h3 className="text-2xl font-bold mb-2">Dados Corporativos</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Preencha as informações legais e comerciais da empresa. Esses dados
            são essenciais para faturamento e conformidade fiscal.
          </p>
          <div className="mt-8 bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 font-semibold text-sm mb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Dica de Preenchimento
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              A Busca Automática por CNPJ pode preencher os campos abaixo. Certifique-se de validar a Razão Social.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* ── Right Panel: Form Fields ── */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">

        {/* CNPJ Row */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            CNPJ <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <input
                type="text"
                placeholder="00.000.000/0000-00"
                className="w-full h-10 pl-10 pr-3 rounded-md text-sm outline-none transition-colors"
                style={inputStyle}
                value={formData.cnpj ?? ''}
                onChange={(e) => updateFormData({ cnpj: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: 'var(--tertiary)', color: 'var(--primary)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Buscar Dados
            </button>
          </div>
        </div>

        {/* Razão Social */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Razão Social <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Empresa Fictícia S/A"
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={formData.companyName ?? ''}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
          />
        </div>

        {/* Nome Fantasia */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Nome Fantasia
          </label>
          <input
            type="text"
            placeholder="Nome Comercial"
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={formData.tradeName ?? ''}
            onChange={(e) => updateFormData({ tradeName: e.target.value })}
          />
        </div>

        {/* Data de Abertura */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Data de Abertura
          </label>
          <input
            type="text"
            placeholder="DD/MM/AAAA"
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={formData.openingDate ?? ''}
            onChange={(e) => updateFormData({ openingDate: e.target.value })}
          />
        </div>

        {/* IE and IM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
                Inscrição Estadual (IE)
              </label>
            </div>
            <input
              type="text"
              placeholder="Isento ou Número"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
              value={formData.stateRegistration ?? ''}
              onChange={(e) => updateFormData({ stateRegistration: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
              Inscrição Municipal (IM)
            </label>
            <input
              type="text"
              placeholder="Número da IM"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
              value={formData.municipalRegistration ?? ''}
              onChange={(e) => updateFormData({ municipalRegistration: e.target.value })}
            />
          </div>
        </div>

        {/* Natureza Jurídica */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Natureza Jurídica
          </label>
          <input
            type="text"
            placeholder="Ex: Sociedade Ltda."
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={formData.legalNature ?? ''}
            onChange={(e) => updateFormData({ legalNature: e.target.value })}
          />
        </div>

        {/* Segmento (CNAE) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Segmento de Mercado (CNAE)
          </label>
          <input
            type="text"
            placeholder="Ex: Comércio Varejista"
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={formData.businessActivity ?? ''}
            onChange={(e) => updateFormData({ businessActivity: e.target.value })}
          />
        </div>

      </div>
    </div>
  );
}
