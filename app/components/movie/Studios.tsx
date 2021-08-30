import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil'
import Spinner from '../common/Spinner'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import API, { limit } from '../../src/utils/api/api'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import MovieResults from './MovieResults'

interface StudiosPageProps {}

const Studios: NextPage<StudiosPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)

  const studio = router.query.studio as string

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'studio',
    query: studio,
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?studio=${encodeURI(
      studio
    )}&offset=${movies.contents.length}&limit=${limit}`
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
          title={studio}
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

export default Studios
