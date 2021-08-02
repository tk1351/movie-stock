import { selector } from 'recoil'
import { alertState, IAlert } from '../atoms/alert'

export const setAlertState = selector<IAlert>({
  key: 'setAlertState',
  get: ({ get }) => get(alertState),
  set: ({ set }, newAlert) => set(alertState, newAlert),
})

export const removeAlertState = selector<IAlert>({
  key: 'removeAlertState',
  get: ({ get }) => get(setAlertState),
  set: ({ reset }) => reset(setAlertState),
})
