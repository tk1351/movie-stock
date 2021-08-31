import { useState, useEffect } from 'react'
import {
  useRecoilStateLoadable,
  useRecoilState,
  useRecoilValueLoadable,
  Loadable,
} from 'recoil'
import { moviesState, watchedState } from '../../../recoil/atoms/movie'
import { authState } from '../../../recoil/atoms/auth'
import API, { offset, limit } from '../api/api'
import { setAuthToken } from '../api/setAuthToken'
import { IMovie } from '../../../types/movie'

type UseFetchMoviesCategory = 'tag' | 'studio' | 'country' | 'title'

interface UseFetchMovies {
  category: UseFetchMoviesCategory
  query: string
}

export type UseFetchMoviesReturnType = [Loadable<IMovie[]>, number, boolean]

export const useFetchMovies = ({
  category,
  query,
}: UseFetchMovies): UseFetchMoviesReturnType => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

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
        )}&offset=${offset}&limit=${limit}`

      case 'tag':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}`

      case 'studio':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?studio=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}`

      case 'country':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?country=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}`
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
