import React, { useEffect } from 'react'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilValue,
} from 'recoil'
import { NextPage } from 'next'
import { Grid, Typography, Box } from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import { fetchMoviesByUserId } from '../../src/utils/api/movie'
import API, { limit } from '../../src/utils/api/api'
import { IMovie } from '../../types/movie'
import Spinner from '../common/Spinner'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import Cards from './Cards'
import Sort from '../common/Sort'
import { sortState } from '../../recoil/atoms/sort'
import { scrollState } from '../../recoil/atoms/scroll'
import styles from '../../styles/components/movie/moviesList.module.css'

interface MoviesListPageProps {}

const MoviesList: NextPage<MoviesListPageProps> = () => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const sort = useRecoilValue(sortState)

  const [hasMore, setHasMore] = useRecoilState(scrollState)

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const res: {
          movies: IMovie[]
          count: number
        } = await fetchMoviesByUserId(accessToken.contents.accessToken, sort)
        setMovies([...res.movies])
        setWatched(res.count)
        setHasMore(true)
      }
    })()
  }, [accessToken])

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${movies.contents.length}&limit=${limit}&${sort.sort}=${sort.order}`
    const res = await API.get<[IMovie[], number]>(url)

    const data = res.data[0]

    setMovies([...movies.contents, ...data])

    if (data.length < 1) {
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  return (
    <>
      <Sort category={'moviesList'} />
      <Grid container>
        <Grid container justifyContent="center" className={styles.header}>
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">鑑賞本数: {watched}件</Box>
          </Typography>
        </Grid>
        <Cards
          loadMore={loadMore}
          hasMore={hasMore}
          loader={loader}
          movies={movies}
        />
      </Grid>
    </>
  )
}

export default MoviesList
