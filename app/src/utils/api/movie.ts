import { setAuthToken } from './setAuthToken'
import API, { offset, limit } from '../api/api'
import { IMovie } from '../../../types/movie'
import { SortType } from '../../../recoil/atoms/sort'

export const fetchMoviesByUserId = async (
  accessToken: string,
  sort: SortType
): Promise<{ movies: IMovie[]; count: number }> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${offset}&limit=${limit}&${sort.sort}=${sort.order}`
  const res = await API.get<[IMovie[], number]>(url)

  const movies = res.data[0]
  const count = res.data[1]

  return { movies, count }
}

export const fetchMovieByUserId = async (
  accessToken: string,
  id: number
): Promise<IMovie> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/me/${id}`
  const res = await API.get<IMovie>(url)
  return res.data
}
