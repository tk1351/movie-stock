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
import styles from '../../styles/components/user/producers.module.css'
import { useFetchCrewsRank } from '../../src/utils/hooks/useFetchCrewsRank'

interface ProducersProps {}

const Producers: NextPage<ProducersProps> = () => {
  const { userInfo } = useRecoilValue(authState)

  const [crewsRank, isLoading, isAuth] = useFetchCrewsRank(3)

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.producersPageWrapper}>
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table>
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      製作
                    </TableCell>
                    <TableCell component="th" align="right">
                      本
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crewsRank.map((producer, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}: {producer.crews_name}
                      </TableCell>
                      <TableCell align="right">{producer.cnt}</TableCell>
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

export default Producers
