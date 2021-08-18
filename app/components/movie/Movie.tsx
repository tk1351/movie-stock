import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  Box,
  Chip,
} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import axios from 'axios'
import { authState, Auth } from '../../recoil/atoms/auth'
import { IMovie, TMDBSearchResult } from '../../types/movie'
import { movieState } from '../../recoil/atoms/movie'
import { IMessage } from '../../types/defaultType'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import styles from '../../styles/components/movie/movie.module.css'
import DetailTabs from './DetailTabs'
import Spinner from '../common/Spinner'

interface MoviePageProps {}

const useFetchMovieById = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const [movie, setMovie] = useRecoilStateLoadable<IMovie>(movieState)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const id = router.query.movieId as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const fetchMovieById = async () => {
          setAuthToken(accessToken.contents.accessToken)
          const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/me/${id}`
          const res = await API.get<IMovie>(url)
          setMovie(res.data)
          setIsLoading(false)
        }

        fetchMovieById()
      }
    })()
  }, [accessToken])

  return [movie, isLoading] as const
}

const Movie: NextPage<MoviePageProps> = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const [movie, isLoading] = useFetchMovieById()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteMovie = async (id: number) => {
    if (accessToken.state === 'hasValue') {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/delete/${id}`
      try {
        setAuthToken(accessToken.contents.accessToken)
        const res = await API.delete<IMessage>(url)
        setIsAlert({
          msg: res.data.message,
          alertType: 'succeeded',
          open: true,
        })
        await router.push('/')
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  const [poster, setPoster] = useState<string | null>(null)

  // const fetchMoviePoster = async () => {
  //   if (movie.state === 'hasValue') {
  //     const title = movie.contents.title
  //     const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ja-JP&query=${title}&page=1&include_adult=true`

  //     const fetchData = await axios.get<TMDBSearchResult>(url)
  //     console.log('fetch', fetchData.data.result[0])
  //   }
  // }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid container className={styles.movieWrapper}>
          {movie.state === 'hasValue' && (
            <Grid item xs={12}>
              {/* <Button onClick={() => fetchMoviePoster()}>fetch</Button> */}
              <Grid container className={styles.header}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  className={styles.title}
                >
                  <Box fontWeight="fontWeightBold">{movie.contents.title}</Box>
                </Typography>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  component="h4"
                  className={styles.release}
                >
                  {movie.contents.release}年
                </Typography>
                {movie.contents.crews.map(
                  (crew) =>
                    crew.category === 1 && (
                      <Typography
                        variant="h5"
                        color="textPrimary"
                        component="h4"
                        key={crew.id}
                      >
                        監督: {crew.name}
                      </Typography>
                    )
                )}
              </Grid>
              <Typography variant="body2" color="textPrimary" component="p">
                {movie.contents.time}分
              </Typography>
              {movie.contents.tags.map((tag) => (
                <div key={tag.id} className={styles.tags}>
                  <Link href={{ pathname: '/tags', query: { tag: tag.text } }}>
                    <Chip label={tag.text} />
                  </Link>
                </div>
              ))}
              <DetailTabs movie={movie.contents} />
            </Grid>
          )}
          <Grid container>
            <div className={styles.buttonWrapper}>
              <div className={styles.editButton}>
                <Button size="small" color="primary" variant="contained">
                  <Link href={`/update/${movie.contents.id}`}>
                    <Edit />
                  </Link>
                </Button>
              </div>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                type="button"
                onClick={handleClickOpen}
              >
                <Delete />
              </Button>
            </div>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{movie.contents.title}を削除しますか？</DialogTitle>
            <DialogActions>
              <Button
                color="secondary"
                onClick={() => deleteMovie(movie.contents.id)}
              >
                削除
              </Button>
              <Button color="primary" onClick={handleClose}>
                キャンセル
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container>
            <Link href="/">
              <a>戻る</a>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Movie
