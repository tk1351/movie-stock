import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useRecoilState,
} from 'recoil'
import { authState } from '../../atoms/auth'
import { moviesState, watchedState } from '../../atoms/movie'
import {
  fetchMoviesByTag,
  fetchWatchedNumberByTag,
} from '../../src/utils/api/movie'
import MovieItem from './MovieItem'

interface TagsPageProps {}

const Tags: NextPage<TagsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const tagText = router.query.tag as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const moviesData = await fetchMoviesByTag(
          accessToken.contents.accessToken,
          tagText
        )
        const watchedNumber = await fetchWatchedNumberByTag(
          accessToken.contents.accessToken,
          tagText
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
      <h1>タグ: {tagText}の検索結果</h1>
      <p>{watched}件</p>
      {movies.state === 'hasValue' && <MovieItem movies={movies.contents} />}
    </div>
  )
}

export default Tags
