import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Grid } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import LinkTable from '../common/LinkTable'
import { useRecoilValueLoadable, useRecoilValue } from 'recoil'
import styles from '../../styles/components/user/years.module.css'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import MyPageHeader from '../common/MyPageHeader'
import { yearsRow } from '../../src/utils/tableRow'
import BackButton from '../common/BackButton'
import { deleteDomain } from '../../src/utils/user'

interface YearsProps {}

const Years: NextPage<YearsProps> = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const isAuth = useRecoilValueLoadable(authState)
  const { userInfo } = useRecoilValue(authState)

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
            <LinkTable contents={yearsRow} />
            <BackButton href={`/user/${userInfo.id}`} text={'戻る'} />
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default Years
