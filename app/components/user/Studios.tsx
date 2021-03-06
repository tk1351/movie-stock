import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRecoilValueLoadable, useRecoilValue } from 'recoil'
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
import Spinner from '../common/Spinner'
import styles from '../../styles/components/user/studios.module.css'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import BackButton from '../common/BackButton'

interface StudiosProps {}

const useFetchStudiosRank = () => {
  const [studiosRank, setStudiosRank] = useState<StudiosRank[]>([])
  const isAuth = useRecoilValueLoadable(authState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuth.state === 'hasValue') {
      const fetchStudiosRank = async () => {
        setAuthToken(isAuth.contents.accessToken)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/studios/rank`
        const res = await API.get<StudiosRank[]>(url)
        setStudiosRank(res.data)
        setIsLoading(false)
      }
      fetchStudiosRank()
    }
  }, [isAuth])

  return [studiosRank, isLoading, isAuth] as const
}

const Studios: NextPage<StudiosProps> = () => {
  const { userInfo } = useRecoilValue(authState)

  const [studiosRank, isLoading, isAuth] = useFetchStudiosRank()

  if (isAuth.state === 'hasValue') {
    const userName = isAuth.contents.userInfo.name
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Head>
              <title>{userName}の鑑賞ランキング（制作会社） | CineStock</title>
            </Head>
            <div className={styles.studiosPageWrapper}>
              <TableContainer
                component={Paper}
                className={styles.tableContainer}
              >
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
                          {index + 1}:
                          <Link
                            href={{
                              pathname: '/studios',
                              query: { studio: studio.studios_studio },
                            }}
                          >
                            <a className={styles.cellLink}>
                              {studio.studios_studio}
                            </a>
                          </Link>
                        </TableCell>
                        <TableCell align="right">{studio.cnt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <BackButton href={`/user/${userInfo.id}`} text={'戻る'} />
            </div>
          </>
        )}
      </>
    )
  }

  return <></>
}

export default Studios
