import { useParams } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Endereco } from '@/schemas/endereco'
import { addressAPI } from '@/service/address'

const AddressPage = () => {
	const { addressId } = useParams()

	const { data: address, isLoading } = useGetBy<Endereco>({
		endpoint: ENDPOINTS.ADDRESS,
		id: addressId ?? '',
		api: addressAPI,
	})

	if (isLoading) return <FullHeightLoading />

	if (!address) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>Endereço</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Field label="CEP">{address.cep}</Field>

				<Field label="Logradouro">{`${address.logradouro.tipoLogradouro.nome} ${address.logradouro.nome}`}</Field>

				<Field label="Bairro">{address.bairro.nome}</Field>

				<Field label="Cidade">{address.cidade.nome}</Field>

				<Field label="Unidade Federativa">{`${address.cidade.unidadeFederativa.nome} (${address.cidade.unidadeFederativa.sigla})`}</Field>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AddressPage
