import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'
import styles from '../../styles/components/common/linkTable.module.css'
import { TableRowType } from '../../src/utils/tableRow'

interface LinkTableProps {
  contents: TableRowType[]
}

const LinkTable: NextPage<LinkTableProps> = ({ contents }) => {
  return (
    <>
      {contents.map((content) => (
        <TableContainer
          component={Paper}
          className={styles.tableContainer}
          key={content.index}
        >
          <Table className={styles.link}>
            <Link href={`/user/${content.route}`}>
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {content.category}
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

export default LinkTable
