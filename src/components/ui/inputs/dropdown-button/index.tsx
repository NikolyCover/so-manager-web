import { OverflowMenuVertical } from '@carbon/icons-react'
import { ButtonProps, MenuItem, MenuList } from '@mui/material'

import Popover, { openPopover, usePopover } from '../../popover'
import { Button } from '../button'
import { IconButton } from '../icon-button'

interface Options {
	label: string
	onClick: () => void
}

interface DropdownButtonProps extends Omit<ButtonProps, 'size' | 'title'> {
	title?: string
	options: Options[]
	size?: 'small' | 'medium'
}

const DropdownButton = ({ options, title, size = 'medium', ...other }: DropdownButtonProps) => {
	const popoverRef = usePopover()

	if (options.length === 0) return null

	return (
		<>
			{title && (
				<Button
					onClick={(e) => openPopover(popoverRef)(e.currentTarget)}
					label={title}
					size={size}
					{...other}
				/>
			)}
			{!title && (
				<IconButton onClick={(e) => openPopover(popoverRef)(e.currentTarget)} tooltip="options" {...other}>
					<OverflowMenuVertical size={size == 'small' ? 24 : 32} />
				</IconButton>
			)}
			<Popover ref={popoverRef} sx={{ padding: 0 }}>
				<MenuList>
					{options?.map((option) => (
						<MenuItem onClick={option.onClick} key={option.label.toString()} sx={{ minWidth: 120 }}>
							{option.label}
						</MenuItem>
					))}
				</MenuList>
			</Popover>
		</>
	)
}

export default DropdownButton
