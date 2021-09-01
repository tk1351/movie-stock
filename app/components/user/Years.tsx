import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Grid } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import LinkTable from '../common/LinkTable'
import { useRecoilValueLoadable } from 'recoil'
import styles from '../../styles/components/user/years.module.css'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import MyPageHeader from '../common/MyPageHeader'
import { yearsRow } from '../../src/utils/tableRow'

interface YearsProps {}

const Years: NextPage<YearsProps> = () => {
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
            <LinkTable contents={yearsRow} />
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default Years
