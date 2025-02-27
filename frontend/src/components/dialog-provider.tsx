import { useAppDispatch, useAppSelector } from '@/store'
import { closeModal } from '@/slices/modal-slice'
import { modalsMap } from './modals/modals-map'

export default function DialogProvider() {
  const dispatch = useAppDispatch()
  const { currentModal } = useAppSelector((state) => state.modal)

  const handleClose = () => {
    dispatch(closeModal())
  }

  if (!currentModal) return null

  // Find the appropriate dialog component from the map
  const DialogComponent = modalsMap[currentModal]

  if (!DialogComponent) return null // In case the dialog name doesn't match any component

  return <DialogComponent onClose={handleClose} />
}
