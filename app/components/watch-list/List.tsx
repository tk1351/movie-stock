import React, { FC } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import { IWatchList } from '../../types/watchList'
import styles from '../../styles/components/watch-list/list.module.css'

interface ListProps {
  watchList: IWatchList[]
}

const List: FC<ListProps> = ({ watchList }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>タイトル</TableCell>
            <TableCell align={'right'}>監督</TableCell>
            <TableCell align={'right'}>製作年</TableCell>
            <TableCell align={'right'}>時間</TableCell>
            <TableCell align={'right'}>URL</TableCell>
          </TableRow>
        </TableHead>
        {watchList.map((column) => (
          <TableBody key={column.id}>
            <TableCell>{column.title}</TableCell>
            <TableCell align={'right'}>{column.director}</TableCell>
            <TableCell align={'right'}>{column.release}</TableCell>
            <TableCell align={'right'}>{column.time}</TableCell>
            <TableCell align={'right'}>{column.url}</TableCell>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  )
}

export default List
