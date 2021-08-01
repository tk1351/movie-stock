import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import { authState } from '../../atoms/auth'
import { moviesState, watchedState } from '../../atoms/movie'
import { fetchMovies, fetchWatchedNumber } from '../../src/utils/api/movie'
import { registerUser } from '../../src/utils/api/user'
import { RegisterUser } from '../../types/user'
import MovieItem from './MovieItem'

interface MoviesListPageProps {}

const MoviesList: NextPage<MoviesListPageProps> = () => {
  const accessToken = useRecoilValueLoadable(authState)
  const [movies, setMovies] = useRecoilState(moviesState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const { user } = useAuth0()

  console.log('token', accessToken.contents.accessToken)

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const moviesData = await fetchMovies(accessToken.contents.accessToken)
        const watchedNumber = await fetchWatchedNumber(
          accessToken.contents.accessToken
        )
        setMovies(moviesData)
        setWatched(watchedNumber)
      }
    })()
  }, [accessToken])

  const onRegisterUserClicked = async () => {
    const userData = {
      name: user?.name,
      email: user?.email,
      sub: user?.sub,
      picture: user?.picture,
    } as RegisterUser
    await registerUser(userData)
  }

  return (
    <div>
      <button onClick={() => onRegisterUserClicked()}>登録</button>
      <h1>映画一覧</h1>
      {watched && <h2>鑑賞本数: {watched}</h2>}
      <MovieItem movies={movies} />
    </div>
  )
}

export default MoviesList
