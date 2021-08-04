import { atom } from 'recoil'

export interface Auth {
  accessToken: string
  userInfo: {
    id: number
    name: string
    role: 'user' | undefined
  }
}

export const authState = atom<Auth>({
  key: 'authState',
  default: {
    accessToken: '',
    userInfo: {
      id: 0,
      name: '',
      role: undefined,
    },
  },
})
