import { useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { authState } from '../../../recoil/atoms/auth'
import { setAuthToken } from '../api/setAuthToken'
import API, { limit, offset } from '../api/api'
import { CrewsFilter, StudiosRank, IMovie } from '../../../types/movie'

type useAutoCompleteHandleChangeReturnType = {
  filterCrews: CrewsFilter[]
  filterStudios: StudiosRank[]
  filterMovies: IMovie[]
  crewsHandleChange: (category: 'crews', query: string) => Promise<void>
  studiosHandleChange: (category: 'studios', query: string) => Promise<void>
  titleHandleChange: (category: 'title', query: string) => Promise<void>
}

type AutoCompleteCategory = 'crews' | 'studios' | 'title'

export const useAutoCompleteHandleChange = (): useAutoCompleteHandleChangeReturnType => {
  const [filterCrews, setFilterCrews] = useState<CrewsFilter[]>([]),
    [filterStudios, setFilterStudios] = useState<StudiosRank[]>([]),
    [filterMovies, setFilterMovies] = useState<IMovie[]>([])

  const isAuth = useRecoilValueLoadable(authState)

  const switchUrl = (category: AutoCompleteCategory, query: string) => {
    switch (category) {
      case 'title':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?title=${query}&start=${offset}&limit=${limit}`

      case 'crews':
        return `${process.env.NEXT_PUBLIC_API_URL}/crews/filter?name=${query}&start=${offset}&limit=${limit}`

      case 'studios':
        return `${process.env.NEXT_PUBLIC_API_URL}/studios/filter?studio=${query}&start=${offset}&limit=${limit}`

      default:
        return ''
    }
  }

  const titleHandleChange = async (category: 'title', query: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<[IMovie[], number]>(switchUrl(category, query))

      const movies = res.data[0]
      setFilterMovies(movies)
    }
  }

  const crewsHandleChange = async (category: 'crews', query: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<CrewsFilter[]>(switchUrl(category, query))
      setFilterCrews(res.data)
    }
  }

  const studiosHandleChange = async (category: 'studios', query: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<StudiosRank[]>(switchUrl(category, query))
      setFilterStudios(res.data)
    }
  }

  return {
    filterCrews,
    filterStudios,
    filterMovies,
    crewsHandleChange,
    studiosHandleChange,
    titleHandleChange,
  }
}
