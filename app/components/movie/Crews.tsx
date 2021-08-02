import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useRecoilStateLoadable,
  useRecoilState,
  useSetRecoilState,
} from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import { authState } from '../../recoil/atoms/auth'
import { watchedState } from '../../recoil/atoms/movie'
import {
  fetchCrewsByCategory,
  fetchCrews,
  fetchCrewsLength,
  fetchCrewsLengthByCategory,
} from '../../src/utils/api/movie'
import Spinner from '../common/Spinner'
import { ICrew } from '../../types/movie'
import API from '../../src/utils/api/api'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { crewsState } from '../../recoil/atoms/crew'
import CrewItem from './CrewItem'
import { fetchCrewsState } from '../../recoil/selectors/crew'

interface CrewsPageProps {}

const Crews: NextPage<CrewsPageProps> = () => {
  const router = useRouter()

  const accessToken = useRecoilValueLoadable(authState)
  const [crews, setCrews] = useRecoilStateLoadable<ICrew[]>(crewsState)
  const [watched, setWatched] = useRecoilState(watchedState)
  const setIsFetched = useSetRecoilState<ICrew[]>(fetchCrewsState)

  const [hasMore, setHasMore] = useState(true)

  const name = router.query.name as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const crewsData = await fetchCrews(
          accessToken.contents.accessToken,
          name
        )
        const watchedNumber = await fetchCrewsLength(
          accessToken.contents.accessToken,
          name
        )
        setCrews(crewsData)
        setWatched(watchedNumber)
      }
    })()
  }, [accessToken])

  const loadMore = async () => {
    const limit: number = 30

    const url = `${process.env.NEXT_PUBLIC_API_URL}/crews?name=${encodeURI(
      name
    )}&offset=${crews.contents.length}&limit=${limit}`
    const res = await API.get<ICrew[]>(url)

    try {
      setIsFetched([...crews.contents, ...res.data])
    } finally {
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  const [category, setCategory] = useState('')

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string)
    if (accessToken.state === 'hasValue') {
      const data = await fetchCrewsByCategory(
        accessToken.contents.accessToken,
        name,
        Number(event.target.value)
      )
      const length = await fetchCrewsLengthByCategory(
        accessToken.contents.accessToken,
        name,
        Number(event.target.value)
      )
      setIsFetched([...data])
      setWatched(length)
    }
  }

  return (
    <div>
      <h1>スタッフ: {name}の検索結果</h1>
      <p>{watched}件</p>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">職種</InputLabel>
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
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        <CrewItem crews={crews.contents} />
      </InfiniteScroll>
    </div>
  )
}

export default Crews
