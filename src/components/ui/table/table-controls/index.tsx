import { ReactNode } from 'react'

import { Skeleton, Stack, StackProps } from '@mui/material'

import CleanFiltersButton from './clean-filters-button'

interface TableControlsProps extends StackProps {
	endControls?: ReactNode
	isLoading?: boolean
}

export const TableControls = ({ endControls, isLoading }: TableControlsProps) => {
	if (isLoading) {
		return (
			<Stack direction="row" justifyContent="space-between" gap={1}>
				<Stack direction="row" gap={1}>
					<CleanFiltersButton />
				</Stack>

				<Skeleton
					variant="rectangular"
					sx={{ height: (theme) => theme.spacing(4), width: (theme) => theme.spacing(40) }}
				/>
			</Stack>
		)
	}

	return (
		<Stack direction="row" justifyContent="space-between" gap={1}>
			<CleanFiltersButton />

			{endControls}
		</Stack>
	)
}

export default TableControls
