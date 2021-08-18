import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core'
import styles from '../../styles/components/user/activity.module.css'

interface ActivityProps {
  watched: number
}

const Activity: NextPage<ActivityProps> = ({ watched }) => {
  const rows = [{ index: 1, name: '鑑賞本数', number: watched }]

  const activityRows = [
    { index: 1, category: '監督', route: 'directors' },
    { index: 2, category: '脚本', route: 'writers' },
    { index: 3, category: '製作', route: 'producers' },
    { index: 4, category: '撮影', route: 'photographers' },
    { index: 5, category: '製作国', route: 'countries' },
    { index: 6, category: '制作会社', route: 'studios' },
  ]

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
      {activityRows.map((activityRow) => (
        <TableContainer
          component={Paper}
          className={styles.tableContainer}
          key={activityRow.index}
        >
          <Table className={styles.link}>
            <Link href={`/user/${activityRow.route}`}>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {activityRow.category}
                  </TableCell>
                  <TableCell component="th" align="right"></TableCell>
                </TableRow>
              </TableHead>
            </Link>
          </Table>
        </TableContainer>
      ))}
    </>
  )
}

export default Activity
