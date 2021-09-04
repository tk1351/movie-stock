import { atom } from 'recoil'

export interface SortType {
  query: 'rate' | 'release' | 'movieId'
  order: 'ASC' | 'DESC'
}

export const sortState = atom<SortType>({
  key: 'sortState',
  default: {
    query: 'movieId',
    order: 'DESC',
  },
})
