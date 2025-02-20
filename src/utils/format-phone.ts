/* eslint-disable unicorn/prefer-string-replace-all */
export const formatPhone = (ddi: string, ddd: string, number: string): string => {
	const cleanDDI = ddi.replace(/\D/g, '')
	const cleanDDD = ddd.replace(/\D/g, '')
	const cleanNumber = number.replace(/\D/g, '')

	if (!/^\d{2,3}$/.test(cleanDDI) || !/^\d{2}$/.test(cleanDDD) || !/^\d{8,9}$/.test(cleanNumber)) {
		return `${ddi} (${ddd}) ${number}`
	}

	const formattedNumber =
		cleanNumber.length === 9
			? cleanNumber.replace(/(\d{5})(\d{4})/, '$1-$2')
			: cleanNumber.replace(/(\d{4})(\d{4})/, '$1-$2')

	return `+${cleanDDI} (${cleanDDD}) ${formattedNumber}`
}
