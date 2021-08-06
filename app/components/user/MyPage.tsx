import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import {
  Grid,
  Typography,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import styles from '../../styles/components/user/myPage.module.css'
import { watchedState } from '../../recoil/atoms/movie'
import { fetchWatchedNumber } from '../../src/utils/api/movie'

interface MyPageProps {}

const MyPage: NextPage<MyPageProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue' && watched === 0) {
        const watchedNumber = await fetchWatchedNumber(
          isAuth.contents.accessToken
        )
        setWatched(watchedNumber)
      }
    })()
  }, [isAuth])

  if (isLoading) return <Spinner />

  console.log('watched', watched)

  const rows = [{ index: 1, name: '鑑賞本数', number: watched }]

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {isAuthenticated && (
          <Grid container className={styles.myPageWrapper}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" className={styles.header}>
                {isAuth.contents.userInfo && (
                  <Typography gutterBottom variant="h4" component="h2">
                    <Box fontWeight="fontWeightBold">
                      {isAuth.contents.userInfo.name}
                    </Box>
                  </Typography>
                )}
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.index}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.number}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default MyPage
