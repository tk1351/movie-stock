import { useState, useEffect } from 'react'
import {
  useRecoilStateLoadable,
  useRecoilState,
  useRecoilValueLoadable,
} from 'recoil'
import { moviesState, watchedState } from '../../../recoil/atoms/movie'
import { authState } from '../../../recoil/atoms/auth'
import API, { offset, limit } from '../api/api'
import { setAuthToken } from '../api/setAuthToken'
import { IMovie } from '../../../types/movie'

interface UseFetchMovies {
  category: 'tag' | 'studio' | 'country'
  query: string
}

export const useFetchMovies = ({ category, query }: UseFetchMovies) => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const [isLoading, setIsLoading] = useState(true)

  const fetchMoviesAndLength = async (url: {
    movieURL: string
    lengthURL: string
  }) => {
    setAuthToken(accessToken.contents.accessToken)
    const movies = await API.get<IMovie[]>(url.movieURL)
    const length = await API.get<number>(url.lengthURL)

    setMovies(movies.data)
    setWatched(length.data)
    setIsLoading(false)
  }

  const switchUrl = (
    category: 'tag' | 'studio' | 'country'
  ): { movieURL: string; lengthURL: string } => {
    switch (category) {
      case 'tag':
        return {
          movieURL: `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
            query
          )}&offset=${offset}&limit=${limit}`,
          lengthURL: `${
            process.env.NEXT_PUBLIC_API_URL
          }/movies/length?tag=${encodeURI(query)}`,
        }
      case 'studio':
        return {
          movieURL: `${
            process.env.NEXT_PUBLIC_API_URL
          }/movies?studio=${encodeURI(query)}&offset=${offset}&limit=${limit}`,
          lengthURL: `${
            process.env.NEXT_PUBLIC_API_URL
          }/movies/length?studio=${encodeURI(query)}`,
        }
      case 'country':
        return {
          movieURL: `${
            process.env.NEXT_PUBLIC_API_URL
          }/movies?country=${encodeURI(query)}&offset=${offset}&limit=${limit}`,
          lengthURL: `${
            process.env.NEXT_PUBLIC_API_URL
          }/movies/length?country=${encodeURI(query)}`,
        }
      default:
        return { movieURL: '', lengthURL: '' }
    }
  }

  useEffect(() => {
    if (accessToken.state === 'hasValue') {
      const url = switchUrl(category)
      fetchMoviesAndLength(url)
    }
  }, [accessToken])

  return [movies, watched, isLoading] as const
}
