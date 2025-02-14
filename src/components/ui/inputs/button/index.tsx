import { Button as MuiButton, ButtonProps as MuiButtonProps, Skeleton } from '@mui/material'

export interface ButtonProps extends MuiButtonProps {
	label: string
	isLoading?: boolean
}

export const Button = ({ label, isLoading = false, startIcon, ...buttonProps }: ButtonProps) => {
	if (isLoading) {
		return (
			<Skeleton
				variant="rectangular"
				sx={{ width: (theme) => theme.spacing(24), height: (theme) => theme.spacing(5) }}
			/>
		)
	}

	return (
		<MuiButton variant="outlined" size="medium" {...buttonProps} startIcon={!isLoading && startIcon}>
			{label}
		</MuiButton>
	)
}
