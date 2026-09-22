import { useRegistration } from '../../../contexts/RegistrationContext';


export default function Step3Address() {
  const { formData, updateFormData } = useRegistration();

  const inputStyle = {
    background: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
  };
  const labelStyle = { color: 'var(--text-main)' };

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
          <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>Endereço Principal</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>CEP</label>
            <input type="text" placeholder="00000-000"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.zipCode ?? ''}
              onChange={(e) => updateFormData({ zipCode: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-7">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc."
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.street ?? ''}
              onChange={(e) => updateFormData({ street: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cx. Postal</label>
            <input type="text" placeholder="Caixa Postal"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.poBox ?? ''}
              onChange={(e) => updateFormData({ poBox: e.target.value })} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.neighborhood ?? ''}
              onChange={(e) => updateFormData({ neighborhood: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.city ?? ''}
              onChange={(e) => updateFormData({ city: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado (UF)</label>
            <input type="text" placeholder="UF"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.state ?? ''}
              onChange={(e) => updateFormData({ state: e.target.value })} />
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
              <input type="text" placeholder="Nome do contato"
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
                value={formData.contactPerson ?? ''}
                onChange={(e) => updateFormData({ contactPerson: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Telefone Fixo</label>
              <input type="text" placeholder="(00) 0000-0000"
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
                value={formData.phone ?? ''}
                onChange={(e) => updateFormData({ phone: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Celular / WhatsApp</label>
              <input type="text" placeholder="(00) 90000-0000"
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
                value={formData.mobilePhone ?? ''}
                onChange={(e) => updateFormData({ mobilePhone: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>E-mail (NF eletrônica)</label>
              <input type="email" placeholder="E-mail (NF eletrônica)"
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
                value={formData.email ?? ''}
                onChange={(e) => updateFormData({ email: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>E-mail (Compras)</label>
              <input type="email" placeholder="E-mail (Compras)"
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
                value={formData.purchasingEmail ?? ''}
                onChange={(e) => updateFormData({ purchasingEmail: e.target.value })} />
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
            <input type="text" placeholder="Nome completo"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialContact ?? ''}
              onChange={(e) => updateFormData({ financialContact: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>CEP</label>
            <input type="text" placeholder="00000-000"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialZipCode ?? ''}
              onChange={(e) => updateFormData({ financialZipCode: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-9">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc."
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialStreet ?? ''}
              onChange={(e) => updateFormData({ financialStreet: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialNeighborhood ?? ''}
              onChange={(e) => updateFormData({ financialNeighborhood: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialCity ?? ''}
              onChange={(e) => updateFormData({ financialCity: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado</label>
            <input type="text" placeholder="UF"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialState ?? ''}
              onChange={(e) => updateFormData({ financialState: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cx. Postal</label>
            <input type="text" placeholder="Caixa Postal"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialPoBox ?? ''}
              onChange={(e) => updateFormData({ financialPoBox: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Telefone</label>
            <input type="text" placeholder="(00) 0000-0000"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialPhone ?? ''}
              onChange={(e) => updateFormData({ financialPhone: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Celular</label>
            <input type="text" placeholder="(00) 90000-0000"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialMobilePhone ?? ''}
              onChange={(e) => updateFormData({ financialMobilePhone: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>E-mail Financeiro</label>
            <input type="email" placeholder="E-mail financeiro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.financialEmail ?? ''}
              onChange={(e) => updateFormData({ financialEmail: e.target.value })} />
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
            <input type="text" placeholder="00000-000"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryZipCode ?? ''}
              onChange={(e) => updateFormData({ deliveryZipCode: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-9">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc."
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryStreet ?? ''}
              onChange={(e) => updateFormData({ deliveryStreet: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryNeighborhood ?? ''}
              onChange={(e) => updateFormData({ deliveryNeighborhood: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-5">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryCity ?? ''}
              onChange={(e) => updateFormData({ deliveryCity: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado</label>
            <input type="text" placeholder="UF"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryState ?? ''}
              onChange={(e) => updateFormData({ deliveryState: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Nome do Contato</label>
            <input type="text" placeholder="Nome do contato"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryContact ?? ''}
              onChange={(e) => updateFormData({ deliveryContact: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Telefone</label>
            <input type="text" placeholder="(00) 0000-0000"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.deliveryPhone ?? ''}
              onChange={(e) => updateFormData({ deliveryPhone: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-12">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Observações Logísticas</label>
            <textarea placeholder="Instruções para entrega..."
              className="w-full h-24 p-3 rounded-md text-sm outline-none transition-colors resize-none" style={inputStyle}
              value={formData.deliveryObservation ?? ''}
              onChange={(e) => updateFormData({ deliveryObservation: e.target.value })} />
          </div>
        </div>
      </div>

    </div>
  );
}
