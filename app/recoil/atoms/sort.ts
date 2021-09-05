import { atom } from 'recoil'

export interface SortType {
  sort: 'rate' | 'release' | 'movieId'
  order: 'ASC' | 'DESC'
  query?: string
}

export const sortState = atom<SortType>({
  key: 'sortState',
  default: {
    sort: 'movieId',
    order: 'DESC',
    query: undefined,
  },
})
