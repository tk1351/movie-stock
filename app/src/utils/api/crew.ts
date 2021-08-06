import { setAuthToken } from './setAuthToken'
import API, { offset, limit } from '../api/api'
import { ICrew, CrewsRank } from '../../../types/movie'

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

export const fetchCrewsRankByCategory = async (
  accessToken: string,
  category: number
): Promise<CrewsRank[]> => {
  setAuthToken(accessToken)
  const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/rank/${category}`
  const res = await API.get<CrewsRank[]>(url)
  return res.data
}
