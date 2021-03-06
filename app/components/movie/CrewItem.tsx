import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { ICrew } from '../../types/movie'
import styles from '../../styles/components/movie/crewItem.module.css'

interface CrewItemPage {
  crew: ICrew
}

const CrewItem: NextPage<CrewItemPage> = ({ crew }) => {
  const date = new Date(crew.movie.createdAt)
  const jstDate = utcToZonedTime(date, 'Asia/Tokyo')
  return (
    <Grid item xs={3}>
      <Card variant="outlined">
        <CardContent>
          <Link href={`/movie/${crew.movie.id}`}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={styles.linkText}
            >
              {crew.movie.title}
            </Typography>
          </Link>
          <Rating
            name={'movie-rating'}
            value={crew.movie.rate}
            precision={0.5}
            size="small"
            readOnly
          />
          <div className={styles.details}>
            <Typography variant="body2" color="textPrimary" component="p">
              {crew.movie.release}年
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {crew.movie.time}分
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

export default CrewItem
