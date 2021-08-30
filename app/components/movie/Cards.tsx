import React from 'react'
import { NextPage } from 'next'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid } from '@material-ui/core'
import { Loadable } from 'recoil'
import { IMovie } from '../../types/movie'
import styles from '../../styles/components/movie/cards.module.css'
import MovieItem from './MovieItem'

interface CardsProps {
  loadMore: () => Promise<void>
  hasMore: boolean
  loader: JSX.Element
  movies: Loadable<IMovie[]>
}

const Cards: NextPage<CardsProps> = ({ loadMore, hasMore, loader, movies }) => {
  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
      <Grid container spacing={2} className={styles.list}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Grid container spacing={10}>
            {movies.state === 'hasValue' &&
              movies.contents.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
              ))}
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </InfiniteScroll>
  )
}

export default Cards
