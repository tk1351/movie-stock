import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRecoilValueLoadable, useRecoilValue } from 'recoil'
import { useAuth0 } from '@auth0/auth0-react'
import {
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
} from '@material-ui/core'
import { CrewsRank } from '../../types/movie'
import { authState } from '../../recoil/atoms/auth'
import { fetchCrewsRankByCategory } from '../../src/utils/api/crew'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/directors.module.css'

interface DirectorsProps {}

const Directors: NextPage<DirectorsProps> = () => {
  const [directorsRank, setDirectorsRank] = useState<CrewsRank[]>([])

  const isAuth = useRecoilValueLoadable(authState)
  const { userInfo } = useRecoilValue(authState)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const directors = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          1
        )
        setDirectorsRank(directors)
      }
    })()
  }, [isAuth])

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {directorsRank.length === 0 && <Spinner />}
        {isAuthenticated && (
          <div className={styles.directorsPageWrapper}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      監督
                    </TableCell>
                    <TableCell component="th" align="right">
                      本
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {directorsRank.map((director, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}: {director.crews_name}
                      </TableCell>
                      <TableCell align="right">{director.cnt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className={styles.link}>
              <Link href={`/user/${userInfo.id}`}>戻る</Link>
            </div>
          </div>
        )}
      </>
    )
  }

  return <></>
}

export default Directors
