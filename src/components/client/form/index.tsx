/* eslint-disable indent */
import { RefObject, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { AddressClientFormFields } from './fields/address'
import { EmailsClientFormFields } from './fields/emails'
import { GeneralClientFormFields } from './fields/general'
import { PhonesClientFormFields } from './fields/phones'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useMutate } from '@/hooks/mutate'
import { ClienteForm as ClientFormType, clienteFormSchema } from '@/schemas/cliente'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
}

const ClientForm = ({ modalRef }: Props) => {
	const { create } = useMutate({
		endpoint: ENDPOINTS.CADASTRAR_CLIENTE,
	})

	const form = useForm<ClientFormType>({
		resolver: zodResolver(clienteFormSchema),
		values: getSchemaDefaults(clienteFormSchema),
	})

	const { reset } = form

	const onSubmit = useCallback(
		async (params: ClientFormType) => {
			closeModal(modalRef)()
			reset()

			await create({
				body: params,
				successMessage: 'Cliente cadastrado com sucesso!',
			})
		},
		[modalRef]
	)

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title="Cadastrar Cliente"
				width={theme.spacing(100)}
				steps={[
					{
						label: 'Geral',
						fields: ['primeiroNome', 'nomeDoMeio', 'ultimoNome', 'nomeSocial', 'cpf'],
						component: <GeneralClientFormFields />,
					},
					{
						label: 'Endereço',
						fields: ['idEndereco', 'numeroEndereco', 'complementoEndereco'],
						component: <AddressClientFormFields />,
					},
					{
						label: 'Telefones',
						fields: ['telefones'],
						component: <PhonesClientFormFields />,
					},
					{
						label: 'Emails',
						fields: ['emails'],
						component: <EmailsClientFormFields />,
					},
				]}
			/>
		</FormProvider>
	)
}

export default ClientForm
