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
import styles from '../../styles/components/user/photographers.module.css'
import { useFetchCrewsRank } from '../../src/utils/hooks/useFetchCrewsRank'

interface PhotographersProps {}

const Photographers: NextPage<PhotographersProps> = () => {
  const { userInfo } = useRecoilValue(authState)

  const [crewsRank, isLoading, isAuth] = useFetchCrewsRank(4)

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.photographersPageWrapper}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      撮影
                    </TableCell>
                    <TableCell component="th" align="right">
                      本
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crewsRank.map((photographer, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}: {photographer.crews_name}
                      </TableCell>
                      <TableCell align="right">{photographer.cnt}</TableCell>
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

export default Photographers
