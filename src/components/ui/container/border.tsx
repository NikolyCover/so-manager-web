import { PropsWithChildren } from 'react'

import { StackProps } from '@mui/material'

import { StyledContainer } from '.'

export const BorderContainer = ({ children, ...stackProps }: PropsWithChildren & StackProps) => {
	return (
		<StyledContainer sx={{ border: 'solid 1px #cecece' }} {...stackProps}>
			{children}
		</StyledContainer>
	)
}
