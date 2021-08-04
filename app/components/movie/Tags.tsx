import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import {
  fetchMoviesByTag,
  fetchWatchedNumberByTag,
} from '../../src/utils/api/movie'
import MovieItem from './MovieItem'
import Spinner from '../common/Spinner'
import { IMovie } from '../../types/movie'
import API from '../../src/utils/api/api'
import { fetchMovies } from '../../recoil/selectors/movie'

interface TagsPageProps {}

const Tags: NextPage<TagsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)

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

  const loadMore = async () => {
    const limit: number = 30

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
      tagText
    )}&offset=${movies.contents.length}&limit=${limit}`
    const res = await API.get<IMovie[]>(url)

    try {
      setIsFetched([...movies.contents, ...res.data])
    } finally {
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  return (
    <div>
      <h1>タグ: {tagText}の検索結果</h1>
      <p>{watched}件</p>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        {movies.state === 'hasValue' &&
          movies.contents.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default Tags
