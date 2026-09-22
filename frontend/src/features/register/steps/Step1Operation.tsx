import { useEffect, useState } from 'react';
import { useRegistration } from '../../../contexts/RegistrationContext';
import { fetchOptionsByCategory, type FormOption } from '../../../services/api';

export default function Step1Operation() {
  const { formData, updateFormData } = useRegistration();
  const [repOptions, setRepOptions] = useState<FormOption[]>([]);
  const [infoOptions, setInfoOptions] = useState<FormOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadOptions = async () => {
      try {
        const [reps, infos] = await Promise.all([
          fetchOptionsByCategory('representante'),
          fetchOptionsByCategory('informacoesObtidasPor'),
        ]);
        if (isMounted) {
          setRepOptions(reps);
          setInfoOptions(infos);
        }
      } catch (err) {
        console.error('Erro ao carregar opções de representantes / informações:', err);
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

  const currentRep = formData.salesRepresentative || formData.representante || '';
  const currentInfo = formData.preparedBy || formData.informacoesObtidasPor || '';

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      {/* Tipo de Cadastro */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
          Tipo de Cadastro <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors"
          style={inputStyle}
          placeholder="Tipo de Cadastro"
          value={formData.operationType ?? ''}
          onChange={(e) => updateFormData({ operationType: e.target.value })}
        />

        <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
          Esse texto aparecerá como título da capa na ficha cadastral gerada.
        </p>
      </div>

      {/* Representante */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
            Representante
          </label>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Gerenciável na aba "Alterar Formulário"
          </span>
        </div>

        <select
          className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors cursor-pointer"
          style={inputStyle}
          value={repOptions.some((o) => o.label === currentRep) ? currentRep : ''}
          onChange={(e) =>
            updateFormData({
              salesRepresentative: e.target.value,
              representante: e.target.value,
            })
          }
        >
          <option value="" style={optionItemStyle}>
            {loading ? 'Carregando representantes...' : 'Selecione um representante...'}
          </option>
          {repOptions.map((opt) => (
            <option key={opt.id} value={opt.label} style={optionItemStyle}>
              {opt.label}
            </option>
          ))}
        </select>
        {repOptions.length === 0 && !loading && (
          <p className="text-[11px] text-amber-500">
            Nenhum representante cadastrado ainda. Você pode adicionar novas opções na aba <strong>Alterar Formulário</strong>.
          </p>
        )}
      </div>

      {/* Informações Obtidas Por */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
            Informações Obtidas Por
          </label>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Gerenciável na aba "Alterar Formulário"
          </span>
        </div>

        <select
          className="w-full h-10 px-3 rounded-md text-sm outline-none transition-colors cursor-pointer"
          style={inputStyle}
          value={infoOptions.some((o) => o.label === currentInfo) ? currentInfo : ''}
          onChange={(e) =>
            updateFormData({
              preparedBy: e.target.value,
              informacoesObtidasPor: e.target.value,
            })
          }
        >
          <option value="" style={optionItemStyle}>
            {loading ? 'Carregando opções...' : 'Selecione a origem das informações...'}
          </option>
          {infoOptions.map((opt) => (
            <option key={opt.id} value={opt.label} style={optionItemStyle}>
              {opt.label}
            </option>
          ))}
        </select>
        {infoOptions.length === 0 && !loading && (
          <p className="text-[11px] text-amber-500">
            Nenhuma opção cadastrada ainda. Você pode adicionar novas opções na aba <strong>Alterar Formulário</strong>.
          </p>
        )}
      </div>
    </div>
  );
}

