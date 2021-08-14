import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import {
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
} from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/directors.module.css'
import { useFetchCrewsRank } from '../../src/utils/hooks/useFetchCrewsRank'

interface DirectorsProps {}

const Directors: NextPage<DirectorsProps> = () => {
  const { userInfo } = useRecoilValue(authState)

  const [crewsRank, isLoading, isAuth] = useFetchCrewsRank(1)

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
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
                  {crewsRank.map((director, index) => (
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
