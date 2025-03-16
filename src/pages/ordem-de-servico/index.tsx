import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { PesosoaFisicaDetails } from '@/components/pessoa-fisica/details'
import { BorderContainer } from '@/components/ui/container/border'
import FullHeightLoading from '@/components/ui/feedback/loading/full-height'
import { Field } from '@/components/ui/field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetBy } from '@/hooks/get/get-by'
import { ViewLayout } from '@/layouts/view'
import { OrdemDeServico } from '@/schemas/os'
import { formatarDate } from '@/utils/format-date'

const OrdemDeServicoAddressPage = () => {
	const { osId } = useParams()

	const { data: os, isLoading } = useGetBy<OrdemDeServico>({
		endpoint: ENDPOINTS.OS,
		id: osId ?? '',
		idName: 'numero',
	})

	if (isLoading) return <FullHeightLoading />

	if (!os) return null

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title goBack>{`OS - ${os.numero}`}</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<Stack direction="row" gap={12}>
					<Field label="Data de emissão">{formatarDate(os.dataEmissao)}</Field>
					<Field label="Descrição">{os.descricao}</Field>
					<Field label="Valor total">{os.valorTotal}</Field>
				</Stack>

				<BorderContainer>
					<Typography variant="h2">Cliente</Typography>
					<PesosoaFisicaDetails pessoa={os.cliente} />
				</BorderContainer>

				<BorderContainer>
					<Typography variant="h2">Responsável pelo atendimento</Typography>
					<PesosoaFisicaDetails pessoa={os.funcionarioResponsavel} />
				</BorderContainer>

				<BorderContainer>
					<Typography variant="h2">Serviços Realizados</Typography>
					<Stack gap={2}>
						{os.servicosRealizados.map((servico) => (
							<BorderContainer key={servico.id} direction="row" gap={12}>
								<Field label={'Serviço'}>{servico.tipoServico.nome}</Field>
								<Field label="Valor cobrado">{servico.valorCobrado}</Field>
							</BorderContainer>
						))}
					</Stack>
				</BorderContainer>
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default OrdemDeServicoAddressPage
