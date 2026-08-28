export async function fetchCompanyByCnpj(cnpj: string) {
  const cleanCnpj = cnpj.replace(/\D/g, '');
  const response = await fetch(`https://publica.cnpj.ws/cnpj/${cleanCnpj}`);
  return response.json();
}
