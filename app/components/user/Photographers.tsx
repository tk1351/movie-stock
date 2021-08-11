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
import styles from '../../styles/components/user/photographers.module.css'

interface PhotographersProps {}

const Photographers: NextPage<PhotographersProps> = () => {
  const [photographersRank, setPhotographersRank] = useState<CrewsRank[]>([])

  const isAuth = useRecoilValueLoadable(authState)
  const { userInfo } = useRecoilValue(authState)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const photographers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          4
        )
        setPhotographersRank(photographers)
      }
    })()
  }, [isAuth])

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {photographersRank.length === 0 && <Spinner />}
        {isAuthenticated && (
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
                  {photographersRank.map((photographer, index) => (
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
