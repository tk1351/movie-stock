import React, { useEffect, useState } from 'react'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
} from 'recoil'
import { NextPage } from 'next'
import { Grid, Typography, Box } from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import { fetchMoviesByUser } from '../../src/utils/api/movie'
import API, { limit } from '../../src/utils/api/api'
import { IMovie } from '../../types/movie'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/movie/moviesList.module.css'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import Cards from './Cards'

interface MoviesListPageProps {}

const MoviesList: NextPage<MoviesListPageProps> = () => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const res: {
          movies: IMovie[]
          count: number
        } = await fetchMoviesByUser(accessToken.contents.accessToken)
        setMovies(res.movies)
        setWatched(res.count)
      }
    })()
  }, [accessToken])

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${movies.contents.length}&limit=${limit}`
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
      <Grid container justifyContent="center" className={styles.h2}>
        {watched && (
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">鑑賞本数: {watched}</Box>
          </Typography>
        )}
      </Grid>
      <Cards
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}
        movies={movies}
      />
    </>
  )
}

export default MoviesList
