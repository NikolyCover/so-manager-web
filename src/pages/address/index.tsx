import { useParams } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Address } from '@/schemas/address'

const AddressPage = () => {
	const { addressId } = useParams()

	const { data: address, isLoading } = useGetBy<Address>({ endpoint: ENDPOINTS.ADDRESS, id: addressId ?? '' })

	if (isLoading) return <FullHeightLoading />

	if (!address) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>Endereço</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Field label="CEP">{address.zipCode}</Field>

				<Field label="Logradouro">{`${address.location.locationType.name} ${address.location.name}`}</Field>

				<Field label="Bairro">{address.neighborhood.name}</Field>

				<Field label="Cidade">{address.city.name}</Field>

				<Field label="Unidade Federativa">{`${address.city.federalUnit.name} (${address.city.federalUnit.abbreviation})`}</Field>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AddressPage
