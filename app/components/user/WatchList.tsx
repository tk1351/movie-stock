import React, { FC, useEffect, createRef, useCallback } from 'react'
import Head from 'next/head'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { Button, Grid } from '@material-ui/core'
import { ArrowUpward } from '@material-ui/icons'
import { Add, Search } from '@material-ui/icons'
import { useAuth0 } from '@auth0/auth0-react'
import List from '../watch-list/List'
import RegisterForm from '../watch-list/RegisterForm'
import styles from '../../styles/components/user/watchList.module.css'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'
import { watchListFormState } from '../../recoil/atoms/open'
import SearchWatchListForm from '../watch-list/SearchWatchListForm'

interface WatchListProps {}

const WatchList: FC<WatchListProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [form, setForm] = useRecoilState(watchListFormState)

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    setForm({ open: false, category: undefined })
  }, [])

  const onClick = (category: 'register' | 'search') => {
    setForm((prev) => ({
      open: !prev.open,
      category,
    }))
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
            {!form.open && (
              <Grid
                container
                justifyContent="center"
                className={styles.addButtonWrapper}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onClick('register')}
                >
                  <Add />
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onClick('search')}
                >
                  <Search />
                </Button>
              </Grid>
            )}
            {form.open && form.category === 'register' && <RegisterForm />}
            {form.open && form.category === 'search' && <SearchWatchListForm />}
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
