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
import { CountriesRank } from '../../types/movie'
import { authState } from '../../recoil/atoms/auth'
import styles from '../../styles/components/user/countries.module.css'
import Spinner from '../common/Spinner'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'

interface CountriesProps {}

const useFetchCountriesRank = () => {
  const [countriesRank, setCountriesRank] = useState<CountriesRank[]>([])
  const isAuth = useRecoilValueLoadable(authState)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuth.state === 'hasValue') {
      const fetchCountriesRank = async () => {
        setAuthToken(isAuth.contents.accessToken)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/countries/rank`
        const res = await API.get<CountriesRank[]>(url)
        setCountriesRank(res.data)
        setIsLoading(false)
      }
      fetchCountriesRank()
    }
  }, [isAuth])

  return [countriesRank, isLoading, isAuth] as const
}

const Countries: NextPage<CountriesProps> = () => {
  const { userInfo } = useRecoilValue(authState)

  const [countriesRank, isLoading, isAuth] = useFetchCountriesRank()

  if (isAuth.state === 'hasValue') {
    const userName = isAuth.contents.userInfo.name
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Head>
              <title>{userName}の鑑賞ランキング（製作国） | CineStock</title>
            </Head>
            <div className={styles.countriesPageWrapper}>
              <TableContainer
                component={Paper}
                className={styles.tableContainer}
              >
                <Table>
                  <TableHead className={styles.tableHead}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        製作国
                      </TableCell>
                      <TableCell component="th" align="right">
                        本
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {countriesRank.map((country, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}:
                          <Link
                            href={{
                              pathname: '/countries',
                              query: { country: country.countries_country },
                            }}
                          >
                            <a className={styles.cellLink}>
                              {' '}
                              {country.countries_country}
                            </a>
                          </Link>
                        </TableCell>
                        <TableCell align="right">{country.cnt}</TableCell>
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

export default Countries
