export const validateCPF = (cpf: string) => {
	if (!/^\d{11}$/.test(cpf)) return false // Garante que o CPF tem exatamente 11 números
	if (/^(\d)\1{10}$/.test(cpf)) return false // Verifica se todos os dígitos são iguais

	let sum = 0,
		rest
	for (let i = 1; i <= 9; i++) sum += Number.parseInt(cpf[i - 1]) * (11 - i)
	rest = (sum * 10) % 11
	if (rest === 10 || rest === 11) rest = 0
	if (rest !== Number.parseInt(cpf[9])) return false

	sum = 0
	for (let i = 1; i <= 10; i++) sum += Number.parseInt(cpf[i - 1]) * (12 - i)
	rest = (sum * 10) % 11
	if (rest === 10 || rest === 11) rest = 0

	return rest === Number.parseInt(cpf[10])
}
