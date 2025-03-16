import { useEffect } from 'react'

import { Add, Close } from '@carbon/icons-react'
import { Button, Stack } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { IconButton } from '@/components/ui/inputs/icon-button'
import ControlledSelect from '@/components/ui/inputs/select/controlled'
import ControlledTextField from '@/components/ui/inputs/text-field'
import { ENDPOINTS } from '@/constants/endpoints'
import { useGetAll } from '@/hooks/get'
import { OrdemDeServicoForm } from '@/schemas/os'
import { TipoServico } from '@/schemas/servico'

export const ServicosOSFormFields = () => {
	const { control } = useFormContext<OrdemDeServicoForm>()

	const { data: tiposServicos } = useGetAll<TipoServico>({ endpoint: ENDPOINTS.TIPO_SERVICO })

	const {
		fields: emailsFields,
		remove,
		append,
	} = useFieldArray({
		control,
		name: 'servicosRealizados',
	})

	const addServico = () =>
		append({
			tipoServico: {
				id: '' as unknown as number,
			},
			valorCobrado: '' as unknown as number,
		})

	useEffect(() => {
		if (emailsFields.length === 0) addServico()
	}, [emailsFields])

	return (
		<Stack gap={3}>
			{emailsFields.map((_field, index) => (
				<Stack key={uuidv4()} direction="row" gap={3}>
					<ControlledSelect
						control={control}
						name={`servicosRealizados.${index}.tipoServico.id`}
						label="Tipo de serviço"
						items={tiposServicos.map((tipo) => ({
							label: tipo.nome,
							value: tipo.id,
						}))}
					/>

					<ControlledTextField
						control={control}
						name={`servicosRealizados.${index}.valorCobrado`}
						label="Valor cobrado"
						type="number"
					/>

					<IconButton size="small" onClick={() => remove(index)}>
						<Close size={24} />
					</IconButton>
				</Stack>
			))}

			<Button variant="outlined" onClick={addServico} startIcon={<Add />}>
				Adicionar
			</Button>
		</Stack>
	)
}
