import { useRef, useState } from 'react';
import { useRegistration } from '../../../contexts/RegistrationContext';
import { fetchAddressByCep } from '../../../services/viacep';

interface Step3AddressProps {
  autoFilledFields: string[];
  markAutoFilled: (fields: string[]) => void;
  clearAutoFilled: (field: string) => void;
}

export default function Step3Address({ autoFilledFields, markAutoFilled, clearAutoFilled }: Step3AddressProps) {
  const { formData, updateFormData } = useRegistration();
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const hasSuccessfulAddressLookup = useRef(false);
  const isAddressLookupInProgress = useRef(false);

  const searchAddress = async () => {
    const cepValue = formData.zipCode ?? '';
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length !== 8 || hasSuccessfulAddressLookup.current || isAddressLookupInProgress.current) return;

    isAddressLookupInProgress.current = true;
    setIsSearchingAddress(true);
    try {
      const address = await fetchAddressByCep(cleanCep);
      const postalComplement = address.complemento?.trim() ?? '';
      const postalNumber = postalComplement.match(/^(?:n(?:º|°|o)?\.?\s*)?(\d+[a-z]?(?:\/\d+[a-z]?)?)$/i)?.[1] ?? '';
      const complement = postalNumber ? '' : postalComplement;
      const fields = {
        zipCode: address.cep || cleanCep,
        financialZipCode: address.cep || cleanCep,
        deliveryZipCode: address.cep || cleanCep,
        street: address.logradouro,
        financialStreet: address.logradouro,
        deliveryStreet: address.logradouro,
        neighborhood: address.bairro,
        financialNeighborhood: address.bairro,
        deliveryNeighborhood: address.bairro,
        city: address.localidade,
        financialCity: address.localidade,
        deliveryCity: address.localidade,
        state: address.uf,
        financialState: address.uf,
        deliveryState: address.uf,
        number: postalNumber || formData.number || '',
        financialNumber: postalNumber || formData.financialNumber || '',
        deliveryNumber: postalNumber || formData.deliveryNumber || '',
        complement: complement || formData.complement || '',
        financialComplement: complement || formData.financialComplement || '',
        deliveryComplement: complement || formData.deliveryComplement || '',
      };
      updateFormData(fields);
      markAutoFilled(Object.keys(fields).filter((field) => fields[field as keyof typeof fields] !== (formData[field as keyof typeof formData] ?? '')));
      hasSuccessfulAddressLookup.current = true;
    } catch {
      return;
    } finally {
      isAddressLookupInProgress.current = false;
      setIsSearchingAddress(false);
    }
  };

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
            <div className="flex gap-2">
              <input type="text" placeholder="00000-000"
                className="min-w-0 flex-1 h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('zipCode') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
                value={formData.zipCode ?? ''}
                onChange={(e) => { clearAutoFilled('zipCode'); updateFormData({ zipCode: e.target.value }); }}
                aria-busy={isSearchingAddress} />
              <button type="button" onClick={() => void searchAddress()} disabled={isSearchingAddress || hasSuccessfulAddressLookup.current}
                aria-label="Search address by postal code" title="Search address by postal code"
                className="w-10 h-10 shrink-0 rounded-md flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ background: 'var(--primary)', color: '#ffffff' }}>
                {isSearchingAddress ? (
                  <span className="text-xs">...</span>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7"></circle>
                    <line x1="16" y1="16" x2="21" y2="21"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-span-5">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc."
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('street') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.street ?? ''}
              onChange={(e) => { clearAutoFilled('street'); updateFormData({ street: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Número</label>
            <input type="text" placeholder="Número"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('number') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.number ?? ''}
              onChange={(e) => { clearAutoFilled('number'); updateFormData({ number: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cx. Postal</label>
            <input type="text" placeholder="Caixa Postal"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle}
              value={formData.poBox ?? ''}
              onChange={(e) => updateFormData({ poBox: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-12">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Complemento</label>
            <input type="text" placeholder="Complemento"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('complement') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.complement ?? ''}
              onChange={(e) => { clearAutoFilled('complement'); updateFormData({ complement: e.target.value }); }} />
          </div>

          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('neighborhood') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.neighborhood ?? ''}
              onChange={(e) => { clearAutoFilled('neighborhood'); updateFormData({ neighborhood: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('city') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.city ?? ''}
              onChange={(e) => { clearAutoFilled('city'); updateFormData({ city: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado (UF)</label>
            <input type="text" placeholder="UF"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('state') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.state ?? ''}
              onChange={(e) => { clearAutoFilled('state'); updateFormData({ state: e.target.value }); }} />
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
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialZipCode') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialZipCode ?? ''}
              onChange={(e) => { clearAutoFilled('financialZipCode'); updateFormData({ financialZipCode: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc."
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialStreet') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialStreet ?? ''}
              onChange={(e) => { clearAutoFilled('financialStreet'); updateFormData({ financialStreet: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Número</label>
            <input type="text" placeholder="Número"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialNumber') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialNumber ?? ''}
              onChange={(e) => { clearAutoFilled('financialNumber'); updateFormData({ financialNumber: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-12">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Complemento</label>
            <input type="text" placeholder="Complemento"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialComplement') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialComplement ?? ''}
              onChange={(e) => { clearAutoFilled('financialComplement'); updateFormData({ financialComplement: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialNeighborhood') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialNeighborhood ?? ''}
              onChange={(e) => { clearAutoFilled('financialNeighborhood'); updateFormData({ financialNeighborhood: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialCity') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialCity ?? ''}
              onChange={(e) => { clearAutoFilled('financialCity'); updateFormData({ financialCity: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado</label>
            <input type="text" placeholder="UF"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('financialState') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.financialState ?? ''}
              onChange={(e) => { clearAutoFilled('financialState'); updateFormData({ financialState: e.target.value }); }} />
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
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryZipCode') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryZipCode ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryZipCode'); updateFormData({ deliveryZipCode: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-6">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Endereço</label>
            <input type="text" placeholder="Rua, Avenida, etc."
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryStreet') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryStreet ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryStreet'); updateFormData({ deliveryStreet: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Número</label>
            <input type="text" placeholder="Número"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryNumber') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryNumber ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryNumber'); updateFormData({ deliveryNumber: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-12">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Complemento</label>
            <input type="text" placeholder="Complemento"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryComplement') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryComplement ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryComplement'); updateFormData({ deliveryComplement: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-4">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Bairro</label>
            <input type="text" placeholder="Bairro"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryNeighborhood') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryNeighborhood ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryNeighborhood'); updateFormData({ deliveryNeighborhood: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-5">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Cidade</label>
            <input type="text" placeholder="Cidade"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryCity') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryCity ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryCity'); updateFormData({ deliveryCity: e.target.value }); }} />
          </div>
          <div className="flex flex-col gap-2 md:col-span-3">
            <label className="text-[10px] font-bold uppercase tracking-wide" style={labelStyle}>Estado</label>
            <input type="text" placeholder="UF"
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={{ ...inputStyle, ...(autoFilledFields.includes('deliveryState') ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--secondary) 42%, transparent)' } : {}) }}
              value={formData.deliveryState ?? ''}
              onChange={(e) => { clearAutoFilled('deliveryState'); updateFormData({ deliveryState: e.target.value }); }} />
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
