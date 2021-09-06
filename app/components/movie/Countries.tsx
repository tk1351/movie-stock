import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import Spinner from '../common/Spinner'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import API, { limit } from '../../src/utils/api/api'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import MovieResults from './MovieResults'
import { scrollState } from '../../recoil/atoms/scroll'
import { sortState } from '../../recoil/atoms/sort'
import Sort from '../common/Sort'

interface CountriesPageProps {}

const Countries: NextPage<CountriesPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)
  const sort = useRecoilValue(sortState)
  const [hasMore, setHasMore] = useRecoilState(scrollState)

  const country = router.query.country as string

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'country',
    query: country,
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?country=${encodeURI(
      country
    )}&offset=${movies.contents.length}&limit=${limit}&${sort.sort}=${
      sort.order
    }`
    const res = await API.get<[IMovie[], number]>(url)

    const data = res.data[0]

    setIsFetched([...movies.contents, ...data])

    if (data.length < 1) {
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
          <Sort watched={watched} category={'countries'} query={country} />
          <MovieResults
            title={country}
            watched={watched}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={loader}
            movies={movies}
          />
        </>
      )}
    </>
  )
}

export default Countries
