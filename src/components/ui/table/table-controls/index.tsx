import { ReactNode } from 'react'

import { Stack, StackProps } from '@mui/material'

import CleanFiltersButton from './clean-filters-button'

interface TableControlsProps extends StackProps {
	endControls?: ReactNode
}

export const TableControls = ({ endControls }: TableControlsProps) => {
	return (
		<Stack direction="row" justifyContent="space-between" gap={1}>
			<CleanFiltersButton />

			{endControls}
		</Stack>
	)
}

export default TableControls
