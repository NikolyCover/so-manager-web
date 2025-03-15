import { useEffect } from 'react'

import { Add, Close } from '@carbon/icons-react'
import { Button, IconButton, Stack } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { ClienteForm } from '@/schemas/cliente'
import { DDD, DDI } from '@/schemas/telefone'

export const PhonesClientFormFields = () => {
	const { control } = useFormContext<ClienteForm>()

	const { data: ddds } = useGetAll<DDD>({ endpoint: ENDPOINTS.DDD })
	const { data: ddis } = useGetAll<DDI>({ endpoint: ENDPOINTS.DDI })

	const {
		fields: phonesFields,
		remove,
		append,
	} = useFieldArray({
		control,
		name: 'telefones',
	})

	const addPhone = () =>
		append({
			ddd: '',
			ddi: '',
			numero: '',
		})

	useEffect(() => {
		if (phonesFields.length === 0) addPhone()
	}, [phonesFields])

	return (
		<Stack gap={3}>
			{phonesFields.map((_field, index) => (
				<Stack key={uuidv4()} direction="row" gap={3}>
					<ControlledSelect
						control={control}
						name={`telefones.${index}.ddi`}
						label="DDI"
						items={ddis.map((ddi) => ({
							label: ddi.numero,
							value: ddi.numero,
						}))}
					/>
					<ControlledSelect
						control={control}
						name={`telefones.${index}.ddd`}
						label="DDD"
						items={ddds.map((ddd) => ({
							label: ddd.numero,
							value: ddd.numero,
						}))}
					/>

					<ControlledTextField control={control} name={`telefones.${index}.numero`} label="Número" />

					<IconButton size="small" onClick={() => remove(index)}>
						<Close size={24} />
					</IconButton>
				</Stack>
			))}

			<Button variant="outlined" onClick={addPhone} startIcon={<Add />}>
				Adicionar
			</Button>
		</Stack>
	)
}
