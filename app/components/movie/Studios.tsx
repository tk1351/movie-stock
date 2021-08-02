import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import {
  fetchWatchedNumberByStudio,
  fetchMoviesByStudio,
} from '../../src/utils/api/movie'
import MovieItem from './MovieItem'
import Spinner from '../common/Spinner'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import API from '../../src/utils/api/api'

interface StudiosPageProps {}

const Studios: NextPage<StudiosPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)

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

  const loadMore = async () => {
    const limit: number = 30

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?studio=${encodeURI(
      studio
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
      <h1>制作会社: {studio}の検索結果</h1>
      <p>{watched}件</p>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        {movies.state === 'hasValue' && <MovieItem movies={movies.contents} />}
      </InfiniteScroll>
    </div>
  )
}

export default Studios
