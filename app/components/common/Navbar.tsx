import React, { useState } from 'react'
import { NextPage } from 'next'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { authState } from '../../recoil/atoms/auth'
import styles from '../../styles/components/common/navbar.module.css'
import MovieSearchInput from './MovieSearchInput'

interface NavbarProps {}

const Navbar: NextPage<NavbarProps> = () => {
  const router = useRouter()
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0()
  const { userInfo } = useRecoilValue(authState)

  const guestLinks = (
    <div className={styles.links}>
      <Button color="inherit" onClick={() => loginWithRedirect()}>
        ログイン
      </Button>
    </div>
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const userLinks = (
    <div className={styles.links}>
      <Button
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="avatar-menu"
      >
        <Avatar src={user?.picture} />
      </Button>
      <Menu
        id="avatar-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        anchorEl={anchorEl}
      >
        <MenuItem onClick={() => router.push(`/user/${userInfo.id}`)}>
          マイページ
        </MenuItem>
        <MenuItem
          onClick={() => router.push(`/user/${userInfo.id}/watch-list`)}
        >
          Watch List
        </MenuItem>
        <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
      </Menu>
      <Button color="inherit">
        <Link href="/register">
          <a>
            <Add />
          </a>
        </Link>
      </Button>
    </div>
  )

  const Links = () => {
    if (isAuthenticated && userInfo.role === 'user') {
      return userLinks
    } else {
      return guestLinks
    }
  }

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar className={styles.toolbar}>
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <Link href="/">
                <a>CineStock</a>
              </Link>
            </IconButton>
            {!isLoading && <Links />}
          </Toolbar>
        </AppBar>
      </div>
      <MovieSearchInput />
    </>
  )
}

export default Navbar
