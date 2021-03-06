import { atom } from 'recoil'
import { IWatchList } from '../../types/watchList'

export const watchListState = atom<IWatchList[]>({
  key: 'watchListState',
  default: [],
})

export const currentColumnState = atom<IWatchList | null>({
  key: 'currentColumnState',
  default: null,
})
