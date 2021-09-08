import { atom } from 'recoil'

export const watchListRegisterFormState = atom<boolean>({
  key: 'watchListRegisterFormState',
  default: false,
})
