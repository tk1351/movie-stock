import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import { Grid } from '@material-ui/core'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import styles from '../../styles/components/user/myPage.module.css'
import { watchedState } from '../../recoil/atoms/movie'
import Activity from './Activity'
import { fetchMoviesByUser } from '../../src/utils/api/movie'
import MyPageHeader from '../common/MyPageHeader'

interface MyPageProps {}

const MyPage: NextPage<MyPageProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    // userの鑑賞本数を返す
    ;(async () => {
      if (isAuth.state === 'hasValue' || watched === 0) {
        const { count } = await fetchMoviesByUser(isAuth.contents.accessToken)
        setWatched(count)
      }
    })()
  }, [isAuth])

  if (isLoading) return <Spinner />

  if (isAuth.state === 'hasValue') {
    const userName = isAuth.contents.userInfo.name
    return (
      <>
        <Head>
          <title>{userName}のページ | CineStock</title>
        </Head>
        {isAuthenticated && (
          <Grid container className={styles.myPageWrapper}>
            <MyPageHeader isAuth={isAuth} />
            <Activity watched={watched} />
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default MyPage
