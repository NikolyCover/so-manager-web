export const formatCPF = (cpf: string): string => {
	// eslint-disable-next-line unicorn/prefer-string-replace-all
	const cleanCPF = cpf.replace(/\D/g, '')

	if (cleanCPF.length !== 11) return cpf

	return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
