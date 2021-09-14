import React, { FC } from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { IMovie } from '../../types/movie'
import styles from '../../styles/components/common/dummyMovieItem.module.css'

interface DummyMovieItemProps {
  movie: IMovie
}

const DummyMovieItem: FC<DummyMovieItemProps> = ({ movie }) => {
  return (
    <Grid item xs={3}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            className={styles.linkText}
          >
            {movie.title}
          </Typography>
          <Rating
            name={'movie-rating'}
            value={movie.rate}
            precision={0.5}
            size="small"
            readOnly
          />
          <div className={styles.details}>
            <Typography variant="body2" color="textPrimary" component="p">
              {movie.release}年
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {movie.time}分
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            2021-01-01
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default DummyMovieItem
