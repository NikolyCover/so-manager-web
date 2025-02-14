import { DateTimePickerProps } from '@mui/x-date-pickers'
import { Control, Controller, Path, PathValue, useFormContext } from 'react-hook-form'

import DateTimePicker from '..'

interface Props<T extends object> extends DateTimePickerProps<Date> {
	control: Control<T>
	name: Path<T>
	clearable?: true
}

const ControlledDateTimePicker = <T extends object>({ control, name, clearable, ...props }: Props<T>) => {
	const { setValue } = useFormContext<T>()

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
				const { ref, ...rest } = field
				return (
					<DateTimePicker
						slotProps={{
							textField: {
								helperText: error && error.message,
								error: !!error,
							},
							...(clearable && {
								field: {
									clearable: true,
									onClear: () => setValue(name, null as PathValue<T, Path<T>>),
								},
							}),
						}}
						{...rest}
						{...props}
					/>
				)
			}}
		/>
	)
}

export default ControlledDateTimePicker
