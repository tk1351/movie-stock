import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
} from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { watchedState } from '../../recoil/atoms/movie'
import {
  fetchCrewsByCategory,
  fetchCrewsLength,
  fetchCrewsLengthByCategory,
} from '../../src/utils/api/crew'
import Spinner from '../common/Spinner'
import { ICrew } from '../../types/movie'
import API, { offset, limit } from '../../src/utils/api/api'
import { crewsState } from '../../recoil/atoms/crew'
import CrewItem from './CrewItem'
import { fetchCrewsState } from '../../recoil/selectors/crew'
import styles from '../../styles/components/movie/crews.module.css'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import BackHistoryButton from '../common/BackHistoryButton'

interface CrewsPageProps {}

export type CategoryValue = 0 | 1 | 2 | 3 | 4

const useFectchCrews = () => {
  const router = useRouter()
  const accessToken = useRecoilValueLoadable(authState)
  const [crews, setCrews] = useRecoilState<ICrew[]>(crewsState)
  const [watched, setWatched] = useRecoilState(watchedState)

  const [isLoading, setIsLoading] = useState(true)

  const name = router.query.name as string

  console.log('useFetchCrews')

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const fetchCrews = async () => {
          setAuthToken(accessToken.contents.accessToken)
          const url = `${
            process.env.NEXT_PUBLIC_API_URL
          }/crews?name=${encodeURI(name)}&offset=${offset}&limit=${limit}`
          const res = await API.get<ICrew[]>(url)
          setCrews(res.data)
          setIsLoading(false)
        }
        const watchedNumber = await fetchCrewsLength(
          accessToken.contents.accessToken,
          name
        )
        fetchCrews()
        setWatched(watchedNumber)
      }
    })()
  }, [accessToken])

  return [crews, watched, isLoading] as const
}

const Crews: NextPage<CrewsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const setWatched = useSetRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<ICrew[]>(fetchCrewsState)

  const [hasMore, setHasMore] = useState(true)
  const [category, setCategory] = useState<CategoryValue>(0)

  const name = router.query.name as string

  const [crews, watched, isLoading] = useFectchCrews()

  const switchUrl = () => {
    switch (category) {
      case 0:
        return `${process.env.NEXT_PUBLIC_API_URL}/crews?name=${encodeURI(
          name
        )}&offset=${crews.length}&limit=${limit}`

      case 1:
      case 2:
      case 3:
      case 4:
        return `${process.env.NEXT_PUBLIC_API_URL}/crews?name=${encodeURI(
          name
        )}&category=${category}&offset=${crews.length}&limit=${limit}`

      default:
        return ''
    }
  }

  const loadMore = async () => {
    // category === 0で全体のdataを取得
    // categoryが1~4の場合は各category毎のAPIを取得

    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const { data } = await API.get<ICrew[]>(switchUrl())

    setIsFetched([...crews, ...data])

    if (data.length < 1) {
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as CategoryValue

    // MenuItemのvalueをcategoryに渡す
    setCategory(value)

    // category毎にAPIを叩き、ICrew[]とnumberを取得
    if (accessToken.state === 'hasValue') {
      const data = await fetchCrewsByCategory(
        accessToken.contents.accessToken,
        name,
        value
      )
      const length = await fetchCrewsLengthByCategory(
        accessToken.contents.accessToken,
        name,
        value
      )

      // crewStateとwatchStateの中身を書き換える
      setIsFetched([...data])
      setWatched(length)

      // dataが30個以上ある場合にloadMoreが発動するようにする
      setHasMore(true)
    }
  }

  const orderedCrews = crews
    .slice()
    .sort((a, b) => Number(b.movie.release) - Number(a.movie.release))

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Head>
            <title>{name}の検索結果 | CineStock</title>
          </Head>
          <Grid container justifyContent="center" className={styles.header}>
            <Typography gutterBottom variant="h4" component="h2">
              <Box fontWeight="fontWeightBold">
                {name}の検索結果 {watched}件
              </Box>
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                職種
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={category}
                onChange={handleChange}
                label="職種"
              >
                <MenuItem value={1}>監督</MenuItem>
                <MenuItem value={2}>脚本</MenuItem>
                <MenuItem value={3}>製作</MenuItem>
                <MenuItem value={4}>撮影</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
            <Grid container spacing={2} className={styles.list}>
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Grid container spacing={5}>
                  {orderedCrews.map((crew) => (
                    <CrewItem key={crew.id} crew={crew} />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </InfiniteScroll>
          <BackHistoryButton />
        </>
      )}
    </>
  )
}

export default Crews
