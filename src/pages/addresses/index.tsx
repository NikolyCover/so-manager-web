import { AddressTable } from '@/components/address/table'
import { ViewLayout } from '@/layouts/view'

const AddressesPage = () => {
	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Endereços</ViewLayout.Header.Title>
			</ViewLayout.Header.Root>

			<ViewLayout.Content>
				<AddressTable />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AddressesPage
