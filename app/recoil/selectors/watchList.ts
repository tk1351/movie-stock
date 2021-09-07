import { selector } from 'recoil'
import { watchListState } from '../atoms/watchList'
import { IWatchList } from '../../types/watchList'

export const watchListSelector = selector<IWatchList[]>({
  key: 'watchListSelector',
  get: ({ get }) => get(watchListState),
  set: ({ set }, watchListData) => set(watchListState, watchListData),
})
