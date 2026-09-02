import { useState } from 'react';

interface BankReferenceModalProps {
  onClose: () => void;
  onAdd: (bank: BankReference) => void;
}

export interface BankReference {
  id: string;
  empresa: string;
  nomeFantasia: string;
  cnpj: string;
  banco: string;
  agencia: string;
  contaCorrente: string;
  gerencia: string;
  fone: string;
  relato: string;
  informacoesData: string;
}

export default function BankReferenceModal({ onClose, onAdd }: BankReferenceModalProps) {
  const [form, setForm] = useState<Omit<BankReference, 'id'>>({
    empresa: '',
    nomeFantasia: '',
    cnpj: '',
    banco: '',
    agencia: '',
    contaCorrente: '',
    gerencia: '',
    fone: '',
    relato: '',
    informacoesData: '',
  });

  const inputStyle = {
    background: 'var(--bg-page)',
    color: 'var(--text-main)',
    border: '1px solid var(--border-color)',
  };

  const labelStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.empresa || !form.banco) return;
    onAdd({ ...form, id: crypto.randomUUID() });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        background: 'rgba(0,0,0,0.55)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="12" rx="2" />
                <path d="M7 8V6a5 5 0 0 1 10 0v2" />
                <line x1="12" y1="13" x2="12" y2="15" />
              </svg>
            </div>
            <div>
              <h3 style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '15px', margin: 0 }}>Adicionar Referência Bancária</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>Preencha os dados do banco de referência</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'var(--border-color)', border: 'none', borderRadius: '8px', width: 32, height: 32, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Empresa */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Empresa <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              placeholder="Razão Social do Banco"
              value={form.empresa}
              onChange={(e) => handleChange('empresa', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>

          {/* Nome Fantasia */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Nome Fantasia</label>
            <input
              type="text"
              placeholder="Nome comercial do banco"
              value={form.nomeFantasia}
              onChange={(e) => handleChange('nomeFantasia', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>

          {/* CNPJ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>CNPJ</label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              value={form.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>

          {/* Banco */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Banco <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              placeholder="Ex: Banco do Brasil, Itaú, Bradesco..."
              value={form.banco}
              onChange={(e) => handleChange('banco', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>

          {/* Agência / Conta Corrente */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Agência</label>
              <input
                type="text"
                placeholder="0000"
                value={form.agencia}
                onChange={(e) => handleChange('agencia', e.target.value)}
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Conta Corrente</label>
              <input
                type="text"
                placeholder="00000-0"
                value={form.contaCorrente}
                onChange={(e) => handleChange('contaCorrente', e.target.value)}
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Gerência / Fone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Gerência</label>
              <input
                type="text"
                placeholder="Nome do gerente"
                value={form.gerencia}
                onChange={(e) => handleChange('gerencia', e.target.value)}
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Fone</label>
              <input
                type="text"
                placeholder="(00) 0000-0000"
                value={form.fone}
                onChange={(e) => handleChange('fone', e.target.value)}
                className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Relato */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Relato</label>
            <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>RELATO</span>
            </div>
            <textarea
              rows={5}
              placeholder="Descreva informações sobre o relacionamento bancário..."
              value={form.relato}
              onChange={(e) => handleChange('relato', e.target.value)}
              className="w-full px-3 py-2 rounded-md text-sm outline-none transition-colors resize-none"
              style={{ ...inputStyle, lineHeight: '1.6' }}
            />
          </div>

          {/* Informações de */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Informações coletadas em</label>
            <input
              type="date"
              value={form.informacoesData}
              onChange={(e) => handleChange('informacoesData', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            style={{ background: 'var(--border-color)', color: 'var(--text-muted)', border: 'none' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer hover:opacity-90 flex items-center gap-2"
            style={{ background: 'var(--primary)', color: '#fff', border: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar Banco
          </button>
        </div>
      </div>
    </div>
  );
}
