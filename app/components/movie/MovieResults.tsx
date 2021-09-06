import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Grid, Typography, Box } from '@material-ui/core'
import { Loadable } from 'recoil'
import { IMovie } from '../../types/movie'
import Cards from './Cards'
import styles from '../../styles/components/movie/movieResults.module.css'
import BackHistoryButton from '../common/BackHistoryButton'

interface MovieResultsProps {
  title: string
  watched: number
  loadMore: () => Promise<void>
  hasMore: boolean
  loader: JSX.Element
  movies: Loadable<IMovie[]>
}

const MovieResults: NextPage<MovieResultsProps> = ({
  title,
  watched,
  loadMore,
  hasMore,
  loader,
  movies,
}) => {
  return (
    <>
      <Head>
        <title>{title}の検索結果 | CineStock</title>
      </Head>
      <Grid container>
        <Grid container justifyContent="center" className={styles.header}>
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">
              {title} {watched}件
            </Box>
          </Typography>
        </Grid>
        <Cards
          loadMore={loadMore}
          hasMore={hasMore}
          loader={loader}
          movies={movies}
        />
        <BackHistoryButton />
      </Grid>
    </>
  )
}

export default MovieResults
