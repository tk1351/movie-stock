import React, { useEffect, useState } from 'react'
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
import { fetchCrewsRankByCategory } from '../../src/utils/api/crew'
import { CrewsRank } from '../../types/movie'

interface MyPageProps {}

const initialState: CrewsRank[] = [
  {
    cnt: '',
    crews_name: '',
  },
  {
    cnt: '',
    crews_name: '',
  },
  {
    cnt: '',
    crews_name: '',
  },
  {
    cnt: '',
    crews_name: '',
  },
  {
    cnt: '',
    crews_name: '',
  },
]

const MyPage: NextPage<MyPageProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const [directorsRank, setDirectorsRank] = useState<CrewsRank[]>(initialState)
  const [writersRank, setWritersRank] = useState<CrewsRank[]>(initialState)
  const [producersRank, setProducersRank] = useState<CrewsRank[]>(initialState)
  const [photographersRank, setPhotographersRank] = useState<CrewsRank[]>(
    initialState
  )

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const directors = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          1
        )
        const writers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          2
        )
        const producers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          3
        )
        const photographers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          4
        )
        setDirectorsRank(directors)
        setWritersRank(writers)
        setProducersRank(producers)
        setPhotographersRank(photographers)
      }
    })()
  }, [isAuth])

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

  const rows = [{ index: 1, name: '鑑賞本数', number: watched }]

  const crewRows = [
    {
      index: 1,
      name: '監督',
      first: `${directorsRank[0].crews_name}: ${directorsRank[0].cnt}`,
      second: `${directorsRank[1].crews_name}: ${directorsRank[1].cnt}`,
      third: `${directorsRank[2].crews_name}: ${directorsRank[2].cnt}`,
      fourth: `${directorsRank[3].crews_name}: ${directorsRank[3].cnt}`,
      fifth: `${directorsRank[4].crews_name}: ${directorsRank[4].cnt}`,
    },
    {
      index: 2,
      name: '脚本',
      first: `${writersRank[0].crews_name}: ${writersRank[0].cnt}`,
      second: `${writersRank[1].crews_name}: ${writersRank[1].cnt}`,
      third: `${writersRank[2].crews_name}: ${writersRank[2].cnt}`,
      fourth: `${writersRank[3].crews_name}: ${writersRank[3].cnt}`,
      fifth: `${writersRank[4].crews_name}: ${writersRank[4].cnt}`,
    },
    {
      index: 3,
      name: '製作',
      first: `${producersRank[0].crews_name}: ${producersRank[0].cnt}`,
      second: `${producersRank[1].crews_name}: ${producersRank[1].cnt}`,
      third: `${producersRank[2].crews_name}: ${producersRank[2].cnt}`,
      fourth: `${producersRank[3].crews_name}: ${producersRank[3].cnt}`,
      fifth: `${producersRank[4].crews_name}: ${producersRank[4].cnt}`,
    },
    {
      index: 4,
      name: '撮影',
      first: `${photographersRank[0].crews_name}: ${photographersRank[0].cnt}`,
      second: `${photographersRank[1].crews_name}: ${photographersRank[1].cnt}`,
      third: `${photographersRank[2].crews_name}: ${photographersRank[2].cnt}`,
      fourth: `${photographersRank[3].crews_name}: ${photographersRank[3].cnt}`,
      fifth: `${photographersRank[4].crews_name}: ${photographersRank[4].cnt}`,
    },
  ]

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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>職種</TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">2</TableCell>
                    <TableCell align="right">3</TableCell>
                    <TableCell align="right">4</TableCell>
                    <TableCell align="right">5</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crewRows.map((row) => (
                    <TableRow key={row.index}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.first}</TableCell>
                      <TableCell align="right">{row.second}</TableCell>
                      <TableCell align="right">{row.third}</TableCell>
                      <TableCell align="right">{row.fourth}</TableCell>
                      <TableCell align="right">{row.fifth}</TableCell>
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
