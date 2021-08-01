import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilState,
} from 'recoil'
import { authState } from '../../atoms/auth'
import { moviesState, watchedState } from '../../atoms/movie'
import {
  fetchMoviesByCrew,
  fetchWatchedNumberByCrew,
} from '../../src/utils/api/movie'
import MovieItem from './MovieItem'

interface CrewsPageProps {}

const Crews: NextPage<CrewsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const name = router.query.name as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const moviesData = await fetchMoviesByCrew(
          accessToken.contents.accessToken,
          name
        )
        const watchedNumber = await fetchWatchedNumberByCrew(
          accessToken.contents.accessToken,
          name
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
      <h1>スタッフ: {name}の検索結果</h1>
      <p>{watched}件</p>
      {movies.state === 'hasValue' && <MovieItem movies={movies.contents} />}
    </div>
  )
}

export default Crews
