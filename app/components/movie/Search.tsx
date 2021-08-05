import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import { Grid, Typography, Box } from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import MovieItem from './MovieItem'
import styles from '../../styles/components/movie/search.module.css'

interface SearchPageProps {}

const Search: NextPage<SearchPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const title = router.query.title as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        setAuthToken(accessToken.contents.accessToken)
        const url = `${
          process.env.NEXT_PUBLIC_API_URL
        }/movies?title=${encodeURI(String(title))}`
        const res = await API.get<IMovie[]>(url)
        setMovies(res.data)
      }
    })()
  }, [accessToken])
  return (
    <div>
      <Grid container justifyContent="center" className={styles.header}>
        <Typography gutterBottom variant="h4" component="h2">
          <Box fontWeight="fontWeightBold">
            {title}の検索結果 {watched}件
          </Box>
        </Typography>
      </Grid>
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
    </div>
  )
}

export default Search
