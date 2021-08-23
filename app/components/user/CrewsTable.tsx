import React from 'react'
import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import Link from 'next/link'
import Head from 'next/head'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import styles from '../../styles/components/user/crewsTable.module.css'
import { useFetchCrewsRank } from '../../src/utils/hooks/useFetchCrewsRank'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import { CrewsRank } from '../../types/movie'

interface CrewsTableProps {
  number: 1 | 2 | 3 | 4
}

const CrewsTable: NextPage<CrewsTableProps> = ({ number }) => {
  const { userInfo } = useRecoilValue(authState)
  const [crewsRank, isLoading, isAuth] = useFetchCrewsRank(number)

  const occupation = (number: 1 | 2 | 3 | 4) => {
    switch (number) {
      case 1:
        return '監督'
      case 2:
        return '脚本'
      case 3:
        return '製作'
      case 4:
        return '撮影'
      default:
        return ''
    }
  }

  if (isAuth.state === 'hasValue') {
    const userName = isAuth.contents.userInfo.name
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Head>
              <title>{userName}の鑑賞ランキング（スタッフ） | CineStock</title>
            </Head>
            <div className={styles.crewsTableWrapper}>
              <TableContainer
                component={Paper}
                className={styles.tableContainer}
              >
                <Table>
                  <TableHead className={styles.tableHead}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {occupation(number)}
                      </TableCell>
                      <TableCell component="th" align="right">
                        本
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {crewsRank.map((crew: CrewsRank, index: number) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}:
                          <Link
                            href={{
                              pathname: '/crews',
                              query: { name: crew.crews_name },
                            }}
                          >
                            <a className={styles.cellLink}>{crew.crews_name}</a>
                          </Link>
                        </TableCell>
                        <TableCell align="right">{crew.cnt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={styles.link}>
                <Link href={`/user/${userInfo.id}`}>
                  <a>戻る</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  return <></>
}

export default CrewsTable
