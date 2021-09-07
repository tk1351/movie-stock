import { useState, useMemo } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import debounce from 'lodash.debounce'
import { authState } from '../../../recoil/atoms/auth'
import { setAuthToken } from '../api/setAuthToken'
import API, { limit, offset } from '../api/api'
import { CrewsFilter, StudiosRank, IMovie } from '../../../types/movie'

interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  cancel(): void
  flush(): ReturnType<T> | undefined
}

type useAutoCompleteHandleChangeReturnType = {
  crewsSuggestions: CrewsFilter[]
  studiosSuggestions: StudiosRank[]
  moviesSuggestions: IMovie[]
  debouncedTitleSuggestions: DebouncedFunc<
    (category: 'title', query: string) => Promise<void>
  >
  debouncedCrewsSuggestions: DebouncedFunc<
    (category: 'crews', query: string) => Promise<void>
  >
  debouncedStudiosSuggestions: DebouncedFunc<
    (category: 'studios', query: string) => Promise<void>
  >
}

type AutoCompleteCategory = 'crews' | 'studios' | 'title'

export const useAutoCompleteHandleChange = (): useAutoCompleteHandleChangeReturnType => {
  const [crewsSuggestions, setCrewsSuggestions] = useState<CrewsFilter[]>([]),
    [studiosSuggestions, setStudiosSuggestions] = useState<StudiosRank[]>([]),
    [moviesSuggestions, setMoviesSuggestions] = useState<IMovie[]>([])

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

  const getTitleSuggestions = async (category: 'title', query: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<[IMovie[], number]>(switchUrl(category, query))

      const movies = res.data[0]
      setMoviesSuggestions(movies)
    }
  }

  const getCrewsSuggestions = async (category: 'crews', query: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<CrewsFilter[]>(switchUrl(category, query))
      setCrewsSuggestions(res.data)
    }
  }

  const getStudiosSuggestions = async (category: 'studios', query: string) => {
    if (isAuth.state === 'hasValue') {
      setAuthToken(isAuth.contents.accessToken)
      const res = await API.get<StudiosRank[]>(switchUrl(category, query))
      setStudiosSuggestions(res.data)
    }
  }

  const debouncedTitleSuggestions = useMemo(
    () =>
      debounce(
        (category: 'title', query: string) =>
          getTitleSuggestions(category, query),
        1000
      ),
    []
  )

  const debouncedCrewsSuggestions = useMemo(
    () =>
      debounce(
        (category: 'crews', query: string) =>
          getCrewsSuggestions(category, query),
        1000
      ),
    []
  )

  const debouncedStudiosSuggestions = useMemo(
    () =>
      debounce(
        (category: 'studios', query: string) =>
          getStudiosSuggestions(category, query),
        1000
      ),
    []
  )

  return {
    crewsSuggestions,
    studiosSuggestions,
    moviesSuggestions,
    debouncedCrewsSuggestions,
    debouncedStudiosSuggestions,
    debouncedTitleSuggestions,
  }
}
