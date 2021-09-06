import { atom } from 'recoil'

export interface SortType {
  sort: 'rate' | 'release' | 'movieId'
  order: 'ASC' | 'DESC'
}

export const sortState = atom<SortType>({
  key: 'sortState',
  default: {
    sort: 'movieId',
    order: 'DESC',
  },
})
