import { RefObject, useMemo } from 'react'

import { ArrowDown, ArrowUp, ArrowsVertical } from '@carbon/icons-react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Column } from '@tanstack/react-table'

import { IconButton } from '@/components/ui/inputs/icon-button'
import Popover, { PopoverOptions, openPopover, usePopover } from '@/components/ui/popover'
import { ASC, DESC, useSorting } from '@/hooks/sorting'

export interface HeaderButtonProps<T> {
	column: Column<T, unknown>
}

const SortingButton = <T extends object>({ column }: HeaderButtonProps<T>) => {
	const sortingPopover = usePopover()
	const { changeSorting, getIsSortedBy, sortingType } = useSorting()

	const isSortedByThisColumn = useMemo(() => getIsSortedBy(column.id), [getIsSortedBy, column])

	return (
		<>
			<IconButton
				size="small"
				onClick={(e) => openPopover(sortingPopover as RefObject<PopoverOptions>)(e.currentTarget)}
			>
				{isSortedByThisColumn && (
					<>
						{sortingType == 'ASC' && <ArrowDown />}
						{sortingType == 'DESC' && <ArrowUp />}
					</>
				)}

				{!isSortedByThisColumn && <ArrowsVertical />}
			</IconButton>
			<Popover ref={sortingPopover} title="Ordenação">
				{
					<ToggleButtonGroup
						orientation="vertical"
						value={isSortedByThisColumn && sortingType}
						onChange={(_, value) => {
							changeSorting(column.id, value)
						}}
						exclusive
					>
						<ToggleButton value={ASC}>
							<ArrowDown />
							Crescente
						</ToggleButton>
						<ToggleButton value={DESC}>
							<ArrowUp />
							Decrescente
						</ToggleButton>
					</ToggleButtonGroup>
				}
			</Popover>
		</>
	)
}

export default SortingButton
