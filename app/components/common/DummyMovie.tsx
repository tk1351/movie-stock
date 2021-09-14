import React, { FC } from 'react'
import { Button, Grid, Typography, Box, Chip } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Delete, Edit } from '@material-ui/icons'
import styles from '../../styles/components/common/dummyMovie.module.css'
import { IMovie } from '../../types/movie'

interface DummyMovieProps {
  movie: IMovie
}

const DummyMovie: FC<DummyMovieProps> = ({ movie }) => {
  console.log('movie', movie)
  return (
    <Grid container className={styles.movieWrapper}>
      {movie && (
        <>
          <Grid item xs={12}>
            <Grid container className={styles.header}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                className={styles.title}
              >
                <Box fontWeight="fontWeightBold">{movie.title}</Box>
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                component="h4"
                className={styles.release}
              >
                {movie.release}年
              </Typography>
              {movie.crews &&
                movie.crews.map(
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
            <Rating
              name={'movie-rating'}
              value={movie.rate}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="textPrimary" component="p">
              {movie.time}分
            </Typography>
            {movie.tags &&
              movie.tags.map((tag) => (
                <div key={tag.id} className={styles.tags}>
                  <Chip label={tag.text} />
                </div>
              ))}
            {/* <DetailTabs movie={movie.contents} /> */}
          </Grid>
          <Grid container>
            <div className={styles.buttonWrapper}>
              <div className={styles.editButton}>
                <Button size="small" color="primary" variant="contained">
                  <Edit />
                </Button>
              </div>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                type="button"
              >
                <Delete />
              </Button>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default DummyMovie
