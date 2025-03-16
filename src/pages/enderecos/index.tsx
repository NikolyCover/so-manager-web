import { OverviewSection } from './overview'
import { SearchCitySection } from './search-cidade'
import { SearchByZipCodeSection } from './search-por-cep'
import EnderecoForm from '@/components/endereco/form'
import { RegisterButton } from '@/components/ui/inputs/button/register'
import { openModal, useModal } from '@/components/ui/modal'
import { useSectionNavigation } from '@/hooks/section-navigation'
import { ViewLayout } from '@/layouts/view'
import { LabelValue } from '@/types/label-value'

type SectionName = 'overview' | 'search-by-zip-code' | 'search-city'

const AddressesPage = () => {
	const modalRef = useModal()

	const SECTIONS: LabelValue<SectionName>[] = [
		{
			label: 'Visão geral',
			value: 'overview',
		},
		{
			label: 'Busca por CEP',
			value: 'search-by-zip-code',
		},
		{
			label: 'Busca cidade',
			value: 'search-city',
		},
	]

	const { section } = useSectionNavigation(SECTIONS[0].value)

	return (
		<ViewLayout.Root>
			<ViewLayout.Header.Root>
				<ViewLayout.Header.Title>Endereços</ViewLayout.Header.Title>
				<ViewLayout.Header.RightElements>
					<RegisterButton onClick={openModal(modalRef)} />
				</ViewLayout.Header.RightElements>
			</ViewLayout.Header.Root>

			<ViewLayout.Sections sections={SECTIONS} />

			<ViewLayout.Content>
				{section == 'overview' && <OverviewSection />}
				{section == 'search-by-zip-code' && <SearchByZipCodeSection />}
				{section == 'search-city' && <SearchCitySection />}

				<EnderecoForm modalRef={modalRef} />
			</ViewLayout.Content>
		</ViewLayout.Root>
	)
}

export default AddressesPage
