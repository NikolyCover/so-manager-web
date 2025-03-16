import { OrdemDeServicoForm } from '@/components/ordem-de-servico/form'
import { OrdemDeServicoTable } from '@/components/ordem-de-servico/table'
import { RegisterButton } from '@/components/ui/inputs/button/register'
import { openModal, useModal } from '@/components/ui/modal'
import { ViewLayout } from '@/layouts/view'

const OSPage = () => {
	const modalRef = useModal()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Ordens de serviço</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<RegisterButton onClick={openModal(modalRef)} />
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<OrdemDeServicoTable />

				<OrdemDeServicoForm modalRef={modalRef} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default OSPage
