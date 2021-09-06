import { atom } from 'recoil'

export const scrollState = atom<boolean>({
  key: 'scrollState',
  default: true,
})
