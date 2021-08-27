import { useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { authState } from '../../../recoil/atoms/auth'
import { setAuthToken } from '../api/setAuthToken'
import API, { limit, offset } from '../api/api'
import { CrewsFilter, StudiosRank } from '../../../types/movie'

export const useAutoCompleteHandleChange = () => {
  const [filterCrews, setFilterCrews] = useState<CrewsFilter[]>([]),
    [filterStudios, setFilterStudios] = useState<StudiosRank[]>([])

  const isAuth = useRecoilValueLoadable(authState)

  const switchUrl = (category: 'crews' | 'studios', value: string) => {
    switch (category) {
      case 'crews':
        return `${process.env.NEXT_PUBLIC_API_URL}/crews/filter?name=${value}&start=${offset}&limit=${limit}`

      case 'studios':
        return `${process.env.NEXT_PUBLIC_API_URL}/studios/filter?studio=${value}&start=${offset}&limit=${limit}`

      default:
        return ''
    }
  }

  const crewsHandleChange = async (category: 'crews', value: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<CrewsFilter[]>(switchUrl(category, value))
      setFilterCrews(res.data)
    }
  }

  const studiosHandleChange = async (category: 'studios', value: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<StudiosRank[]>(switchUrl(category, value))
      setFilterStudios(res.data)
    }
  }

  return { filterCrews, filterStudios, crewsHandleChange, studiosHandleChange }
}
