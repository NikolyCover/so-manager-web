/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Control, Controller, Path } from 'react-hook-form'

import Select, { TypeSelect } from '..'
import { LabelValue } from '@/types/label-value'

interface Props<T extends object> {
	control: Control<T>
	name: Path<T>
	items: LabelValue[]
}

type ControlledSelectProps<T extends object> = Props<T> & TypeSelect

const ControlledSelect = <T extends object>({ control, name, items, ...props }: ControlledSelectProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Select
					{...field}
					{...props}
					onChange={(e, child) => {
						props.onChange && props.onChange(e, child)
						field.onChange(e, child)
					}}
					items={items}
					error={!!error}
					helperText={error && error.message}
				/>
			)}
		/>
	)
}

export default ControlledSelect
