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
import { StudiosRank } from '../../types/movie'
import { authState } from '../../recoil/atoms/auth'
import { fetchStudiosRank } from '../../src/utils/api/studio'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/studios.module.css'

interface StudiosProps {}

const Studios: NextPage<StudiosProps> = () => {
  const [studiosRank, setStudiosRank] = useState<StudiosRank[]>([])

  const isAuth = useRecoilValueLoadable(authState)
  const { userInfo } = useRecoilValue(authState)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const studios = await fetchStudiosRank(isAuth.contents.accessToken)
        setStudiosRank(studios)
      }
    })()
  }, [isAuth])

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {studiosRank.length === 0 && <Spinner />}
        {isAuthenticated && (
          <div className={styles.studiosPageWrapper}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      制作会社
                    </TableCell>
                    <TableCell component="th" align="right">
                      本
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studiosRank.map((studio, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}: {studio.studios_studio}
                      </TableCell>
                      <TableCell align="right">{studio.cnt}</TableCell>
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

export default Studios
