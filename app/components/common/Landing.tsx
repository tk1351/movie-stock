import React, { FC } from 'react'
import { Typography, Grid } from '@material-ui/core'
import HeroUnit from './HeroUnit'
import { IMovie } from '../../types/movie'
import DummyMovieItem from './DummyMovieItem'
import styles from '../../styles/components/common/landing.module.css'
import DummyMovie from './DummyMovie'
import DummyRanking from './DummyRanking'
import { IWatchList } from '../../types/watchList'
import DummyWatchList from './DummyWatchList'

interface LandingProps {
  movies: IMovie[]
  watchList: IWatchList[]
}

const Landing: FC<LandingProps> = ({ movies, watchList }) => {
  return (
    <div>
      <HeroUnit />
      <div className={styles.wrapper}>
        <Grid container spacing={2} justifyContent="center">
          <div>
            <div>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                映画を記録する
              </Typography>
            </div>
            <div className={styles.movieItemWrapper}>
              {movies.map((movie) => (
                <DummyMovieItem key={movie.id} movie={movie} />
              ))}
            </div>
            <div>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                映画を確認する
              </Typography>
            </div>
            <div>
              <DummyMovie movie={movies[0]} />
            </div>
          </div>
        </Grid>
      </div>
      <div className={styles.wrapper}>
        <Grid container spacing={2} justifyContent="center">
          <div>
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
          </div>
        </Grid>
      </div>
      <div className={styles.wrapper}>
        <Grid container spacing={2} justifyContent="center">
          <div>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              観たい映画をメモする
            </Typography>
            <div>
              <DummyWatchList watchList={watchList} />
            </div>
          </div>
        </Grid>
      </div>
    </div>
  )
}

export default Landing
