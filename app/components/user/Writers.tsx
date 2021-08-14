import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/writers.module.css'
import { useFetchCrewsRank } from '../../src/utils/hooks/useFetchCrewsRank'

interface WritersProps {}

const Writers: NextPage<WritersProps> = () => {
  const { userInfo } = useRecoilValue(authState)

  const [crewsRank, isLoading, isAuth] = useFetchCrewsRank(2)

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
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
                  {crewsRank.map((writers, index) => (
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
