import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import { Grid, Typography, Box } from '@material-ui/core'
import Spinner from '../common/Spinner'
import { authState } from '../../recoil/atoms/auth'
import styles from '../../styles/components/user/myPage.module.css'
import { watchedState } from '../../recoil/atoms/movie'
import { fetchWatchedNumber } from '../../src/utils/api/movie'
import { fetchCrewsRankByCategory } from '../../src/utils/api/crew'
import { CrewsRank, CountriesRank, StudiosRank } from '../../types/movie'
import RankTable from './RankTable'
import { fetchCountriesRank } from '../../src/utils/api/country'
import { fetchStudiosRank } from '../../src/utils/api/studio'

interface MyPageProps {}

const MyPage: NextPage<MyPageProps> = () => {
  const isAuth = useRecoilValueLoadable(authState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const [directorsRank, setDirectorsRank] = useState<CrewsRank[]>([])
  const [writersRank, setWritersRank] = useState<CrewsRank[]>([])
  const [producersRank, setProducersRank] = useState<CrewsRank[]>([])
  const [photographersRank, setPhotographersRank] = useState<CrewsRank[]>([])
  const [countriesRank, setCountriesRank] = useState<CountriesRank[]>([])
  const [studiosRank, setStudiosRank] = useState<StudiosRank[]>([])

  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        const directors = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          1
        )
        const writers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          2
        )
        const producers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          3
        )
        const photographers = await fetchCrewsRankByCategory(
          isAuth.contents.accessToken,
          4
        )
        const countries = await fetchCountriesRank(isAuth.contents.accessToken)
        const studios = await fetchStudiosRank(isAuth.contents.accessToken)
        setDirectorsRank(directors)
        setWritersRank(writers)
        setProducersRank(producers)
        setPhotographersRank(photographers)
        setCountriesRank(countries)
        setStudiosRank(studios)
      }
    })()
  }, [isAuth])

  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue' && watched === 0) {
        const watchedNumber = await fetchWatchedNumber(
          isAuth.contents.accessToken
        )
        setWatched(watchedNumber)
      }
    })()
  }, [isAuth])

  if (isLoading) return <Spinner />

  if (isAuth.state === 'hasValue') {
    return (
      <>
        {isAuthenticated && (
          <Grid container className={styles.myPageWrapper}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" className={styles.header}>
                {isAuth.contents.userInfo && (
                  <Typography gutterBottom variant="h4" component="h2">
                    <Box fontWeight="fontWeightBold">
                      {isAuth.contents.userInfo.name}
                    </Box>
                  </Typography>
                )}
              </Grid>
            </Grid>
            <RankTable
              watched={watched}
              directorsRank={directorsRank}
              writersRank={writersRank}
              producersRank={producersRank}
              photographersRank={photographersRank}
              countriesRank={countriesRank}
              studiosRank={studiosRank}
            />
          </Grid>
        )}
      </>
    )
  }

  return <></>
}

export default MyPage
