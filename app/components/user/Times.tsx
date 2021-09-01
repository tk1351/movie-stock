import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Grid } from '@material-ui/core'
import { useRecoilValueLoadable } from 'recoil'
import { useAuth0 } from '@auth0/auth0-react'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/times.module.css'
import MyPageHeader from '../common/MyPageHeader'
import LinkTable from '../common/LinkTable'
import { timesRow } from '../../src/utils/tableRow'

interface TimesProps {}

const Times: NextPage<TimesProps> = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const isAuth = useRecoilValueLoadable(authState)

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
            <LinkTable contents={timesRow} />
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default Times
