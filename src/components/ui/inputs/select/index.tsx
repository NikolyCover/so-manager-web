/* eslint-disable sonarjs/no-nested-conditional */
import { ForwardRefRenderFunction, forwardRef } from 'react'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect, SelectProps } from '@mui/material'

import Loading from '../../feedback/loading'
import { InfoWarning } from '../../feedback/warning/info'
import { theme } from '@/theme'
import { LabelValue } from '@/types/label-value'

interface Props {
	items: LabelValue[]
	label?: string
	helperText?: string
	error?: boolean
	isLoading?: boolean
}

export type TypeSelect = Props & Omit<SelectProps, 'ref'>

const Select: ForwardRefRenderFunction<HTMLDivElement, TypeSelect> = (
	{ items, label, error, helperText, isLoading, ...props },
	ref
) => {
	const isItemsValid = Array.isArray(items) && items.some((item) => item.label && item.value)

	return (
		<FormControl fullWidth error={error}>
			<InputLabel htmlFor="select">{label}</InputLabel>

			<MuiSelect
				id="select"
				ref={ref}
				MenuProps={{
					PaperProps: {
						sx: {
							maxHeight: theme.spacing(20),
							display: isLoading || !isItemsValid ? 'flex' : '',
							justifyContent: isLoading || !isItemsValid ? 'center' : '',
							padding: theme.spacing(1),
						},
					},
				}}
				{...props}
			>
				{isLoading ? (
					<Loading minHeight={theme.spacing(5)} />
				) : isItemsValid ? (
					items.map((item) => (
						<MenuItem key={item.value} value={item.value}>
							{item.label}
						</MenuItem>
					))
				) : (
					<InfoWarning
						description="Não há dados para mostrar"
						textAlign="center"
						maxWidth={theme.spacing(30)}
					/>
				)}
			</MuiSelect>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	)
}

export default forwardRef(Select)
