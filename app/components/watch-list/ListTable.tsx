import React, { FC, useEffect } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import styles from '../../styles/components/watch-list/listTable.module.css'
import { IWatchList } from '../../types/watchList'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'
import { scrollState } from '../../recoil/atoms/scroll'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { limit } from '../../src/utils/api/api'
import Spinner from '../common/Spinner'
import { watchListState } from '../../recoil/atoms/watchList'
import { watchListSelector } from '../../recoil/selectors/watchList'

interface ListTableProps {}

interface Column {
  id: number
  label: string
  align?: 'right'
}

const columns: Column[] = [
  { id: 1, label: 'タイトル' },
  { id: 2, label: '監督', align: 'right' },
  { id: 3, label: '製作年', align: 'right' },
  { id: 4, label: '時間', align: 'right' },
  { id: 5, label: 'URL', align: 'right' },
]

const ListTable: FC<ListTableProps> = () => {
  const accessToken = useRecoilValueLoadable(authState)
  const [hasMore, setHasMore] = useRecoilState(scrollState)
  const data = useRecoilValueLoadable<IWatchList[]>(watchListState)
  const setIsFetched = useSetRecoilState(watchListSelector)
  const URL_MAX_LENGTH = 30

  useEffect(() => {
    setHasMore(true)
  }, [])

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list?offset=${data.contents.length}&limit=${limit}`
    const res = await API.get<[IWatchList[], number]>(url)

    const listData = res.data[0]

    setIsFetched([...data.contents, ...listData])

    if (listData.length < 1) {
      setHasMore(false)
    }
  }

  const loader = <Spinner key={0} />

  return (
    <TableContainer component={Paper}>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.state === 'hasValue' &&
              data.contents.map((column) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={column.id}>
                  <TableCell>{column.title}</TableCell>
                  <TableCell align={'right'}>{column.director}</TableCell>
                  <TableCell align={'right'}>{column.release}</TableCell>
                  <TableCell align={'right'}>{column.time}</TableCell>
                  <TableCell align={'right'}>
                    <a
                      href={column.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {column.url && column.url.length > URL_MAX_LENGTH
                        ? column.url.substr(0, URL_MAX_LENGTH) + '...'
                        : column.url}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  )
}

export default ListTable
