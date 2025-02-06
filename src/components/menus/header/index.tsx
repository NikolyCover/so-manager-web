import { useCallback } from 'react'

import { ChevronLeft, ChevronRight } from '@carbon/icons-react'
import { IconButton, Stack } from '@mui/material'
import { useAtom } from 'jotai'

import { HeaderContainer } from './style'
import Logo from '@/assets/logo.svg?react'
import { isSidebarCollapsedAtom } from '@/atoms/sidebar'
import { theme } from '@/theme'

export const Header = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useAtom(isSidebarCollapsedAtom)

	const handleSidebarCollapse = useCallback(() => {
		setIsSidebarCollapsed((prev) => !prev)
	}, [])

	return (
		<HeaderContainer>
			<Stack direction="row" gap={2} alignItems="center">
				<IconButton onClick={handleSidebarCollapse}>
					{isSidebarCollapsed ? (
						<ChevronRight color="#309a96" size={theme.spacing(3)} />
					) : (
						<ChevronLeft color="#309a96" size={theme.spacing(3)} />
					)}
				</IconButton>

				<Logo width={100} height={40} />
			</Stack>
		</HeaderContainer>
	)
}
