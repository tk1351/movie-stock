import { CountriesRank } from '../../../types/movie'
import { setAuthToken } from './setAuthToken'
import API from '../api/api'

export const fetchCountriesRank = async (
  accessToken: string
): Promise<CountriesRank[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/countries/rank`
  const res = await API.get<CountriesRank[]>(url)
  return res.data
}
