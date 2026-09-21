import { useEffect, useState } from 'react';
import { useRegistration } from '../../../contexts/RegistrationContext';
import { fetchOptionsByCategory, type FormOption } from '../../../services/api';

export default function Step2Company() {
  const { formData, updateFormData } = useRegistration();
  const [tipoOptions, setTipoOptions] = useState<FormOption[]>([]);
  const [grupoOptions, setGrupoOptions] = useState<FormOption[]>([]);
  const [segmentoOptions, setSegmentoOptions] = useState<FormOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadOptions = async () => {
      try {
        const [tipos, grupos, segmentos] = await Promise.all([
          fetchOptionsByCategory('tipoCliente'),
          fetchOptionsByCategory('grupoCliente'),
          fetchOptionsByCategory('segmentoMercado'),
        ]);
        if (isMounted) {
          setTipoOptions(tipos);
          setGrupoOptions(grupos);
          setSegmentoOptions(segmentos);
        }
      } catch (err) {
        console.error('Erro ao carregar opções de cliente:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  const inputStyle = {
    background: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
  };

  const optionItemStyle = {
    background: 'var(--bg-card, #ffffff)',
    color: 'var(--text-main, #1f2430)',
  };

  const labelStyle = { color: 'var(--text-main)' };

  const currentTipo = formData.clientType || formData.tipoCliente || '';
  const currentGrupo = formData.clientGroup || formData.grupoCliente || '';
  const currentSegmento = formData.businessActivity || formData.segmentoMercado || '';
  const currentTes = formData.tesDefault ?? formData.tesPadrao ?? '';

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

        {/* CNPJ Row (Entrada livre sem máscara) */}
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
                placeholder="CNPJ da Empresa (sem máscara)"
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

        {/* Reg. Junta Comercial */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Reg. Junta Comercial
          </label>
          <input
            type="text"
            placeholder="Número do registro"
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={formData.commercialRegistry ?? ''}
            onChange={(e) => updateFormData({ commercialRegistry: e.target.value })}
          />
        </div>

        {/* IE and IM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
              Inscrição Estadual (IE)
            </label>
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

        {/* Segmento de Mercado (CNAE) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            Segmento de Mercado (CNAE)
          </label>
          <select
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors cursor-pointer"
            style={inputStyle}
            value={currentSegmento}
            onChange={(e) =>
              updateFormData({
                businessActivity: e.target.value,
                segmentoMercado: e.target.value,
              })
            }
          >
            <option value="" style={optionItemStyle}>
              {loading ? 'Carregando...' : 'Selecione o Segmento de Mercado...'}
            </option>
            {currentSegmento && !segmentoOptions.some((o) => o.label === currentSegmento) && (
              <option value={currentSegmento} style={optionItemStyle}>
                {currentSegmento} (atual)
              </option>
            )}
            {segmentoOptions.map((opt) => (
              <option key={opt.id} value={opt.label} style={optionItemStyle}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* TES Padrão */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
            TES Padrão
          </label>
          <input
            type="text"
            placeholder="Digite o código da TES padrão (ex: 501, 502...)"
            className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
            style={inputStyle}
            value={currentTes}
            onChange={(e) => updateFormData({ tesDefault: e.target.value, tesPadrao: e.target.value })}
          />
        </div>

        {/* Tipo de Cliente & Grupo de Cliente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Tipo de Cliente */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
                Tipo de Cliente
              </label>
            </div>
            <select
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors cursor-pointer"
              style={inputStyle}
              value={tipoOptions.some((o) => o.label === currentTipo) ? currentTipo : ''}
              onChange={(e) =>
                updateFormData({
                  clientType: e.target.value,
                  tipoCliente: e.target.value,
                })
              }
            >
              <option value="" style={optionItemStyle}>
                {loading ? 'Carregando...' : 'Selecione o Tipo de Cliente...'}
              </option>
              {tipoOptions.map((opt) => (
                <option key={opt.id} value={opt.label} style={optionItemStyle}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Grupo de Cliente */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wide" style={labelStyle}>
                Grupo de Cliente
              </label>
            </div>
            <select
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors cursor-pointer"
              style={inputStyle}
              value={grupoOptions.some((o) => o.label === currentGrupo) ? currentGrupo : ''}
              onChange={(e) =>
                updateFormData({
                  clientGroup: e.target.value,
                  grupoCliente: e.target.value,
                })
              }
            >
              <option value="" style={optionItemStyle}>
                {loading ? 'Carregando...' : 'Selecione o Grupo de Cliente...'}
              </option>
              {grupoOptions.map((opt) => (
                <option key={opt.id} value={opt.label} style={optionItemStyle}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}

