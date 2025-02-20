import ClientForm from '@/components/client/form'
import { ClientTable } from '@/components/client/table'
import { RegisterButton } from '@/components/ui/inputs/button/register'
import { openModal, useModal } from '@/components/ui/modal'
import { ViewLayout } from '@/layouts/view'

const ClientsPage = () => {
	const modalRef = useModal()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Clientes</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<RegisterButton onClick={openModal(modalRef)} />
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<ClientTable />

				<ClientForm modalRef={modalRef} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default ClientsPage
