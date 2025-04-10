import { useParams } from 'react-router-dom'

import { PesosoaFisicaDetails } from '@/components/pessoa-fisica/details'
import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Cliente } from '@/schemas/cliente'

const CLientPage = () => {
	const { clientId } = useParams()

	const { data: cliente, isLoading } = useGetBy<Cliente>({
		endpoint: ENDPOINTS.CLIENTE,
		id: clientId ?? '',
	})

	if (isLoading) return <FullHeightLoading />

	if (!cliente) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>{`Cliente ${cliente.nome ?? ''}`}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<PesosoaFisicaDetails pessoa={cliente} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default CLientPage
