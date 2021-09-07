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
import styles from '../../styles/components/watch-list/listTable.module.css'
import { IWatchList } from '../../types/watchList'

interface ListTableProps {
  watchList: IWatchList[]
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
]

const ListTable: FC<ListTableProps> = ({ watchList }) => {
  return (
    <TableContainer component={Paper}>
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
        {watchList.map((column) => (
          <TableBody key={column.id}>
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
                  {column.url}
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </TableContainer>
  )
}

export default ListTable
