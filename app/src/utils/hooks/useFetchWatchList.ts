import { useState, useEffect } from 'react'
import {
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  Loadable,
} from 'recoil'
import { authState } from '../../../recoil/atoms/auth'
import { IWatchList } from '../../../types/watchList'
import { watchListState } from '../../../recoil/atoms/watchList'
import API, { offset, limit } from '../api/api'
import { setAuthToken } from '../api/setAuthToken'

type useFetchWatchListReturnType = [Loadable<IWatchList[]>, boolean]

export const useFetchWatchList = (): useFetchWatchListReturnType => {
  const accessToken = useRecoilValueLoadable(authState)
  const [data, setData] = useRecoilStateLoadable<IWatchList[]>(watchListState)

  const [isLoading, setIsLoading] = useState(true)

  const fetchWatchListAndLength = async (accessToken: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list?offset=${offset}&limit=${limit}`
    setAuthToken(accessToken)
    const res = await API.get<[IWatchList[], number]>(url)

    const watchList = res.data[0]

    setData(watchList)
    setIsLoading(false)
  }

  useEffect(() => {
    if (accessToken.state === 'hasValue') {
      fetchWatchListAndLength(accessToken.contents.accessToken)
    }
  }, [accessToken])

  return [data, isLoading]
}
