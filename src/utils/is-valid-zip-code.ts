// eslint-disable-next-line sonarjs/concise-regex
export const isValidZipCode = (cep: string) => /^[0-9]{5}-?[0-9]{3}$/.test(cep)
