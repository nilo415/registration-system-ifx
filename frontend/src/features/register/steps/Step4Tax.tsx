import { useState } from 'react';

export default function Step4Tax() {
  const [isSuframa, setIsSuframa] = useState(true);

  const cardStyle = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
  };

  const inputStyle = {
    background: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* ── Left Column: Form Sections ── */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Regime Tributário */}
        <div className="p-6 rounded-xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" y1="22" x2="4" y2="15"></line>
              </svg>
            </div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Regime Tributário</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Optante pelo Simples Nacional?</p>
              <p className="text-[11px] font-medium mt-1" style={{ color: 'var(--text-muted)' }}>Cliente enquadrado no regime compartilhado de arrecadação.</p>
            </div>
            <label className="flex items-center cursor-pointer relative">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--border-color)' }}></div>
              <style>{`
                input:checked + div { background-color: var(--primary) !important; }
              `}</style>
            </label>
          </div>
        </div>

        {/* Benefícios e Isenções */}
        <div className="p-6 rounded-xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Benefícios e Isenções</h3>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Possui Suspensão de IPI?</p>
                <p className="text-[11px] font-medium mt-1" style={{ color: 'var(--text-muted)' }}>Isenção temporária do imposto sobre Produtos Industrializados.</p>
              </div>
              <label className="flex items-center cursor-pointer relative">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--border-color)' }}></div>
              </label>
            </div>

            <div className="w-full h-px" style={{ background: 'var(--border-color)' }} />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Possui Desconto para Suframa?</p>
                <p className="text-[11px] font-medium mt-1" style={{ color: 'var(--text-muted)' }}>Incentivos fiscais da Zona Franca de Manaus.</p>
              </div>
              <label className="flex items-center cursor-pointer relative">
                <input type="checkbox" className="peer sr-only" checked={isSuframa} onChange={(e) => setIsSuframa(e.target.checked)} />
                <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--border-color)' }}></div>
              </label>
            </div>

            {isSuframa && (
              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg mt-2">
                <label className="text-[10px] font-bold uppercase tracking-wide mb-2 block" style={{ color: 'var(--text-main)' }}>Número da Inscrição Suframa</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <input type="text" placeholder="00.0000.00-0" className="w-full h-10 pl-10 pr-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Regras Comerciais */}
        <div className="p-6 rounded-xl" style={cardStyle}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Regras Comerciais</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Trabalha com Ordem de Compra?</p>
              <p className="text-[11px] font-medium mt-1" style={{ color: 'var(--text-muted)' }}>Exigir número de OC no momento do faturamento.</p>
            </div>
            <label className="flex items-center cursor-pointer relative">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--border-color)' }}></div>
            </label>
          </div>
        </div>

      </div>

      {/* ── Right Column: Info Cards ── */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        
        {/* Conformidade Fiscal Card */}
        <div className="rounded-xl p-6 text-white shadow-lg flex flex-col justify-between" style={{ background: 'linear-gradient(180deg, var(--primary) 0%, #1e3a8a 100%)', minHeight: '260px' }}>
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Conformidade Fiscal</h3>
            <p className="text-[13px] opacity-90 leading-relaxed font-medium">
              As informações prestadas nesta etapa passam por validação automatizada junto à SEFAZ em tempo real.
            </p>
          </div>

          <div className="mt-8 bg-white/10 rounded-lg p-4 flex items-center justify-between backdrop-blur-md border border-white/10">
            <span className="text-xs font-semibold opacity-90">Status de Validação</span>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Aguardando dados</span>
            </div>
          </div>
        </div>

        {/* Dica Card */}
        <div 
          className="rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-end" 
          style={{ minHeight: '220px' }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: 'url(/tax_tip_bg.jpg)',
              filter: 'brightness(0.6) saturate(1.2)' 
            }} 
          />
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 mb-2 block">
              Dica
            </span>
            <p className="text-sm font-semibold leading-relaxed">
              Mantenha os dados fiscais atualizados para evitar rejeição de notas fiscais.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
