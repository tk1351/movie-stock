import React, { useEffect, useState } from 'react'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilStateLoadable,
} from 'recoil'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Typography, Box } from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import { fetchMoviesByUser } from '../../src/utils/api/movie'
import { registerUser } from '../../src/utils/api/user'
import { RegisterUser } from '../../types/user'
import MovieItem from './MovieItem'
import API from '../../src/utils/api/api'
import { IMovie } from '../../types/movie'
import { fetchMovies } from '../../recoil/selectors/movie'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/movie/moviesList.module.css'
import { setAuthToken } from '../../src/utils/api/setAuthToken'

interface MoviesListPageProps {}

const MoviesList: NextPage<MoviesListPageProps> = () => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const { user } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const res = await fetchMoviesByUser(accessToken.contents.accessToken)
        setMovies(res.movies)
        setWatched(res.count)
      }
    })()
  }, [accessToken])

  const onRegisterUserClicked = async () => {
    const userData = {
      name: user?.name,
      email: user?.email,
      sub: user?.sub,
      picture: user?.picture,
    } as RegisterUser
    await registerUser(userData)
  }

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)
    const limit: number = 30

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${movies.contents.length}&limit=${limit}`
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
      <Grid container justifyContent="center" className={styles.h2}>
        {watched && (
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">鑑賞本数: {watched}</Box>
          </Typography>
        )}
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
          <Grid item xs={2} />
        </Grid>
      </InfiniteScroll>
      <button onClick={() => onRegisterUserClicked()}>登録</button>
    </div>
  )
}

export default MoviesList
