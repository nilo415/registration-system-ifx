export interface BrasilApiCompany {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  cnae_fiscal_descricao: string | null;
  cep: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  municipio: string | null;
  uf: string | null;
  email: string | null;
  ddd_telefone_1: string | null;
  opcao_pelo_simples: boolean | null;
  opcao_pelo_mei: boolean | null;
  data_opcao_pelo_simples: string | null;
  data_exclusao_do_simples: string | null;
  data_opcao_pelo_mei: string | null;
  data_exclusao_do_mei: string | null;
}

export async function fetchCompanyByCnpj(cnpj: string): Promise<BrasilApiCompany> {
  const cleanCnpj = cnpj.replace(/\D/g, '');
  if (cleanCnpj.length !== 14) throw new Error('Enter a fourteen-digit CNPJ.');

  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`, {
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) {
    if (response.status === 404) throw new Error('CNPJ was not found.');
    throw new Error(`BrasilAPI request failed (${response.status}).`);
  }

  return (await response.json()) as BrasilApiCompany;
}
