import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilState,
  useRecoilStateLoadable,
  useSetRecoilState,
} from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Typography, Box } from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import { fetchWatchedNumberByCountry } from '../../src/utils/api/movie'
import MovieItem from './MovieItem'
import Spinner from '../common/Spinner'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import API, { offset, limit } from '../../src/utils/api/api'
import styles from '../../styles/components/movie/countries.module.css'
import { setAuthToken } from '../../src/utils/api/setAuthToken'

interface CountriesPageProps {}

const useFetchCountries = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const [isLoading, setIsLoading] = useState(true)
  const country = router.query.country as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const fetchMoviesByCountry = async () => {
          setAuthToken(accessToken.contents.accessToken)
          const url = `${
            process.env.NEXT_PUBLIC_API_URL
          }/movies?country=${encodeURI(
            country
          )}&offset=${offset}&limit=${limit}`
          const res = await API.get<IMovie[]>(url)
          setMovies(res.data)
          setIsLoading(false)
        }
        const watchedNumber = await fetchWatchedNumberByCountry(
          accessToken.contents.accessToken,
          country
        )
        fetchMoviesByCountry()
        setWatched(watchedNumber)
      }
    })()
  }, [accessToken])

  return [movies, watched, isLoading] as const
}

const Countries: NextPage<CountriesPageProps> = () => {
  const router = useRouter()

  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const country = router.query.country as string

  const [movies, watched, isLoading] = useFetchCountries()

  const loadMore = async () => {
    const limit: number = 30

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?country=${encodeURI(
      country
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
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Grid container justifyContent="center" className={styles.header}>
            <Typography gutterBottom variant="h4" component="h2">
              <Box fontWeight="fontWeightBold">
                製作国:{country}の検索結果 {watched}件
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
        </>
      )}
    </>
  )
}

export default Countries
