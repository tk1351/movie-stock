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
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import { authState, Auth } from '../../recoil/atoms/auth'
import { IMovie } from '../../types/movie'
import { movieState } from '../../recoil/atoms/movie'
import { fetchMovieById } from '../../src/utils/api/movie'
import Spinner from '../common/Spinner'
import { IMessage } from '../../types/defaultType'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import styles from '../../styles/components/movie/movie.module.css'

interface MoviePageProps {}

const crewCategory = {
  1: '監督',
  2: '脚本',
  3: '製作',
  4: '撮影',
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const TabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: any) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}

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

  const [value, setValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container>
      {movie.state === 'hasValue' && (
        <Grid item xs={12}>
          <Grid container>
            <Typography gutterBottom variant="h4" component="h2">
              <Box fontWeight="fontWeightBold">{movie.contents.title}</Box>
            </Typography>
            <Typography variant="h5" color="textPrimary" component="h4">
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
            <div key={tag.id}>
              <Link href={{ pathname: '/tags', query: { tag: tag.text } }}>
                <Typography variant="body2" color="textPrimary" component="a">
                  #{tag.text}
                </Typography>
              </Link>
            </div>
          ))}
          <Paper square>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
            >
              <Tab label="スタッフ" {...a11yProps(0)} />
              <Tab label="詳細" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              {movie.contents.crews.map((crew) => (
                <div key={crew.id}>
                  <Link
                    href={{ pathname: '/crews', query: { name: crew.name } }}
                  >
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      {crewCategory[crew.category]}: {crew.name}
                    </Typography>
                  </Link>
                </div>
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {movie.contents.studios.map((studio) => (
                <div key={studio.id}>
                  <Link
                    href={{
                      pathname: '/studios',
                      query: { studio: studio.studio },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      制作会社: {studio.studio}
                    </Typography>
                  </Link>
                </div>
              ))}
              {movie.contents.countries.map((country) => (
                <div key={country.id}>
                  <Link
                    href={{
                      pathname: '/countries',
                      query: { country: country.country },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      製作国: {country.country}
                    </Typography>
                  </Link>
                </div>
              ))}
            </TabPanel>
          </Paper>
        </Grid>
      )}
      <Grid container>
        <div className={styles.buttonWrapper}>
          <div>
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
