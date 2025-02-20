import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { ClienteForm } from '@/schemas/cliente'
import { Endereco } from '@/schemas/endereco'
import { addressAPI } from '@/service/address'
import { formatCEP } from '@/utils/format-cep'

export const AddressClientFormFields = () => {
	const { control } = useFormContext<ClienteForm>()
	const { data: addresses } = useGetAll<Endereco>({ endpoint: ENDPOINTS.ADDRESS, api: addressAPI })

	return (
		<Stack gap={3}>
			<ControlledSelect
				control={control}
				name="idEndereco"
				label="Endereço"
				items={addresses.map((add) => ({
					label: `${add.logradouro.locationType.nome} ${add.logradouro.nome} - Bairro ${add.bairro.nome}, ${add.cidade.nome} - ${add.cidade.unidadeFederativa.sigla}, ${formatCEP(add.cep)}`,
					value: add.id,
				}))}
			/>
			<ControlledTextField control={control} name="numeroEndereco" label="Número" />
			<ControlledTextField control={control} name="complementoEndereco" label="Complemento" />
		</Stack>
	)
}
