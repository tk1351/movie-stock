import { atom } from 'recoil'

export interface Auth {
  accessToken: string
  user: {
    id: number
    name: string
    role: 'user' | undefined
  }
}

export const authState = atom<Auth>({
  key: 'authState',
  default: {
    accessToken: '',
    user: {
      id: 0,
      name: '',
      role: undefined,
    },
  },
})
