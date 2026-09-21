import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import AppLayout from '../components/layout/AppLayout';
import {
  fetchOptionsByCategory,
  addOptionByCategory,
  deleteOptionById,
  type FormOption,
} from '../services/api';

interface CategoryConfig {
  key: string;
  title: string;
  description: string;
  placeholder: string;
  icon: ReactNode;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'segmentoMercado',
    title: 'Segmento de Mercado',
    description: 'CNAE e segmentos de atuação da empresa',
    placeholder: 'Ex: 000004 INDUSTRIA DE PLASTICOS...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    key: 'tipoCliente',
    title: 'Tipo de Cliente',
    description: 'Opções exibidas na etapa de Dados da Empresa',
    placeholder: 'Ex: Consumidor Final, Distribuidor...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: 'grupoCliente',
    title: 'Grupo de Cliente',
    description: 'Tributações e regimes fiscais',
    placeholder: 'Ex: 100 – Tributação 12% Fora do Estado...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
      </svg>
    ),
  },
  {
    key: 'representante',
    title: 'Representante',
    description: 'Representantes de vendas parceiros',
    placeholder: 'Ex: João da Silva, Representações ABC...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    key: 'informacoesObtidasPor',
    title: 'Operador',
    description: 'Origem ou responsável pelas informações obtidas no formulário',
    placeholder: 'Ex: Consulta Direta, Visita Comercial...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
];

export default function OptionsManagerPage() {
  const [optionsMap, setOptionsMap] = useState<Record<string, FormOption[]>>({});
  const [inputMap, setInputMap] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  const loadCategory = async (catKey: string) => {
    setLoadingMap((prev) => ({ ...prev, [catKey]: true }));
    try {
      const data = await fetchOptionsByCategory(catKey);
      setOptionsMap((prev) => ({ ...prev, [catKey]: data }));
      setErrorMap((prev) => ({ ...prev, [catKey]: '' }));
    } catch (err) {
      console.error(`Erro ao carregar opções para ${catKey}:`, err);
      setErrorMap((prev) => ({ ...prev, [catKey]: 'Erro ao buscar opções do servidor.' }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [catKey]: false }));
    }
  };

  useEffect(() => {
    CATEGORIES.forEach((cat) => loadCategory(cat.key));
  }, []);

  const handleAdd = async (catKey: string) => {
    const text = (inputMap[catKey] || '').trim();
    if (!text) {
      setErrorMap((prev) => ({ ...prev, [catKey]: 'Digite o nome da opção antes de adicionar.' }));
      return;
    }

    setLoadingMap((prev) => ({ ...prev, [catKey]: true }));
    try {
      await addOptionByCategory(catKey, text);
      setInputMap((prev) => ({ ...prev, [catKey]: '' }));
      setErrorMap((prev) => ({ ...prev, [catKey]: '' }));
      await loadCategory(catKey);
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Erro ao adicionar opção.';
      setErrorMap((prev) => ({ ...prev, [catKey]: msg }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [catKey]: false }));
    }
  };

  const handleDelete = async (catKey: string, id: number) => {
    try {
      await deleteOptionById(id);
      setOptionsMap((prev) => ({
        ...prev,
        [catKey]: (prev[catKey] || []).filter((item) => item.id !== id),
      }));
    } catch (err: any) {
      console.error('Erro ao deletar opção:', err);
      setErrorMap((prev) => ({ ...prev, [catKey]: 'Não foi possível remover o item.' }));
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'var(--primary)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
                Alterar Formulário
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Cadastre e gerencie as opções disponíveis nos campos selecionáveis do sistema sem precisar alterar o código.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => {
            const list = optionsMap[cat.key] || [];
            const isLoading = loadingMap[cat.key] || false;
            const errorMsg = errorMap[cat.key] || '';
            const currentInputValue = inputMap[cat.key] || '';

            return (
              <div
                key={cat.key}
                className="flex flex-col rounded-2xl border transition-all shadow-sm"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
              >
                {/* Card Header */}
                <div
                  className="p-5 border-b flex items-start justify-between gap-4"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: 'var(--bg-card-header)',
                        color: 'var(--primary)',
                      }}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-base font-semibold" style={{ color: 'var(--text-main)' }}>
                        {cat.title}
                      </h2>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                      color: 'var(--primary)',
                      border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
                    }}
                  >
                    {list.length} {list.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {/* Add new option form */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 h-10 px-3.5 rounded-lg text-sm outline-none transition-colors border"
                      style={{
                        background: 'transparent',
                        color: 'var(--text-main)',
                        borderColor: 'var(--border-color)',
                      }}
                      placeholder={cat.placeholder}
                      value={currentInputValue}
                      onChange={(e) => {
                        setInputMap((prev) => ({ ...prev, [cat.key]: e.target.value }));
                        if (errorMsg) setErrorMap((prev) => ({ ...prev, [cat.key]: '' }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAdd(cat.key);
                        }
                      }}
                    />
                    <button
                      type="button"
                      disabled={isLoading || !currentInputValue.trim()}
                      onClick={() => handleAdd(cat.key)}
                      className="h-10 px-4 rounded-lg text-sm font-semibold text-white flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed shrink-0"
                      style={{ background: 'var(--primary)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Adicionar
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
                  )}
                </div>

                {/* List of options */}
                <div
                  className="px-5 pb-5 flex-1 flex flex-col gap-2 max-h-[320px] overflow-y-auto"
                >
                  {isLoading && list.length === 0 ? (
                    <div className="py-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                      Carregando opções...
                    </div>
                  ) : list.length === 0 ? (
                    <div
                      className="py-8 px-4 text-center rounded-xl border border-dashed flex flex-col items-center justify-center gap-2"
                      style={{
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <span className="text-xs">Nenhuma opção cadastrada ainda. Digite acima para adicionar.</span>
                    </div>
                  ) : (
                    list.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between p-2.5 px-3.5 rounded-xl border transition-colors hover:border-red-500/30"
                        style={{
                          background: 'var(--bg-item)',
                          borderColor: 'var(--border-color)',
                        }}
                      >
                        <span className="text-sm font-medium pr-2 truncate" style={{ color: 'var(--text-main)' }}>
                          {item.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(cat.key, item.id)}
                          title="Remover opção"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-80 group-hover:opacity-100 cursor-pointer"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
