/* eslint-disable @typescript-eslint/no-unused-expressions */
import { RefObject } from 'react'

import { Filter as FilterIcon } from '@carbon/icons-react'
import { Stack } from '@mui/material'

import TextFilter from '@/components/filters/text'
import { Button } from '@/components/ui/inputs/button'
import { IconButton } from '@/components/ui/inputs/icon-button'
import Popover, { PopoverOptions, openPopover, usePopover } from '@/components/ui/popover'
import { PRIMARY_COLOR } from '@/constants/color'
import { useFiltering } from '@/hooks/filter/filtering'
import { theme } from '@/theme'
import { Filter } from '@/types/filter-type'

export interface FilteringButtonProps {
	filter: Filter
}

const FilteringButton = ({ filter }: FilteringButtonProps) => {
	const filteringPopover = usePopover()
	const { cleanFilter, getIsFilteredBy } = useFiltering()

	const handleCleanFilters = () => {
		filter && cleanFilter(filter.id, false)
	}

	return (
		<>
			<IconButton
				size="small"
				onClick={(e) => openPopover(filteringPopover as RefObject<PopoverOptions>)(e.currentTarget)}
				tooltip="table.filtering.filter"
			>
				<FilterIcon color={getIsFilteredBy(filter.id) ? PRIMARY_COLOR : undefined} />
			</IconButton>

			<Popover ref={filteringPopover} title="table.filtering.filters">
				{filter && <TextFilter filter={filter} />}
				<Stack direction="row" gap={1} marginTop={theme.spacing(2)}>
					<Button variant="text" fullWidth onClick={handleCleanFilters} label="table.filtering.clean" />
				</Stack>
			</Popover>
		</>
	)
}

export default FilteringButton
