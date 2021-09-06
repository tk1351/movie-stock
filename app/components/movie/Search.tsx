import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from 'recoil'
import { authState } from '../../recoil/atoms/auth'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { limit } from '../../src/utils/api/api'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import Spinner from '../common/Spinner'
import MovieResults from './MovieResults'
import Sort from '../common/Sort'
import { sortState } from '../../recoil/atoms/sort'
import { scrollState } from '../../recoil/atoms/scroll'

interface SearchPageProps {}

const Search: NextPage<SearchPageProps> = () => {
  const router = useRouter()
  const title = router.query.title as string

  const [hasMore, setHasMore] = useRecoilState(scrollState)

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)
  const sort = useRecoilValue(sortState)

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'title',
    query: title,
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?title=${encodeURI(
      title
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
          <Sort category={'search'} query={title} />
          <MovieResults
            title={`${title}の検索結果`}
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

export default Search
