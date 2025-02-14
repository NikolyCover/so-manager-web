import { Customer, Location } from '@carbon/icons-react'
import { ToggleButton } from '@mui/material'
import { useAtomValue } from 'jotai'
import { useLocation, useNavigate } from 'react-router-dom'

import { SidebarContainer, StyledToggleButtonGroup } from './style'
import { isSidebarCollapsedAtom } from '@/atoms/sidebar'

export const Sidebar = () => {
	const isCollapsed = useAtomValue(isSidebarCollapsedAtom)

	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleChange = (_e: unknown, value: string) => {
		if (value === null) {
			navigate(`/${pathname.split('/')[1]}`)
		} else {
			navigate(`/${value}`)
		}
	}

	return (
		<SidebarContainer iscollapsed={isCollapsed ? 1 : 0}>
			<StyledToggleButtonGroup
				orientation="vertical"
				exclusive
				fullWidth
				value={pathname.split('/')[1]}
				onChange={handleChange}
			>
				<ToggleButton value="clients">
					<Customer />
					{!isCollapsed && 'Clientes'}
				</ToggleButton>
				<ToggleButton value="addresses">
					<Location />
					{!isCollapsed && 'Endereços'}
				</ToggleButton>
			</StyledToggleButtonGroup>
		</SidebarContainer>
	)
}
