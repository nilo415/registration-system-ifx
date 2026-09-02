const switchBaseStyle = {
  width: '36px',
  height: '20px',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.1)',
  position: 'relative' as const,
  cursor: 'pointer',
  border: '1px solid var(--border-color)',
  flexShrink: 0,
};
const switchToggleStyle = {
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  background: 'var(--text-muted)',
  position: 'absolute' as const,
  top: '2px',
  left: '2px',
  transition: 'all 0.3s'
};

const Switch = () => (
  <div style={switchBaseStyle}>
    <div style={switchToggleStyle}></div>
  </div>
);

export default function Step4Tax() {
  const boxStyle = {
    background: 'transparent',
    border: '1px solid var(--border-color)',
  };

  const blueBoxStyle = {
    background: 'linear-gradient(135deg, #0b347d 0%, #071f4c 100%)',
    color: '#fff',
    border: '1px solid #1449a8',
  };

  const imageBoxStyle = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    position: 'relative' as const,
    overflow: 'hidden',
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-extrabold mb-6" style={{ color: 'var(--text-main)' }}>Informações Fiscais</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6 lg:w-2/3">
          
          {/* Regime Tributário */}
          <div className="p-6 rounded-xl flex flex-col gap-6" style={boxStyle}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16"></path><path d="M4 18h16"></path><path d="M4 14h16"></path><path d="M4 10h16"></path><path d="M12 2l-10 6h20z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Regime Tributário</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Optante pelo Simples Nacional?</h4>
                <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Cliente enquadrado no regime compartilhado de arrecadação.</p>
              </div>
              <Switch />
            </div>
          </div>

          {/* Benefícios e Isenções */}
          <div className="p-6 rounded-xl flex flex-col gap-6" style={boxStyle}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <circle cx="12" cy="15" r="3"></circle>
                </svg>
              </div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Benefícios e Isenções</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Possui Suspensão de IPI?</h4>
                <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Isenção temporária do Imposto sobre Produtos Industrializados.</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Possui Desconto para Suframa?</h4>
                <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Incentivos fiscais de Zona Franca de Manaus.</p>
              </div>
              <Switch />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-main)' }}>Número de Inscrição Suframa</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                </div>
                <input type="text" placeholder="Digite o número da inscrição" className="w-full h-10 pl-9 pr-3 rounded-md text-sm outline-none transition-colors" style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)' }} />
              </div>
            </div>
          </div>

          {/* Regras Comerciais */}
          <div className="p-6 rounded-xl flex flex-col gap-6" style={boxStyle}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>Regras Comerciais</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-main)' }}>Trabalha com Ordem de Compra?</h4>
                <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Exigir número de OC no momento do faturamento.</p>
              </div>
              <Switch />
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          
          {/* Conformidade Fiscal */}
          <div className="p-6 rounded-xl flex flex-col gap-4" style={blueBoxStyle}>
            <div className="mb-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="font-bold text-xl text-white">Conformidade Fiscal</h3>
            <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              As informações prestadas nesta etapa passam por validação automatizada junto à SEFAZ em tempo real.
            </p>
            <div className="my-2" style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status da Validação</span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }}></div>
                <span className="text-xs font-bold text-white">Aguardando dados</span>
              </div>
            </div>
          </div>

          {/* Dica Card */}
          <div className="rounded-xl flex flex-col h-64 relative" style={imageBoxStyle}>
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80" 
              alt="Calculator and laptop" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}></div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded mb-3 inline-block" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}>DICA</span>
              <p className="text-white text-sm font-semibold leading-tight">
                Mantenha os dados fiscais atualizados para evitar rejeição de notas fiscais.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
