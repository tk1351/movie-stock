import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValueLoadable } from 'recoil'
import MoviesList from '../movie/MoviesList'
import { authState, Auth } from '../../recoil/atoms/auth'
import API from '../../src/utils/api/api'
import { IUsersId, RegisterUser } from '../../types/user'
import { registerUser } from '../../src/utils/api/user'
import Landing from './Landing'
import Spinner from './Spinner'
import { IMovie } from '../../types/movie'
import { IWatchList } from '../../types/watchList'

interface HomePageProps {
  movies: IMovie[]
  watchList: IWatchList[]
}

const Home: NextPage<HomePageProps> = ({ movies, watchList }) => {
  const [usersId, setUsersId] = useState<IUsersId[]>([])
  const { isLoading, isAuthenticated, user } = useAuth0()

  useEffect(() => {
    ;(async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/id`
      const res = await API.get<IUsersId[]>(url)
      setUsersId(res.data)
    })()
  }, [])

  const userInfo = useRecoilValueLoadable<Auth>(authState)
  const userData: RegisterUser = {
    name: String(user?.name),
    email: String(user?.email),
    sub: String(user?.sub),
    picture: String(user?.picture),
  }

  useEffect(() => {
    ;(async () => {
      if (userInfo.state === 'hasValue') {
        if (userInfo.contents.userInfo.id === 0) return

        const findDuplicatedIdFromDB = usersId.some(
          (item) => item.id === userInfo.contents.userInfo.id
        )

        if (findDuplicatedIdFromDB === false) {
          await registerUser(userData)
        }
      }
    })()
  }, [userInfo])

  return (
    <div>
      {/* FIXME: ログイン情報取得中にLandingページを表示しない */}
      {isLoading && <Spinner />}
      {!isAuthenticated && (
        <>
          <Landing movies={movies} watchList={watchList} />
        </>
      )}
      {isAuthenticated && (
        <>
          <MoviesList />
        </>
      )}
    </div>
  )
}

export default Home
