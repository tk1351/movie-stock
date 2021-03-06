import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValueLoadable, useRecoilState, useRecoilValue } from 'recoil'
import { Grid } from '@material-ui/core'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import styles from '../../styles/components/user/myPage.module.css'
import { watchedState } from '../../recoil/atoms/movie'
import Activity from './Activity'
import { fetchMoviesByUserId } from '../../src/utils/api/movie'
import MyPageHeader from '../common/MyPageHeader'
import BackButton from '../common/BackButton'
import { sortState } from '../../recoil/atoms/sort'
import { deleteDomain } from '../../src/utils/user'

interface MyPageProps {}

const MyPage: NextPage<MyPageProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const sort = useRecoilValue(sortState)

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    // userの鑑賞本数を返す
    ;(async () => {
      if (isAuth.state === 'hasValue' || watched === 0) {
        const { count } = await fetchMoviesByUserId(
          isAuth.contents.accessToken,
          sort
        )
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
          <title>{deleteDomain(userName)}のページ | CineStock</title>
        </Head>
        {isAuthenticated && (
          <Grid container className={styles.myPageWrapper}>
            <MyPageHeader isAuth={isAuth} deleteDomain={deleteDomain} />
            <Activity watched={watched} />
            <BackButton href={'/'} text={'戻る'} />
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default MyPage
