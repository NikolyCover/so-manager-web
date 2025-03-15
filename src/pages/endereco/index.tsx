import { useParams } from 'react-router-dom'

import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Endereco } from '@/schemas/endereco'

const AddressPage = () => {
	const { addressId } = useParams()

	const { data: endereco, isLoading } = useGetBy<Endereco>({
		endpoint: ENDPOINTS.ENDERECO,
		id: addressId ?? '',
	})

	if (isLoading) return <FullHeightLoading />

	if (!endereco) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>Endereço</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Field label="CEP">{endereco.cep}</Field>

				<Field label="Logradouro">{`${endereco.logradouro.tipoLogradouro.nome} ${endereco.logradouro.nome}`}</Field>

				<Field label="Bairro">{endereco.bairro.nome}</Field>

				<Field label="Cidade">{endereco.cidade.nome}</Field>

				<Field label="Unidade Federativa">{`${endereco.cidade.unidadeFederativa.nome} (${endereco.cidade.unidadeFederativa.sigla})`}</Field>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AddressPage
