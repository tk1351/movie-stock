import { useState, useEffect } from 'react'
import { useRecoilValueLoadable, Loadable } from 'recoil'
import API from '../api/api'
import { setAuthToken } from '../api/setAuthToken'
import { authState, Auth } from '../../../recoil/atoms/auth'
import { CrewsRank } from '../../../types/movie'

export type useFetchCrewsRankReturnType = [CrewsRank[], boolean, Loadable<Auth>]

export const useFetchCrewsRank = (
  category: number
): useFetchCrewsRankReturnType => {
  const [crewsRank, setCrewsRank] = useState<CrewsRank[]>([])
  const isAuth = useRecoilValueLoadable(authState)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuth.state === 'hasValue') {
      const fetchCrewsRankByCategory = async () => {
        setAuthToken(isAuth.contents.accessToken)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/crews/rank/${category}`
        const res = await API.get<CrewsRank[]>(url)
        setCrewsRank(res.data)
        setIsLoading(false)
      }
      fetchCrewsRankByCategory()
    }
  }, [isAuth])

  return [crewsRank, isLoading, isAuth]
}
