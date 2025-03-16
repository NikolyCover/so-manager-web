/* eslint-disable indent */
import { RefObject, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import ControlledSelect from '../ui/inputs/select/controlled'
import ControlledTextField from '../ui/inputs/text-field'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { useMutate } from '@/hooks/mutate'
import { EnderecoForm as AddressFormType, Bairro, Cidade, Logradouro, enderecoFormSchema } from '@/schemas/endereco'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
}

const EnderecoForm = ({ modalRef }: Props) => {
	// const [federalUnitAbbreviation, setFederalUnitAbbreviation] = useState('')

	const { create } = useMutate({
		endpoint: ENDPOINTS.CADASTRAR_ENDERECO,
		invalidateQueries: [[ENDPOINTS.ENDERECO_EXTERNO], [ENDPOINTS.ENDERECO]],
	})

	const { data: locations } = useGetAll<Logradouro>({ endpoint: ENDPOINTS.LOGRADOURO })
	const { data: neighborhoods } = useGetAll<Bairro>({ endpoint: ENDPOINTS.BAIRRO })
	// const { data: federalUnits } = useGetAll<UnidadeFederativa>({ endpoint: ENDPOINTS.UNIDADE_FEDERATIVA })
	const { data: cities } = useGetAll<Cidade>({
		endpoint: ENDPOINTS.CIDADE,
		//requestParams: { federalUnitAbbreviation },
		//enabled: federalUnitAbbreviation != '',
	})

	const form = useForm<AddressFormType>({
		resolver: zodResolver(enderecoFormSchema),
		values: getSchemaDefaults(enderecoFormSchema),
	})

	const { reset } = form

	const onSubmit = useCallback(
		async (params: AddressFormType) => {
			closeModal(modalRef)()
			reset()

			await create({
				body: params,
				successMessage: 'Endereço cadastrado com sucesso!',
			})
		},
		[modalRef]
	)

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title="Cadastrar Endereço"
				width={theme.spacing(100)}
				//onClose={() => setFederalUnitAbbreviation('')}
			>
				<Stack gap={2}>
					<ControlledTextField control={form.control} name="cep" label="CEP" />

					<ControlledSelect
						control={form.control}
						name="logradouro.id"
						label="Logradouro"
						items={locations.map((location) => ({
							label: location.nome,
							value: location.id,
						}))}
					/>

					<ControlledSelect
						control={form.control}
						name="bairro.id"
						label="Bairro"
						items={neighborhoods.map((neighborhood) => ({
							label: neighborhood.nome,
							value: neighborhood.id,
						}))}
					/>

					{/* <Select
						label="Unidade Federativa"
						items={federalUnits.map((federalUnit) => ({
							label: federalUnit.nome,
							value: federalUnit.sigla,
						}))}
						value={federalUnitAbbreviation}
						onChange={(e) => setFederalUnitAbbreviation(e.target.value as string)}
					/> */}

					<ControlledSelect
						control={form.control}
						name="cidade.id"
						label="Cidade"
						items={cities.map((city) => ({
							label: city.nome,
							value: city.id,
						}))}
					/>
				</Stack>
			</ModalForm>
		</FormProvider>
	)
}

export default EnderecoForm
