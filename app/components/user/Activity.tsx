import React from 'react'
import { NextPage } from 'next'
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core'
import LinkTable from '../common/LinkTable'
import { activityRows } from '../../src/utils/tableRow'

interface ActivityProps {
  watched: number
}

const Activity: NextPage<ActivityProps> = ({ watched }) => {
  const rows = [{ index: 1, name: '鑑賞本数', number: watched }]

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LinkTable contents={activityRows} />
    </>
  )
}

export default Activity
