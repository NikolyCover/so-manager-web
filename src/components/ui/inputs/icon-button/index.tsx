import { IconButtonProps, IconButton as MuiIconButton, Tooltip } from '@mui/material'

interface Props {
	tooltip?: string
}

export const IconButton = ({ tooltip, children, ...props }: Props & IconButtonProps) => {
	return tooltip ? (
		<Tooltip title={tooltip}>
			<MuiIconButton {...props}>{children}</MuiIconButton>
		</Tooltip>
	) : (
		<MuiIconButton {...props}>{children}</MuiIconButton>
	)
}
