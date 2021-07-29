import { atom } from 'recoil'
import { IMovie } from '../types/movie'

export const moviesState = atom<IMovie[]>({
  key: 'moviesState',
  default: [],
})
