import { useCallback } from 'react'

import Modal, { ModalOptions, closeModal } from '..'
import { Text } from '../../text'
import { Buttons } from '@/components/ui/inputs/buttons'

interface Props {
	modalRef: React.RefObject<ModalOptions>
	title: string
	description?: string
	onConfirm: () => void
}

export const ConfirmationModal = ({ title, modalRef, description, onConfirm }: Props) => {
	const handleConfirm = useCallback(() => {
		onConfirm()
		closeModal(modalRef)()
	}, [onConfirm])

	return (
		<Modal ref={modalRef} title={title} width="496px">
			{description && <Text message={description} />}

			<Buttons
				secondary={{ onClick: closeModal(modalRef) }}
				primary={{ onClick: handleConfirm, label: 'form.confirm' }}
			/>
		</Modal>
	)
}
