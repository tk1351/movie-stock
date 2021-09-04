import React, { FC } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Box,
} from '@material-ui/core'
import styles from '../../styles/components/common/sort.module.css'
import SortButton from './SortButton'

interface SortProps {
  watched: number
}

const Sort: FC<SortProps> = ({ watched }) => {
  return (
    <TableContainer component={Paper} className={styles.wrapper}>
      <Table>
        <TableBody>
          <TableRow key={1}>
            <TableCell component="th" scope="row">
              {watched && (
                <Typography gutterBottom variant="h4" component="h2">
                  <Box fontWeight="fontWeightBold">鑑賞本数: {watched}</Box>
                </Typography>
              )}
            </TableCell>
            <TableCell align="right">
              <SortButton />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Sort
