import { setAuthToken } from './setAuthToken'
import API from '../api/api'
import { IMovie, ICrew } from '../../../types/movie'

const offset: number = 0
const limit: number = 30

export const fetchMovies = async (accessToken: string): Promise<IMovie[]> => {
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

export const fetchMoviesByTag = async (
  accessToken: string,
  tag: string
): Promise<IMovie[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
    tag
  )}&offset=${offset}&limit=${limit}`
  const res = await API.get<IMovie[]>(url)
  return res.data
}

export const fetchWatchedNumberByTag = async (
  accessToken: string,
  tag: string
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/length?tag=${encodeURI(
    tag
  )}`
  const res = await API.get<number>(url)
  return res.data
}

export const fetchMoviesByCountry = async (
  accessToken: string,
  country: string
): Promise<IMovie[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?country=${encodeURI(
    country
  )}&offset=${offset}&limit=${limit}`
  const res = await API.get<IMovie[]>(url)
  return res.data
}

export const fetchWatchedNumberByCountry = async (
  accessToken: string,
  country: string
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/movies/length?country=${encodeURI(country)}`
  const res = await API.get<number>(url)
  return res.data
}

export const fetchMoviesByStudio = async (
  accessToken: string,
  studio: string
): Promise<IMovie[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?studio=${encodeURI(
    studio
  )}&offset=${offset}&limit=${limit}`
  const res = await API.get<IMovie[]>(url)
  return res.data
}

export const fetchWatchedNumberByStudio = async (
  accessToken: string,
  studio: string
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/movies/length?studio=${encodeURI(studio)}`
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

export const fetchCrews = async (
  accessToken: string,
  name: string
): Promise<ICrew[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/crews?name=${encodeURI(
    name
  )}&offset=${offset}&limit=${limit}`
  const res = await API.get<ICrew[]>(url)
  return res.data
}

export const fetchCrewsByCategory = async (
  accessToken: string,
  name: string,
  category: number
): Promise<ICrew[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/crews?name=${encodeURI(
    name
  )}&category=${category}&offset=${offset}&limit=${limit}`
  const res = await API.get<ICrew[]>(url)
  return res.data
}

export const fetchCrewsLength = async (
  accessToken: string,
  name: string
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/length?name=${encodeURI(
    name
  )}`
  const res = await API.get<number>(url)
  return res.data
}

export const fetchCrewsLengthByCategory = async (
  accessToken: string,
  name: string,
  category: number
): Promise<number> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/length?name=${encodeURI(
    name
  )}&category=${category}`
  const res = await API.get<number>(url)
  return res.data
}
