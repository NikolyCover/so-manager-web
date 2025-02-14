import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, Path } from 'react-hook-form'

interface Props<T extends object> {
	control: Control<T>
	name: Path<T>
}

type ControlledTextFieldProps<T extends object> = Props<T> & TextFieldProps

const ControlledTextField = <T extends object>({ control, name, ...props }: ControlledTextFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					{...field}
					{...props}
					{...(props.type == 'number' && { onChange: (e) => field.onChange(+e.target?.value) })}
					error={!!error}
					helperText={error && error.message}
					fullWidth
				/>
			)}
		/>
	)
}

export default ControlledTextField
