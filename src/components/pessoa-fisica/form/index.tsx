/* eslint-disable indent */
import { RefObject, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { EmailsPessoaFisicaFormFields } from './fields/emails'
import { EnderecoPessoaFisicaFormFields } from './fields/endereco'
import { GeneralPessoaFisicaFormFields } from './fields/general'
import { TelefonesPessoaFisicaFormFields } from './fields/telefones'
import { ModalOptions, closeModal } from '@/components/ui/modal'
import ModalForm from '@/components/ui/modal-form'
import { ENDPOINTS } from '@/constants/endpoints'
import { useMutate } from '@/hooks/mutate'
import { ClienteForm as ClientFormType, clienteFormSchema } from '@/schemas/cliente'
import { theme } from '@/theme'
import { getSchemaDefaults } from '@/utils/get-schema-defaults'

interface Props {
	modalRef: RefObject<ModalOptions>
	type: 'client' | 'funcionario'
}

const PessoaFisicaForm = ({ modalRef, type }: Props) => {
	const { create } = useMutate({
		endpoint: type == 'client' ? ENDPOINTS.CADASTRAR_CLIENTE : ENDPOINTS.CADASTRAR_FUNCIONARIO,
		invalidateQueries: [[ENDPOINTS.CLIENTE], [ENDPOINTS.FUNCIONARIO]],
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
				successMessage:
					type == 'client' ? 'Cliente cadastrado com sucesso!' : 'Funcionario cadastrado com sucesso!',
			})
		},
		[modalRef, type]
	)

	return (
		<FormProvider {...form}>
			<ModalForm
				modalRef={modalRef}
				onSubmit={onSubmit}
				title={type == 'client' ? 'Cadastrar Cliente' : 'Cadastrar Funcionario'}
				width={theme.spacing(100)}
				steps={[
					{
						label: 'Geral',
						fields: ['primeiroNome', 'nomeDoMeio', 'ultimoNome', 'nomeSocial', 'cpf'],
						component: <GeneralPessoaFisicaFormFields />,
					},
					{
						label: 'Endereço',
						fields: ['idEndereco', 'numeroEndereco', 'complementoEndereco'],
						component: <EnderecoPessoaFisicaFormFields />,
					},
					{
						label: 'Telefones',
						fields: ['telefones'],
						component: <TelefonesPessoaFisicaFormFields />,
					},
					{
						label: 'Emails',
						fields: ['emails'],
						component: <EmailsPessoaFisicaFormFields />,
					},
				]}
			/>
		</FormProvider>
	)
}

export default PessoaFisicaForm
