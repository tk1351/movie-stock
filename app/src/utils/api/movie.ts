import { setAuthToken } from './setAuthToken'
import API, { offset, limit } from '../api/api'
import { IMovie } from '../../../types/movie'

export const fetchMoviesByUser = async (
  accessToken: string
): Promise<IMovie[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${offset}&limit=${limit}`
  const res = await API.get<IMovie[]>(url)
  return res.data
}

export const fetchMovieById = async (
  accessToken: string,
  id: number
): Promise<IMovie> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/me/${id}`
  const res = await API.get<IMovie>(url)
  return res.data
}

export const fetchWatchedNumber = async (
  accessToken: string
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/length`
  const res = await API.get<number>(url)
  return res.data
}

export const fetchMoviesByCrew = async (
  accessToken: string,
  name: string
): Promise<IMovie[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?name=${encodeURI(
    name
  )}&offset=${offset}&limit=${limit}`
  const res = await API.get<IMovie[]>(url)
  return res.data
}

export const fetchWatchedNumberByCrew = async (
  accessToken: string,
  name: string
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/movies/length?name=${encodeURI(name)}`
  const res = await API.get<number>(url)
  return res.data
}
