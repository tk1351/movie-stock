import { atom } from 'recoil'

export interface IAlert {
  msg: string
  alertType: 'succeeded' | 'failed' | undefined
  open: boolean
}

export const alertState = atom<IAlert>({
  key: 'alertState',
  default: {
    msg: '',
    alertType: undefined,
    open: false,
  },
})
