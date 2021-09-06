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
import SortButton, { SortCategoryComponentType } from './SortButton'

interface SortProps {
  watched: number
  category: SortCategoryComponentType
  query?: string
  begin?: number
  end?: number
}

const Sort: FC<SortProps> = ({ watched, category, query, begin, end }) => {
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
              <SortButton
                category={category}
                query={query}
                begin={begin}
                end={end}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Sort
