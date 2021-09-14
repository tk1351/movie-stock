import React, { FC, useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core'
import HeroUnit from './HeroUnit'
import { useRecoilStateLoadable } from 'recoil'
import { moviesState } from '../../recoil/atoms/movie'
import { IMovie } from '../../types/movie'
import API from '../../src/utils/api/api'
import DummyMovieItem from './DummyMovieItem'
import styles from '../../styles/components/common/landing.module.css'
import DummyMovie from './DummyMovie'
import DummyRanking from './DummyRanking'

const Landing: FC = () => {
  const [movies, setMovies] = useRecoilStateLoadable<IMovie[]>(moviesState)

  useEffect(() => {
    ;(async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/landing`
      const res = await API.get<IMovie[]>(url)
      setMovies(res.data)
    })()
  }, [])

  return (
    <div>
      <HeroUnit />
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            映画を記録する
          </Typography>
          <div className={styles.movieItemWrapper}>
            {movies.state === 'hasValue' &&
              movies.contents.map((movie) => (
                <DummyMovieItem key={movie.id} movie={movie} />
              ))}
          </div>
          <div>
            {movies.state === 'hasValue' && (
              <DummyMovie movie={movies.contents[0]} />
            )}
          </div>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            映画を集計する
          </Typography>
          <div>
            <DummyRanking number={1} />
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default Landing
