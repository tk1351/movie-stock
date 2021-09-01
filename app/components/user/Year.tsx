import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { limit } from '../../src/utils/api/api'
import { IMovie } from '../../types/movie'
import { fetchMovies } from '../../recoil/selectors/movie'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import Spinner from '../common/Spinner'
import MovieResults from '../movie/MovieResults'

interface YearProps {}

const Year: NextPage<YearProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)

  const year = String(router.query.years).slice(0, -1)

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'release',
    query: year,
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/release/decade/${year}?offset=${movies.contents.length}&limit=${limit}`

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
        <MovieResults
          title={`${year}年代の映画`}
          watched={watched}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={loader}
          movies={movies}
        />
      )}
    </>
  )
}

export default Year
