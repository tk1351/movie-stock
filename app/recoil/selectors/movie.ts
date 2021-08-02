import { selector } from 'recoil'
import { IMovie } from '../../types/movie'
import { moviesState } from '../atoms/movie'

export const fetchMovies = selector<IMovie[]>({
  key: 'fetchMovies',
  get: ({ get }) => get(moviesState),
  set: ({ set }, moviesData) => set(moviesState, moviesData),
})
