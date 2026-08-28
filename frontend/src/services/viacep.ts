export async function fetchAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, '');
  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  return response.json();
}
