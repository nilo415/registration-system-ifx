import type { RegistrationPayload, Representative, BankReference, CommercialReference } from '../services/api';

/**
 * Formata um CNPJ no padrão 00.000.000/0000-00 conforme o usuário digita.
 */
export function formatCnpj(val: string | undefined | null): string {
  if (!val) return '';
  const digits = String(val).replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

/**
 * Remove caracteres especiais de um CNPJ, retornando apenas os dígitos (até 14).
 */
export function stripCnpj(val: string | undefined | null): string {
  if (!val) return '';
  return String(val).replace(/\D/g, '').slice(0, 14);
}

/**
 * Formata um CPF no padrão 000.000.000-00 conforme o usuário digita.
 */
export function formatCpf(val: string | undefined | null): string {
  if (!val) return '';
  const digits = String(val).replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

/**
 * Remove caracteres especiais de um CPF, retornando apenas os dígitos (até 11).
 */
export function stripCpf(val: string | undefined | null): string {
  if (!val) return '';
  return String(val).replace(/\D/g, '').slice(0, 11);
}

/**
 * Formata um CEP no padrão 00000-000 conforme o usuário digita.
 */
export function formatCep(val: string | undefined | null): string {
  if (!val) return '';
  const digits = String(val).replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/**
 * Remove caracteres especiais de um CEP, retornando apenas os dígitos (até 8).
 */
export function stripCep(val: string | undefined | null): string {
  if (!val) return '';
  return String(val).replace(/\D/g, '').slice(0, 8);
}

/**
 * Formata valores monetários em padrão brasileiro (ex: 1.234,56).
 * Utiliza o modelo centavos-shift tradicional e aceita strings pré-formatadas ou numéricas.
 */
export function formatCurrency(val: string | number | undefined | null): string {
  if (val === undefined || val === null || val === '') return '';
  const digits = String(val).replace(/\D/g, '');
  if (!digits) return '';
  const num = parseInt(digits, 10) / 100;
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Remove pontuação (vírgulas, pontos) de valores monetários para persistência sem caracteres especiais.
 * Se o valor for "1.234,56", retorna "123456" (centavos em dígitos).
 */
export function stripCurrency(val: string | number | undefined | null): string {
  if (val === undefined || val === null || val === '') return '';
  const digits = String(val).replace(/\D/g, '');
  if (!digits) return '';
  return String(parseInt(digits, 10));
}

/**
 * Formata datas no padrão dd/mm/aaaa conforme o usuário digita.
 * Também converte datas ISO (yyyy-mm-dd) recebidas de drafts ou da API.
 */
export function formatDate(val: string | undefined | null): string {
  if (!val) return '';
  const str = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const [y, m, d] = str.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  }
  const digits = str.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Remove barras e traços de uma data, salvando apenas dígitos (ddmmaaaa).
 */
export function stripDate(val: string | undefined | null): string {
  if (!val) return '';
  const str = String(val).trim();
  // Se for ISO yyyy-mm-dd converte primeiro para ddmmaaaa
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const [y, m, d] = str.slice(0, 10).split('-');
    return `${d}${m}${y}`;
  }
  return str.replace(/\D/g, '').slice(0, 8);
}

/**
 * Formata telefones fixos (10 dígitos) ou celulares (11 dígitos).
 * Padrões: (00) 0000-0000 ou (00) 90000-0000.
 */
export function formatPhone(val: string | undefined | null): string {
  if (!val) return '';
  const digits = String(val).replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Remove caracteres especiais de telefones, retornando apenas números.
 */
export function stripPhone(val: string | undefined | null): string {
  if (!val) return '';
  return String(val).replace(/\D/g, '').slice(0, 11);
}

/**
 * Sanitiza todos os campos de um RegistrationPayload antes de enviar para o backend,
 * garantindo que CNPJ, CEPs, telefones, valores monetários e datas fiquem livres
 * de caracteres especiais.
 */
export function sanitizePayloadForBackend(payload: RegistrationPayload): RegistrationPayload {
  const sanitized: RegistrationPayload = { ...payload };

  if (sanitized.cnpj) sanitized.cnpj = stripCnpj(sanitized.cnpj);
  if (sanitized.zipCode) sanitized.zipCode = stripCep(sanitized.zipCode);
  if (sanitized.financialZipCode) sanitized.financialZipCode = stripCep(sanitized.financialZipCode);
  if (sanitized.deliveryZipCode) sanitized.deliveryZipCode = stripCep(sanitized.deliveryZipCode);

  if (sanitized.phone) sanitized.phone = stripPhone(sanitized.phone);
  if (sanitized.mobilePhone) sanitized.mobilePhone = stripPhone(sanitized.mobilePhone);
  if (sanitized.financialPhone) sanitized.financialPhone = stripPhone(sanitized.financialPhone);
  if (sanitized.financialMobilePhone) sanitized.financialMobilePhone = stripPhone(sanitized.financialMobilePhone);
  if (sanitized.deliveryPhone) sanitized.deliveryPhone = stripPhone(sanitized.deliveryPhone);

  if (sanitized.representatives && Array.isArray(sanitized.representatives)) {
    sanitized.representatives = sanitized.representatives.map((rep: Representative) => ({
      ...rep,
      cpf: rep.cpf ? stripCpf(rep.cpf) : rep.cpf,
      phone: rep.phone ? stripPhone(rep.phone) : rep.phone,
    }));
  }

  if (sanitized.bankReferences && Array.isArray(sanitized.bankReferences)) {
    sanitized.bankReferences = sanitized.bankReferences.map((b: BankReference) => ({
      ...b,
      cnpj: b.cnpj ? stripCnpj(b.cnpj) : b.cnpj,
      fone: b.fone ? stripPhone(b.fone) : b.fone,
      phone: b.phone ? stripPhone(b.phone) : b.phone,
      informacoesData: b.informacoesData ? stripDate(b.informacoesData) : b.informacoesData,
    }));
  }

  if (sanitized.commercialReferences && Array.isArray(sanitized.commercialReferences)) {
    sanitized.commercialReferences = sanitized.commercialReferences.map((ref: CommercialReference) => ({
      ...ref,
      cnpj: ref.cnpj ? stripCnpj(ref.cnpj) : ref.cnpj,
      phone: ref.phone ? stripPhone(ref.phone) : ref.phone,
      clienteDesde: ref.clienteDesde ? stripDate(ref.clienteDesde) : ref.clienteDesde,
      maiorFaturaData: ref.maiorFaturaData ? stripDate(ref.maiorFaturaData) : ref.maiorFaturaData,
      ultimaFaturaData: ref.ultimaFaturaData ? stripDate(ref.ultimaFaturaData) : ref.ultimaFaturaData,
      informacoesData: ref.informacoesData ? stripDate(ref.informacoesData) : ref.informacoesData,
      mediasMensalValor: ref.mediasMensalValor ? stripCurrency(ref.mediasMensalValor) : ref.mediasMensalValor,
      maiorFaturaValor: ref.maiorFaturaValor ? stripCurrency(ref.maiorFaturaValor) : ref.maiorFaturaValor,
      ultimaFaturaValor: ref.ultimaFaturaValor ? stripCurrency(ref.ultimaFaturaValor) : ref.ultimaFaturaValor,
      debitosVencidos: ref.debitosVencidos ? stripCurrency(ref.debitosVencidos) : ref.debitosVencidos,
      debitosVencer: ref.debitosVencer ? stripCurrency(ref.debitosVencer) : ref.debitosVencer,
      limiteCredito: ref.limiteCredito ? stripCurrency(ref.limiteCredito) : ref.limiteCredito,
    }));
  }

  return sanitized;
}
