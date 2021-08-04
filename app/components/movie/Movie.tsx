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
} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import { authState, Auth } from '../../recoil/atoms/auth'
import { IMovie } from '../../types/movie'
import { movieState } from '../../recoil/atoms/movie'
import { fetchMovieById } from '../../src/utils/api/movie'
import { IMessage } from '../../types/defaultType'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import styles from '../../styles/components/movie/movie.module.css'
import DetailTabs from './DetailTabs'

interface MoviePageProps {}

const Movie: NextPage<MoviePageProps> = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const [movie, setMovie] = useRecoilStateLoadable<IMovie>(movieState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const id = router.query.movieId as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const movieData = await fetchMovieById(
          accessToken.contents.accessToken,
          Number(id)
        )
        setMovie(movieData)
      }
    })()
  }, [accessToken])

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

  return (
    <Grid container className={styles.movieWrapper}>
      {movie.state === 'hasValue' && (
        <Grid item xs={12}>
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
                <Typography variant="body2" color="textPrimary" component="a">
                  #{tag.text}
                </Typography>
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
          <p>戻る</p>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Movie
