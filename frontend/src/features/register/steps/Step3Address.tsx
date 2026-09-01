export default function Step3Address() {
  const inputStyle = {
    background: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
  };

  const labelStyle = {
    color: 'var(--text-main)',
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* ── Endereço Principal e Contatos ── */}
      <div className="p-6 rounded-xl" style={{ border: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Endereço Principal e Contatos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>CEP</label>
            <div className="relative">
              <input type="text" placeholder="00000-000" className="w-full h-10 px-3 pr-10 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none cursor-pointer" style={{ color: 'var(--primary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-span-7">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc." className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Número</label>
            <input type="text" placeholder="123" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Complemento</label>
            <input type="text" placeholder="Sala, Apto, Galpão" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Centro" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Caixa Postal</label>
            <input type="text" placeholder="Opcional" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-8">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="São Paulo" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado (UF)</label>
            <div className="relative">
              <select className="w-full h-10 px-3 rounded-md text-sm appearance-none outline-none transition-colors cursor-pointer" style={inputStyle} defaultValue="">
                <option value="" disabled hidden>Selecione</option>
                <option value="SP" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>São Paulo</option>
                <option value="RJ" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Rio de Janeiro</option>
                <option value="MG" style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }}>Minas Gerais</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-section: Contatos */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Contatos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Nome do Contato</label>
              <input type="text" placeholder="João Silva" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Telefone Fixo</label>
              <input type="text" placeholder="(00) 0000-0000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Celular / WhatsApp</label>
              <input type="text" placeholder="(00) 90000-0000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Endereço Financeiro ── */}
      <div className="p-6 rounded-xl" style={{ border: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Endereço Financeiro</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="flex flex-col gap-2 md:col-span-12">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Nome do Responsável</label>
            <input type="text" placeholder="Nome completo" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>CEP</label>
            <input type="text" placeholder="00000-000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-9">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc." className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-5">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado</label>
            <input type="text" placeholder="UF" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Telefone</label>
            <input type="text" placeholder="(00) 0000-0000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Celular</label>
            <input type="text" placeholder="(00) 90000-0000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>E-mail Financeiro</label>
            <input type="email" placeholder="financeiro@empresa.com.br" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* ── Endereço de Entrega ── */}
      <div className="p-6 rounded-xl" style={{ border: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--primary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Endereço de Entrega</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>CEP</label>
            <input type="text" placeholder="00000-000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-9">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc." className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-5">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado</label>
            <input type="text" placeholder="UF" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Nome do Contato</label>
            <input type="text" placeholder="Nome do contato" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Telefone</label>
            <input type="text" placeholder="(00) 0000-0000" className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-12">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Observações Logísticas</label>
            <textarea placeholder="Instruções para entrega..." className="w-full h-24 p-3 rounded-md text-sm outline-none transition-colors resize-none" style={inputStyle}></textarea>
          </div>
        </div>
      </div>

    </div>
  );
}
