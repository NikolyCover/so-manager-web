import { Typography, TypographyProps } from '@mui/material'

interface Props extends TypographyProps {
	message: string
}

export const Text = ({ message, ...props }: Props) => {
	return <Typography {...props}>{message}</Typography>
}
