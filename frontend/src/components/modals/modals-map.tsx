import { ModalKeys } from '@/slices/modal-slice'

export const modalsMap: { [key in ModalKeys]: React.FC<any> } = {
  editDeposit: () => <div>edit deposit</div>,
  editMoveSize: () => <div>edit deposit</div>,
  editPacking: () => <div>edit deposit</div>,
  extraStop: () => <div>edit deposit</div>,
  closeRequest: () => <div>edit deposit</div>
}
