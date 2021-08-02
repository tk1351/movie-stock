import { selector } from 'recoil'
import { ICrew } from '../../types/movie'
import { crewsState } from '../atoms/crew'

export const fetchCrewsState = selector<ICrew[]>({
  key: 'fetchCrewsState',
  get: ({ get }) => get(crewsState),
  set: ({ set }, crewsData) => set(crewsState, crewsData),
})
