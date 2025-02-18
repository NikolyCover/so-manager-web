import AddressForm from '@/components/address/form'
import { AddressTable } from '@/components/address/table'
import { RegisterButton } from '@/components/ui/inputs/button/register'
import { openModal, useModal } from '@/components/ui/modal'
import { ViewLayout } from '@/layouts/view'

const AddressesPage = () => {
	const modalRef = useModal()

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Endereços</ViewLayout.Header.Title>
				<RegisterButton onClick={openModal(modalRef)} />
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<AddressTable />

				<AddressForm modalRef={modalRef} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AddressesPage
