import React from 'react'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import MoviesList from '../movie/MoviesList'

interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login</button>
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
