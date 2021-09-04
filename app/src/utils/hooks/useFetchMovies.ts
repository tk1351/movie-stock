import { useState, useEffect } from 'react'
import {
  useRecoilStateLoadable,
  useRecoilState,
  useRecoilValueLoadable,
  Loadable,
  useRecoilValue,
} from 'recoil'
import { moviesState, watchedState } from '../../../recoil/atoms/movie'
import { authState } from '../../../recoil/atoms/auth'
import API, { offset, limit } from '../api/api'
import { setAuthToken } from '../api/setAuthToken'
import { IMovie } from '../../../types/movie'
import { sortState } from '../../../recoil/atoms/sort'

type UseFetchMoviesCategory =
  | 'tag'
  | 'studio'
  | 'country'
  | 'title'
  | 'release'
  | 'time'

interface UseFetchMovies {
  category: UseFetchMoviesCategory
  query?: string
  number?: { begin: number; end: number }
}

export type UseFetchMoviesReturnType = [Loadable<IMovie[]>, number, boolean]

export const useFetchMovies = ({
  category,
  query,
  number,
}: UseFetchMovies): UseFetchMoviesReturnType => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const sort = useRecoilValue(sortState)

  const [isLoading, setIsLoading] = useState(true)

  const fetchMoviesAndLength = async (url: string) => {
    setAuthToken(accessToken.contents.accessToken)
    const res = await API.get<[IMovie[], number]>(url)

    const movies = res.data[0]
    const length = res.data[1]

    setMovies(movies)
    setWatched(length)
    setIsLoading(false)
  }

  const switchUrl = (category: UseFetchMoviesCategory) => {
    switch (category) {
      case 'title':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?title=${encodeURI(
          String(query)
        )}&offset=${offset}&limit=${limit}&${sort.query}=${sort.order}`

      case 'tag':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
          String(query)
        )}&offset=${offset}&limit=${limit}&${sort.query}=${sort.order}`

      case 'studio':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?studio=${encodeURI(
          String(query)
        )}&offset=${offset}&limit=${limit}&${sort.query}=${sort.order}`

      case 'country':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?country=${encodeURI(
          String(query)
        )}&offset=${offset}&limit=${limit}&${sort.query}=${sort.order}`

      case 'release':
        return `${
          process.env.NEXT_PUBLIC_API_URL
        }/movies/release/decade/${String(
          query
        )}?offset=${offset}&limit=${limit}&${sort.query}=${sort.order}`

      case 'time':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies/time?begin=${number?.begin}&end=${number?.end}&offset=${offset}&limit=${limit}&${sort.query}=${sort.order}`

      default:
        return ''
    }
  }

  useEffect(() => {
    if (accessToken.state === 'hasValue') {
      const url = switchUrl(category)
      fetchMoviesAndLength(url)
    }
  }, [accessToken])

  return [movies, watched, isLoading]
}
