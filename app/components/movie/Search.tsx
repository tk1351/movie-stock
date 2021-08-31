import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { authState } from '../../recoil/atoms/auth'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { limit } from '../../src/utils/api/api'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import Spinner from '../common/Spinner'
import MovieResults from './MovieResults'

interface SearchPageProps {}

const Search: NextPage<SearchPageProps> = () => {
  const router = useRouter()

  const [hasMore, setHasMore] = useState(true)

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const title = router.query.title as string

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'title',
    query: title,
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?title=${encodeURI(
      title
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
          title={title}
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

export default Search
