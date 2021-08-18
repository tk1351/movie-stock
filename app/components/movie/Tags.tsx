import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Typography, Box } from '@material-ui/core'
import MovieItem from './MovieItem'
import Spinner from '../common/Spinner'
import { IMovie } from '../../types/movie'
import API from '../../src/utils/api/api'
import { fetchMovies } from '../../recoil/selectors/movie'
import styles from '../../styles/components/movie/tags.module.css'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'

interface TagsPageProps {}

const Tags: NextPage<TagsPageProps> = () => {
  const router = useRouter()
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const tagText = router.query.tag as string

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'tag',
    query: tagText,
  })

  const loadMore = async () => {
    const limit: number = 30

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
      tagText
    )}&offset=${movies.contents.length}&limit=${limit}`
    const res = await API.get<IMovie[]>(url)

    try {
      if (watched > movies.contents.length) {
        setIsFetched([...movies.contents, ...res.data])
        setIsFetching(true)
      }
    } catch (e) {
      throw new Error(e)
    } finally {
      setIsFetching(false)
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Grid container justifyContent="center" className={styles.header}>
            <Typography gutterBottom variant="h4" component="h2">
              <Box fontWeight="fontWeightBold">
                {tagText}の検索結果 {watched}件
              </Box>
            </Typography>
          </Grid>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={!isFetching && hasMore}
            loader={loader}
          >
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
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </>
  )
}

export default Tags
