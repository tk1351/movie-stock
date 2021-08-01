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
  fetchWatchedNumberByStudio,
  fetchMoviesByStudio,
} from '../../src/utils/api/movie'
import MovieItem from './MovieItem'

interface StudiosPageProps {}

const Studios: NextPage<StudiosPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const studio = router.query.studio as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const moviesData = await fetchMoviesByStudio(
          accessToken.contents.accessToken,
          studio
        )
        const watchedNumber = await fetchWatchedNumberByStudio(
          accessToken.contents.accessToken,
          studio
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
      <h1>制作会社: {studio}の検索結果</h1>
      <p>{watched}件</p>
      {movies.state === 'hasValue' && <MovieItem movies={movies.contents} />}
    </div>
  )
}

export default Studios
