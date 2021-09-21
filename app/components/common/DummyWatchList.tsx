import React, { FC } from 'react'
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
import { IWatchList } from '../../types/watchList'
import styles from '../../styles/components/common/dummyWatchList.module.css'
import { columns, URL_MAX_LENGTH } from '../watch-list/ListTable'
import { MoreHoriz } from '@material-ui/icons'

interface DummyWatchListProps {
  watchList: IWatchList[]
}

const DummyWatchList: FC<DummyWatchListProps> = ({ watchList }) => {
  return (
    <div className={styles.watchListWrapper}>
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
          <TableBody>
            {watchList.map((column) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={column.id}>
                <TableCell>{column.title}</TableCell>
                <TableCell align={'right'}>{column.director}</TableCell>
                <TableCell align={'right'}>{column.release}</TableCell>
                <TableCell align={'right'}>{column.time}</TableCell>
                <TableCell align={'right'}>
                  <a
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
                    aria-haspopup="true"
                    aria-controls="edit-menu"
                  >
                    <MoreHoriz fontSize={'small'} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DummyWatchList
