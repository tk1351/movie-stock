import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useFetchMovies } from '../../src/utils/hooks/useFetchMovies'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { IMovie, TimeListReturnType } from '../../types/movie'
import { authState } from '../../recoil/atoms/auth'
import { fetchMovies } from '../../recoil/selectors/movie'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { limit } from '../../src/utils/api/api'
import Spinner from '../common/Spinner'
import MovieResults from '../movie/MovieResults'

interface TimeProps {}

const Time: NextPage<TimeProps> = () => {
  const router = useRouter()
  const time = router.query.times as string

  const accessToken = useRecoilValueLoadable(authState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const [hasMore, setHasMore] = useState(true)

  const switchUrl = (time: string): TimeListReturnType => {
    switch (time) {
      case 'under90':
        return { title: '~90m', begin: 0, end: 89 }

      case '90and120':
        return { title: '90m~120m', begin: 90, end: 119 }

      case 'over120':
        return { title: '120m~', begin: 120, end: 1000 }

      default:
        return { title: '', begin: 0, end: 0 }
    }
  }

  const { title, begin, end } = switchUrl(time)

  const [movies, watched, isLoading] = useFetchMovies({
    category: 'time',
    number: { begin, end },
  })

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/time?begin=${begin}&end=${end}&offset=${movies.contents.length}&limit=${limit}`

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
          title={`${title}の映画`}
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

export default Time
