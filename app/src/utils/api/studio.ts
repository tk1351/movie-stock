import { StudiosRank } from '../../../types/movie'
import { setAuthToken } from './setAuthToken'
import API from '../api/api'

export const fetchStudiosRank = async (
  accessToken: string
): Promise<StudiosRank[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/studios/rank`
  const res = await API.get<StudiosRank[]>(url)
  return res.data
}
