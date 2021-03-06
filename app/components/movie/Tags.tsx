import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import Spinner from '../common/Spinner'
import { IMovie } from '../../types/movie'
import API, { limit } from '../../src/utils/api/api'
import { fetchMovies } from '../../recoil/selectors/movie'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { authState } from '../../recoil/atoms/auth'
import MovieResults from './MovieResults'
import Sort from '../common/Sort'
import { scrollState } from '../../recoil/atoms/scroll'
import { sortState } from '../../recoil/atoms/sort'

interface TagsPageProps {}

const Tags: NextPage<TagsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)
  const sort = useRecoilValue(sortState)
  const [hasMore, setHasMore] = useRecoilState(scrollState)

  const tagText = router.query.tag as string

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'tag',
    query: tagText,
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
      tagText
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
          <Sort category={'tags'} query={tagText} />
          <MovieResults
            title={`#${tagText}`}
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

export default Tags
