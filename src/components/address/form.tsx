/* eslint-disable indent */
import { RefObject, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import Select from '../ui/inputs/select'
import ControlledSelect from '../ui/inputs/select/controlled'
import ControlledTextField from '../ui/inputs/text-field'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { useMutate } from '@/hooks/mutate'
import {
	AddressForm as AddressFormType,
	City,
	FederalUnit,
	Location,
	Neighborhood,
	addressFormSchema,
} from '@/schemas/address'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
}

const AddressForm = ({ modalRef }: Props) => {
	const [federalUnitAbbreviation, setFederalUnitAbbreviation] = useState('')

	const { create } = useMutate({
		endpoint: ENDPOINTS.ADDRESS,
	})

	const { data: locations } = useGetAll<Location>({ endpoint: ENDPOINTS.LOCATION })
	const { data: neighborhoods } = useGetAll<Neighborhood>({ endpoint: ENDPOINTS.NEIGHBORHOOD })
	const { data: federalUnits } = useGetAll<FederalUnit>({ endpoint: ENDPOINTS.FEDERAL_UNIT })
	const { data: cities } = useGetAll<City>({
		endpoint: ENDPOINTS.CITY,
		requestParams: { federalUnitAbbreviation },
		enabled: federalUnitAbbreviation != '',
	})

	const form = useForm<AddressFormType>({
		resolver: zodResolver(addressFormSchema),
		values: getSchemaDefaults(addressFormSchema),
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
				onClose={() => setFederalUnitAbbreviation('')}
			>
				<Stack gap={2}>
					<ControlledTextField control={form.control} name="zipCode" label="CEP" />

					<ControlledSelect
						control={form.control}
						name="locationId"
						label="Logradouro"
						items={locations.map((location) => ({
							label: location.name,
							value: location.id,
						}))}
					/>

					<ControlledSelect
						control={form.control}
						name="neighborhoodId"
						label="Bairro"
						items={neighborhoods.map((neighborhood) => ({
							label: neighborhood.name,
							value: neighborhood.id,
						}))}
					/>

					<Select
						label="Unidade Federativa"
						items={federalUnits.map((federalUnit) => ({
							label: federalUnit.name,
							value: federalUnit.abbreviation,
						}))}
						value={federalUnitAbbreviation}
						onChange={(e) => setFederalUnitAbbreviation(e.target.value as string)}
					/>

					<ControlledSelect
						control={form.control}
						name="cityId"
						label="Cidade"
						items={cities.map((city) => ({
							label: city.name,
							value: city.id,
						}))}
					/>
				</Stack>
			</ModalForm>
		</FormProvider>
	)
}

export default AddressForm
