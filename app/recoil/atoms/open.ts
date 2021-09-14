import { atom } from 'recoil'

export interface DialogStateReturnType {
  open: boolean
  category: 'edit' | 'delete' | undefined
}

export const dialogState = atom<DialogStateReturnType>({
  key: 'dialogState',
  default: {
    open: false,
    category: undefined,
  },
})

export const menuState = atom<null | HTMLElement>({
  key: 'menuState',
  default: null,
})
