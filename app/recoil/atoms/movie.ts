import { atom } from 'recoil'
import { IMovie } from '../../types/movie'

export const moviesState = atom<IMovie[]>({
  key: 'moviesState',
  default: [],
})

export const movieState = atom<IMovie>({
  key: 'movieState',
  default: {
    id: 0,
    title: '',
    release: 0,
    time: 0,
    rate: 0,
    userId: 0,
    countries: [],
    studios: [],
    crews: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
})

export const watchedState = atom<number>({
  key: 'watchedState',
  default: 0,
})
