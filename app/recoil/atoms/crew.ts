import { atom } from 'recoil'
import { ICrew } from '../../types/movie'

export const crewsState = atom<ICrew[]>({
  key: 'crewsState',
  default: [],
})
