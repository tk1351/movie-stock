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
import { Grid, Typography, Box } from '@material-ui/core'
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
import styles from '../../styles/components/movie/tags.module.css'

interface TagsPageProps {}

const Tags: NextPage<TagsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

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
      if (watched > movies.contents.length) {
        setIsFetched([...movies.contents, ...res.data])
        setIsFetching(true)
      }
    } catch (e) {
      throw new Error(e)
    } finally {
      setIsFetching(false)
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  return (
    <div>
      <Grid container justifyContent="center" className={styles.header}>
        <Typography gutterBottom variant="h4" component="h2">
          <Box fontWeight="fontWeightBold">
            {tagText}の検索結果 {watched}件
          </Box>
        </Typography>
      </Grid>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={!isFetching && hasMore}
        loader={loader}
      >
        <Grid container spacing={2} className={styles.list}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Grid container spacing={10}>
              {movies.state === 'hasValue' &&
                movies.contents.map((movie) => (
                  <MovieItem key={movie.id} movie={movie} />
                ))}
            </Grid>
          </Grid>
        </Grid>
      </InfiniteScroll>
    </div>
  )
}

export default Tags
