import { useParams } from 'react-router-dom'

import { PesosoaFisicaDetails } from '@/components/pessoa-fisica/details'
import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { Funcionario } from '@/schemas/funcionario'

const FuncionarioPage = () => {
	const { funcionarioId } = useParams()

	const { data: funcionario, isLoading } = useGetBy<Funcionario>({
		endpoint: ENDPOINTS.FUNCIONARIO,
		id: funcionarioId ?? '',
	})

	if (isLoading) return <FullHeightLoading />

	if (!funcionario) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>{`Funcionario ${funcionario.nome ?? ''}`}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<PesosoaFisicaDetails pessoa={funcionario} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default FuncionarioPage
