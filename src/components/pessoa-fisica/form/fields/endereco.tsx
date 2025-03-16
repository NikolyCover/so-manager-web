import { useEffect } from 'react'

import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { ClienteForm } from '@/schemas/cliente'
import { Endereco } from '@/schemas/endereco'
import { formatCEP } from '@/utils/format-cep'

export const EnderecoPessoaFisicaFormFields = () => {
	const { control, watch, setValue } = useFormContext<ClienteForm>()
	const { data: enderecos } = useGetAll<Endereco>({ endpoint: ENDPOINTS.ENDERECO })

	const [primeiroNome, nomeDoMeio, ultimoNome] = watch(['primeiroNome', 'nomeDoMeio', 'ultimoNome'])

	useEffect(() => {
		setValue('nome', [primeiroNome, nomeDoMeio, ultimoNome].filter(Boolean).join(' '))
	}, [primeiroNome, nomeDoMeio, ultimoNome, setValue])

	return (
		<Stack gap={3}>
			<ControlledSelect
				control={control}
				name="endereco.endereco.id"
				label="Endereço"
				items={enderecos.map((add) => ({
					label: `${add.logradouro.tipoLogradouro.nome} ${add.logradouro.nome} - Bairro ${add.bairro.nome}, ${add.cidade.nome} - ${add.cidade.unidadeFederativa.sigla}, ${formatCEP(add.cep)}`,
					value: add.id,
				}))}
			/>
			<ControlledTextField control={control} name="endereco.numeroEndereco" label="Número" />
			<ControlledTextField control={control} name="endereco.complementoEndereco" label="Complemento" />
		</Stack>
	)
}
