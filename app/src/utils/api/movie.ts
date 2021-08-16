import { setAuthToken } from './setAuthToken'
import API, { offset, limit } from '../api/api'
import { IMovie } from '../../../types/movie'

export const fetchMoviesByUser = async (
  accessToken: string
): Promise<{ movies: IMovie[]; count: number }> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${offset}&limit=${limit}`
  const res = await API.get<[IMovie[], number]>(url)

  const movies = res.data[0]
  const count = res.data[1]

  return { movies, count }
}
