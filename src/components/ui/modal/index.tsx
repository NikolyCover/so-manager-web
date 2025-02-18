import {
	ForwardRefRenderFunction,
	ReactNode,
	RefObject,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { Modal as MuiModal, Paper, Stack } from '@mui/material'

import { Text } from '../text'
import { theme } from '@/theme'

export interface ModalOptions {
	openModal: () => void
	closeModal: () => void
}

interface ModalProps {
	title?: string
	description?: string
	onClose?: () => void
	children: ReactNode
	width?: string
	noPadding?: true
}

const Modal: ForwardRefRenderFunction<ModalOptions, ModalProps> = (
	{ children, onClose, title, width, noPadding, description, ...other },
	ref
) => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = useCallback(() => {
		setIsOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		if (onClose) {
			onClose()
		}
		setIsOpen(false)
	}, [])

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
	}))

	return (
		<MuiModal
			open={isOpen}
			onClose={closeModal}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#282828BB' }}
			{...other}
		>
			<Paper sx={{ padding: theme.spacing(noPadding ? 0 : 2), borderRadius: 0, width, maxWidth: '80vw' }}>
				<Stack mb={2} gap={1}>
					{title && <Text variant="h1" message={title} />}
					{description && <Text message={description} />}
				</Stack>
				{children}
			</Paper>
		</MuiModal>
	)
}

export default forwardRef(Modal)

export const useModal = () => useRef<ModalOptions>(null) as RefObject<ModalOptions>

export const openModal = (ref: React.RefObject<ModalOptions>) => () => ref.current?.openModal()

export const closeModal = (ref: React.RefObject<ModalOptions>) => () => ref.current?.closeModal()
