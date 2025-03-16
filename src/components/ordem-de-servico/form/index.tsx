/* eslint-disable indent */
import { RefObject, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { GeneralOSFormFields } from './fields/general'
import { ServicosOSFormFields } from './fields/servicos'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useMutate } from '@/hooks/mutate'
import { OrdemDeServicoForm as OrdemDeServicoFormType, ordemDeServicoFormSchema } from '@/schemas/os'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
}

export const OrdemDeServicoForm = ({ modalRef }: Props) => {
	const { create } = useMutate({
		endpoint: ENDPOINTS.CADASTRAR_OS,
		invalidateQueries: [[ENDPOINTS.OS]],
	})

	const form = useForm<OrdemDeServicoFormType>({
		resolver: zodResolver(ordemDeServicoFormSchema),
		values: {
			...getSchemaDefaults(ordemDeServicoFormSchema),
			dataEmissao: new Date(),
		},
	})

	const { reset } = form

	const onSubmit = useCallback(
		async (params: OrdemDeServicoFormType) => {
			closeModal(modalRef)()
			reset()

			await create({
				body: params,
				successMessage: 'Ordem de serviço cadastrado com sucesso!',
			})
		},
		[modalRef]
	)

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title={'Cadastrar Ordem de serviço'}
				width={theme.spacing(100)}
				steps={[
					{
						label: 'Geral',
						fields: ['numero', 'descricao', 'funcionarioResponsavel.id', 'cliente.id'],
						component: <GeneralOSFormFields />,
					},
					{
						label: 'Servicos',
						fields: ['servicosRealizados'],
						component: <ServicosOSFormFields />,
					},
				]}
			/>
		</FormProvider>
	)
}
