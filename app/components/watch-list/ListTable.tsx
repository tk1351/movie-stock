import React, { FC, useEffect } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
  Loadable,
} from 'recoil'
import InfiniteScroll from 'react-infinite-scroller'
import styles from '../../styles/components/watch-list/listTable.module.css'
import { IWatchList } from '../../types/watchList'
import { scrollState } from '../../recoil/atoms/scroll'
import { authState, Auth } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { limit } from '../../src/utils/api/api'
import Spinner from '../common/Spinner'
import { watchListSelector } from '../../recoil/selectors/watchList'
import EditDialog from './EditDialog'
import { menuState } from '../../recoil/atoms/open'
import EditMenu from './EditMenu'
import { currentColumnState } from '../../recoil/atoms/watchList'

interface ListTableProps {
  watchList: Loadable<IWatchList[]>
}

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
  { id: 6, label: '', align: 'right' },
]

const ListTable: FC<ListTableProps> = ({ watchList }) => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const [hasMore, setHasMore] = useRecoilState<boolean>(scrollState)
  const setIsFetched = useSetRecoilState<IWatchList[]>(watchListSelector)
  const URL_MAX_LENGTH = 30

  useEffect(() => {
    setHasMore(true)
  }, [])

  const loadMore = async () => {
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list?offset=${watchList.contents.length}&limit=${limit}`
    const res = await API.get<[IWatchList[], number]>(url)

    const listData = res.data[0]

    setIsFetched([...watchList.contents, ...listData])

    if (listData.length < 1) {
      setHasMore(false)
    }
  }

  const setAnchorEl = useSetRecoilState<null | HTMLElement>(menuState)
  const setCurrentColumn = useSetRecoilState<IWatchList | null>(
    currentColumnState
  )

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    column: IWatchList
  ) => {
    setAnchorEl(e.currentTarget)
    setCurrentColumn(column)
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
            {watchList.state === 'hasValue' &&
              watchList.contents.map((column) => (
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
                  <TableCell align={'right'}>
                    <IconButton
                      size={'small'}
                      onClick={(e) => handleClick(e, column)}
                      aria-haspopup="true"
                      aria-controls="edit-menu"
                    >
                      <MoreHoriz fontSize={'small'} />
                    </IconButton>
                    <EditMenu />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
      <EditDialog />
    </TableContainer>
  )
}

export default ListTable
