import { useState } from 'react';

interface SupplierReferenceModalProps {
  onClose: () => void;
  onAdd: (supplier: SupplierReference) => void;
}

export interface SupplierReference {
  id: string;
  empresa: string;
  nomeFantasia: string;
  cnpj: string;
  clienteDesde: string;
  maiorFaturaData: string;
  maiorFaturaValor: string;
  ultimaFaturaData: string;
  ultimaFaturaValor: string;
  mediasMensalValor: string;
  condicaoPagamento: 'avista' | 'aprazo' | '';
  diasPrazo: string;
  formaPagamento: {
    boleto: boolean;
    deposito: boolean;
    cheque: boolean;
  };
  pagamentoPontual: boolean;
  pagamentoAtraso: boolean;
  mediaAtraso: string;
  pagamentoCartorio: 'sim' | 'nao' | '';
  debitosVencidos: string;
  debitosVencer: string;
  limiteCredito: string;
  conceito: 'otimo' | 'bom' | 'mediano' | 'dificil' | '';
  produtoFornecido: string;
  observacoes: string;
  informacoesData: string;
}

const defaultForm: Omit<SupplierReference, 'id'> = {
  empresa: '',
  nomeFantasia: '',
  cnpj: '',
  clienteDesde: '',
  maiorFaturaData: '',
  maiorFaturaValor: '',
  ultimaFaturaData: '',
  ultimaFaturaValor: '',
  mediasMensalValor: '',
  condicaoPagamento: '',
  diasPrazo: '',
  formaPagamento: { boleto: false, deposito: false, cheque: false },
  pagamentoPontual: false,
  pagamentoAtraso: false,
  mediaAtraso: '',
  pagamentoCartorio: '',
  debitosVencidos: '',
  debitosVencer: '',
  limiteCredito: '',
  conceito: '',
  produtoFornecido: '',
  observacoes: '',
  informacoesData: '',
};

