export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero?: string;
  erro?: boolean;
}

export async function fetchAddressByCep(cep: string): Promise<ViaCepAddress> {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) throw new Error('Enter an eight-digit postal code.');

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error(`ViaCEP request failed (${response.status}).`);

  const address = (await response.json()) as ViaCepAddress;
  if (address.erro === true) throw new Error('Postal code was not found.');
  return address;
}
