import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import { authState } from '../../recoil/atoms/auth'
import { moviesState, watchedState } from '../../recoil/atoms/movie'
import { fetchMovies } from '../../recoil/selectors/movie'
import { IMovie } from '../../types/movie'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import MovieItem from './MovieItem'

interface SearchPageProps {}

const Search: NextPage<SearchPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilStateLoadable(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<IMovie[]>(fetchMovies)

  const title = router.query.title as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        setAuthToken(accessToken.contents.accessToken)
        const url = `${
          process.env.NEXT_PUBLIC_API_URL
        }/movies?title=${encodeURI(String(title))}`
        const res = await API.get<IMovie[]>(url)
        setMovies(res.data)
      }
    })()
  }, [accessToken])
  return (
    <div>
      <h1>{title}の検索結果</h1>
      {movies.state === 'hasValue' &&
        movies.contents.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
    </div>
  )
}

export default Search
