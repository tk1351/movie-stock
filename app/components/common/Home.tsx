import React from 'react'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'

interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading ...</div>

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
      {isAuthenticated && (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </>
      )}
    </div>
  )
}

export default Home
