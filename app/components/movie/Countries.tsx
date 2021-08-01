import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilState,
  useRecoilStateLoadable,
} from 'recoil'
import { authState } from '../../atoms/auth'
import { moviesState, watchedState } from '../../atoms/movie'
import {
  fetchMoviesByCountry,
  fetchWatchedNumberByCountry,
} from '../../src/utils/api/movie'
import MovieItem from './MovieItem'

interface CountriesPageProps {}

const Countries: NextPage<CountriesPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const country = router.query.country as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const moviesData = await fetchMoviesByCountry(
          accessToken.contents.accessToken,
          country
        )
        const watchedNumber = await fetchWatchedNumberByCountry(
          accessToken.contents.accessToken,
          country
        )
        setMovies(moviesData)
        setWatched(watchedNumber)
      }
    })()
  }, [accessToken])

  if (movies.state === 'loading') return <p>Loading ...</p>
  if (movies.state === 'hasError') return <p>Error</p>

  return (
    <div>
      <h1>製作国: {country}の検索結果</h1>
      <p>{watched}件</p>
      {movies.state === 'hasValue' && <MovieItem movies={movies.contents} />}
    </div>
  )
}

export default Countries
