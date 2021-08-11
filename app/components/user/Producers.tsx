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
import { fetchCrewsRankByCategory } from '../../src/utils/api/crew'
import { CrewsRank } from '../../types/movie'
import { authState } from '../../recoil/atoms/auth'
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/producers.module.css'

interface ProducersProps {}

const Producers: NextPage<ProducersProps> = () => {
  const [producersRank, setProducersRank] = useState<CrewsRank[]>([])

  const isAuth = useRecoilValueLoadable(authState)
  const { userInfo } = useRecoilValue(authState)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const producers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          3
        )
        setProducersRank(producers)
      }
    })()
  }, [isAuth])

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {producersRank.length === 0 && <Spinner />}
        {isAuthenticated && (
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
                  {producersRank.map((producer, index) => (
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
