import React, { FC, useEffect, createRef, useCallback } from 'react'
import Head from 'next/head'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { Button, Grid } from '@material-ui/core'
import { ArrowUpward } from '@material-ui/icons'
import { Add } from '@material-ui/icons'
import { useAuth0 } from '@auth0/auth0-react'
import List from '../watch-list/List'
import RegisterForm from '../watch-list/RegisterForm'
import { watchListRegisterFormState } from '../../recoil/atoms/watchListRegisterForm'
import styles from '../../styles/components/user/watchList.module.css'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'

interface WatchListProps {}

const WatchList: FC<WatchListProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [open, setOpen] = useRecoilState(watchListRegisterFormState)

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    setOpen(false)
  }, [])

  const onClick = () => {
    setOpen((prev) => !prev)
  }

  const ref = createRef<HTMLDivElement>()

  const scrollToStartOfTable = useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [ref])

  if (isLoading) return <Spinner />

  if (isAuth.state === 'hasValue') {
    const userName = isAuth.contents.userInfo.name
    return (
      <>
        <Head>
          <title>{userName}のWatchList | CineStock</title>
        </Head>

        {isAuthenticated && (
          <div className={styles.watchListWrapper} ref={ref}>
            {!open && (
              <Grid
                container
                justifyContent="center"
                className={styles.addButtonWrapper}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onClick()}
                >
                  <Add />
                </Button>
              </Grid>
            )}
            {open && <RegisterForm />}
            <List />
            <div className={styles.arrowButton}>
              <Button type="button" onClick={() => scrollToStartOfTable()}>
                <ArrowUpward />
              </Button>
            </div>
          </div>
        )}
      </>
    )
  }

  return <></>
}

export default WatchList
