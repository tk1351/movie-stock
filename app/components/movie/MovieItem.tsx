import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Rating } from '@material-ui/lab'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { IMovie } from '../../types/movie'
import styles from '../../styles/components/movie/movieItem.module.css'

interface MovieItemPageProps {
  movie: IMovie
}

const MovieItem: NextPage<MovieItemPageProps> = ({ movie }) => {
  const date = new Date(movie.createdAt)
  const jstDate = utcToZonedTime(date, 'Asia/Tokyo')
  return (
    <Grid item xs={3}>
      <Card variant="outlined">
        <CardContent>
          <Link href={`/movie/${movie.id}`}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={styles.linkText}
            >
              {movie.title}
            </Typography>
          </Link>
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
            {format(jstDate, 'yyyy-MM-dd')}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default MovieItem
