import PessoaFisicaForm from '@/components/pessoa-fisica/form'
import { PessoaFisicaTable } from '@/components/pessoa-fisica/table'
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
				<PessoaFisicaTable type="client" />

				<PessoaFisicaForm modalRef={modalRef} type="client" />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default ClientsPage