export default function SupplierReferenceModal({ onClose, onAdd }: SupplierReferenceModalProps) {
  const [form, setForm] = useState<Omit<SupplierReference, 'id'>>(defaultForm);

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

  const sectionTitleStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '6px',
    marginBottom: '2px',
  };

  const radioGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  const radioBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    borderRadius: '6px',
    border: `1px solid ${active ? 'var(--primary)' : 'var(--border-color)'}`,
    background: active ? 'var(--primary)' : 'transparent',
    color: active ? '#fff' : 'var(--text-muted)',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
  });

  const handleChange = (field: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.empresa) return;
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
          maxWidth: '620px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3 style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '15px', margin: 0 }}>Adicionar Referência Comercial</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>Preencha os dados do fornecedor de referência</p>
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
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Empresa */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Empresa <span style={{ color: '#ef4444' }}>*</span></label>
            <input type="text" placeholder="Razão Social" value={form.empresa}
              onChange={(e) => handleChange('empresa', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          {/* Nome Fantasia */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Nome Fantasia</label>
            <input type="text" placeholder="Nome comercial" value={form.nomeFantasia}
              onChange={(e) => handleChange('nomeFantasia', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          {/* CNPJ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>CNPJ</label>
            <input type="text" placeholder="00.000.000/0000-00" value={form.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors" style={inputStyle} />
          </div>

          {/* Datas e Faturas */}
          <div>
            <p style={sectionTitleStyle}>Histórico Financeiro</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Cliente Desde</label>
                <input type="date" value={form.clienteDesde}
                  onChange={(e) => handleChange('clienteDesde', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Média Mensal (R$)</label>
                <input type="text" placeholder="0,00" value={form.mediasMensalValor}
                  onChange={(e) => handleChange('mediasMensalValor', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Maior Fatura — Data</label>
                <input type="date" value={form.maiorFaturaData}
                  onChange={(e) => handleChange('maiorFaturaData', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Maior Fatura — Valor (R$)</label>
                <input type="text" placeholder="0,00" value={form.maiorFaturaValor}
                  onChange={(e) => handleChange('maiorFaturaValor', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Última Fatura — Data</label>
                <input type="date" value={form.ultimaFaturaData}
                  onChange={(e) => handleChange('ultimaFaturaData', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Última Fatura — Valor (R$)</label>
                <input type="text" placeholder="0,00" value={form.ultimaFaturaValor}
                  onChange={(e) => handleChange('ultimaFaturaValor', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Condição de Pagamento */}
          <div>
            <p style={sectionTitleStyle}>Condição de Pagamento</p>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ ...labelStyle, marginBottom: '8px', display: 'block' }}>Modalidade</label>
                <div style={radioGroupStyle}>
                  {(['avista', 'aprazo'] as const).map((opt) => (
                    <button key={opt} type="button" style={radioBtnStyle(form.condicaoPagamento === opt)}
                      onClick={() => handleChange('condicaoPagamento', opt)}>
                      {opt === 'avista' ? 'À Vista' : 'A Prazo'}
                    </button>
                  ))}
                  {form.condicaoPagamento === 'aprazo' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input type="text" placeholder="Dias" value={form.diasPrazo}
                        onChange={(e) => handleChange('diasPrazo', e.target.value)}
                        className="h-8 px-2 rounded-md text-sm outline-none"
                        style={{ ...inputStyle, width: '70px' }} />
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>dias</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ ...labelStyle, marginBottom: '8px', display: 'block' }}>Forma de Pagamento</label>
                <div style={radioGroupStyle}>
                  {([['boleto', 'Boleto Banco'], ['deposito', 'Depósito em C/C'], ['cheque', 'Cheque']] as const).map(([key, label]) => (
                    <button key={key} type="button"
                      style={radioBtnStyle(form.formaPagamento[key])}
                      onClick={() => handleChange('formaPagamento', { ...form.formaPagamento, [key]: !form.formaPagamento[key] })}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pontualidade */}
          <div>
            <p style={sectionTitleStyle}>Pontualidade</p>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={radioGroupStyle}>
                <button type="button" style={radioBtnStyle(form.pagamentoPontual)}
                  onClick={() => { handleChange('pagamentoPontual', !form.pagamentoPontual); handleChange('pagamentoAtraso', false); }}>
                  Pontual
                </button>
                <button type="button" style={radioBtnStyle(form.pagamentoAtraso)}
                  onClick={() => { handleChange('pagamentoAtraso', !form.pagamentoAtraso); handleChange('pagamentoPontual', false); }}>
                  Com Atraso
                </button>
                {form.pagamentoAtraso && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Média:</span>
                    <input type="text" placeholder="Dias" value={form.mediaAtraso}
                      onChange={(e) => handleChange('mediaAtraso', e.target.value)}
                      className="h-8 px-2 rounded-md text-sm outline-none"
                      style={{ ...inputStyle, width: '70px' }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>dias</span>
                  </div>
                )}
              </div>
              <div>
                <label style={{ ...labelStyle, marginBottom: '8px', display: 'block' }}>Realiza Pagamento em Cartório?</label>
                <div style={radioGroupStyle}>
                  {(['sim', 'nao'] as const).map((opt) => (
                    <button key={opt} type="button" style={radioBtnStyle(form.pagamentoCartorio === opt)}
                      onClick={() => handleChange('pagamentoCartorio', opt)}>
                      {opt === 'sim' ? 'Sim' : 'Não'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Débitos e Limite */}
          <div>
            <p style={sectionTitleStyle}>Situação Financeira</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Débitos Vencidos (R$)</label>
                <input type="text" placeholder="0,00" value={form.debitosVencidos}
                  onChange={(e) => handleChange('debitosVencidos', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Débitos a Vencer (R$)</label>
                <input type="text" placeholder="0,00" value={form.debitosVencer}
                  onChange={(e) => handleChange('debitosVencer', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Limite de Crédito (R$)</label>
                <input type="text" placeholder="0,00" value={form.limiteCredito}
                  onChange={(e) => handleChange('limiteCredito', e.target.value)}
                  className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Conceito */}
          <div>
            <p style={sectionTitleStyle}>Conceito</p>
            <div style={{ ...radioGroupStyle, marginTop: '10px' }}>
              {([['otimo', 'Ótimo cliente'], ['bom', 'Bom cliente'], ['mediano', 'Cliente mediano'], ['dificil', 'Cliente difícil']] as const).map(([key, label]) => (
                <button key={key} type="button" style={radioBtnStyle(form.conceito === key)}
                  onClick={() => handleChange('conceito', key)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Produto Fornecido */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Produto Fornecido</label>
            <input type="text" placeholder="Descreva o produto ou serviço fornecido" value={form.produtoFornecido}
              onChange={(e) => handleChange('produtoFornecido', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
          </div>

          {/* Observações */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={sectionTitleStyle}>Observações Importantes</p>
            <textarea rows={4} placeholder="Observações relevantes sobre este fornecedor..." value={form.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              className="w-full px-3 py-2 rounded-md text-sm outline-none resize-none transition-colors"
              style={{ ...inputStyle, lineHeight: '1.6', marginTop: '8px' }} />
          </div>

          {/* Informações coletadas em */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={labelStyle}>Informações coletadas em</label>
            <input type="date" value={form.informacoesData}
              onChange={(e) => handleChange('informacoesData', e.target.value)}
              className="w-full h-10 px-3 rounded-md text-sm outline-none" style={inputStyle} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '12px', position: 'sticky', bottom: 0, background: 'var(--bg-surface)' }}>
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            style={{ background: 'var(--border-color)', color: 'var(--text-muted)', border: 'none' }}>
            Cancelar
          </button>
          <button onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer hover:opacity-90 flex items-center gap-2"
            style={{ background: 'var(--secondary)', color: '#fff', border: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Adicionar Fornecedor
          </button>
        </div>
      </div>
    </div>
  );
}
