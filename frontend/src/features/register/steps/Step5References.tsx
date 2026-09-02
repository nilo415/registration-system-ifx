import { useState } from 'react';
import BankReferenceModal, { type BankReference } from './BankReferenceModal';
import SupplierReferenceModal, { type SupplierReference } from './SupplierReferenceModal';

export default function Step5References() {
  const [banks, setBanks] = useState<BankReference[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierReference[]>([]);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);

  const handleAddBank = (bank: BankReference) => {
    setBanks((prev) => [...prev, bank]);
  };

  const handleRemoveBank = (id: string) => {
    setBanks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddSupplier = (supplier: SupplierReference) => {
    setSuppliers((prev) => [...prev, supplier]);
  };

  const handleRemoveSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const cardStyle = {
    background: 'var(--bg-page)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    overflow: 'hidden',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid var(--border-color)',
  };

  const addBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '8px',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {/* ── Left Column: Lists ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Referências Bancárias */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="12" rx="2" />
                  <path d="M7 8V6a5 5 0 0 1 10 0v2" />
                </svg>
              </div>
              <span style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '14px' }}>
                Referências Bancárias
              </span>
            </div>
            <button
              style={addBtnStyle}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              onClick={() => setShowBankModal(true)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Adicionar Banco
            </button>
          </div>

          {banks.length === 0 ? (
            <div style={{ padding: '28px 16px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                Nenhum banco adicionado ainda.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {banks.map((bank, idx) => (
                <div
                  key={bank.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderTop: idx > 0 ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '8px',
                    background: 'var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    {getInitials(bank.banco || bank.empresa)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', margin: 0 }}>
                      {bank.banco || bank.empresa}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>
                      {bank.agencia && `Ag: ${bank.agencia}`}
                      {bank.agencia && bank.contaCorrente && ' · '}
                      {bank.contaCorrente && `CC: ${bank.contaCorrente}`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '6px' }}
                      title="Remover"
                      onClick={() => handleRemoveBank(bank.id)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" /><path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Referências Comerciais */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '14px' }}>
                Referências Comerciais
              </span>
            </div>
            <button
              style={{ ...addBtnStyle, background: 'var(--secondary)' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              onClick={() => setShowSupplierModal(true)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Adicionar Fornecedor
            </button>
          </div>

          {suppliers.length === 0 ? (
            <div style={{ padding: '28px 16px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                Nenhum fornecedor adicionado ainda.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {suppliers.map((supplier, idx) => (
                <div
                  key={supplier.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderTop: idx > 0 ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '8px',
                    background: 'var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}>
                    {getInitials(supplier.empresa)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '13px', margin: 0 }}>
                      {supplier.empresa}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>
                      {supplier.produtoFornecido || supplier.nomeFantasia || 'Sem detalhes'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px', borderRadius: '6px' }}
                      title="Remover"
                      onClick={() => handleRemoveSupplier(supplier.id)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" /><path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right Column: Info Card ── */}
      <div style={{ width: '200px', flexShrink: 0 }}>
        <div
          style={{
            borderRadius: '16px',
            padding: '20px',
            background: 'linear-gradient(160deg, var(--primary) 0%, var(--secondary) 100%)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 6px 0' }}>Análise de Crédito</h4>
            <p style={{ fontSize: '11px', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
              Referências consistentes aceleram a aprovação de limite para compras faturadas.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Bancos */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>Bancos Adicionados</span>
                <span style={{ fontSize: '11px', fontWeight: 700 }}>{banks.length}</span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{
                  height: '100%', borderRadius: '2px',
                  background: '#fff',
                  width: `${Math.min((banks.length / 3) * 100, 100)}%`,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
            {/* Fornecedores */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', opacity: 0.85 }}>Fornecedores</span>
                <span style={{ fontSize: '11px', fontWeight: 700 }}>{suppliers.length}/5</span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{
                  height: '100%', borderRadius: '2px',
                  background: '#fff',
                  width: `${Math.min((suppliers.length / 5) * 100, 100)}%`,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showBankModal && (
        <BankReferenceModal
          onClose={() => setShowBankModal(false)}
          onAdd={handleAddBank}
        />
      )}
      {showSupplierModal && (
        <SupplierReferenceModal
          onClose={() => setShowSupplierModal(false)}
          onAdd={handleAddSupplier}
        />
      )}
    </div>
  );
}
