import React from 'react'
import { NextPage } from 'next'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValue } from 'recoil'
import { authState } from '../../atoms/auth'

interface NavbarProps {}

const Navbar: NextPage<NavbarProps> = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()
  const { user } = useRecoilValue(authState)

  const guestLinks = (
    <div>
      <Button color="inherit" onClick={() => loginWithRedirect()}>
        ログイン
      </Button>
    </div>
  )

  const userLinks = (
    <div>
      <Button color="inherit">
        <Link href="/register">映画登録</Link>
      </Button>
      <Button color="inherit" onClick={() => logout()}>
        ログアウト
      </Button>
    </div>
  )

  const Links = () => {
    if (isAuthenticated && user.role === 'user') {
      return userLinks
    } else {
      return guestLinks
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <Link href="/">
              <p>CineStock</p>
            </Link>
          </IconButton>
          {!isLoading && <Links />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
