import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRecoilValueLoadable, useRecoilValue } from 'recoil'
import { useAuth0 } from '@auth0/auth0-react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core'
import { CrewsRank } from '../../types/movie'
import { fetchCrewsRankByCategory } from '../../src/utils/api/crew'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/writers.module.css'

interface WritersProps {}

const Writers: NextPage<WritersProps> = () => {
  const [writersRank, setWritersRank] = useState<CrewsRank[]>([])

  const isAuth = useRecoilValueLoadable(authState)
  const { userInfo } = useRecoilValue(authState)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const writers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          2
        )
        setWritersRank(writers)
      }
    })()
  }, [isAuth])

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {writersRank.length === 0 && <Spinner />}
        {isAuthenticated && (
          <div className={styles.writersPageWrapper}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      脚本
                    </TableCell>
                    <TableCell component="th" align="right">
                      本
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {writersRank.map((writers, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}: {writers.crews_name}
                      </TableCell>
                      <TableCell align="right">{writers.cnt}</TableCell>
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

export default Writers
