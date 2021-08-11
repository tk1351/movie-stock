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
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.link}>
          <Link href="/user/directors">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell component="th" scope="row">
                  監督
                </TableCell>
                <TableCell component="th" align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Link>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.link}>
          <Link href="/user/writers">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell component="th" scope="row">
                  脚本
                </TableCell>
                <TableCell component="th" align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Link>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.link}>
          <Link href="/user/producers">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell component="th" scope="row">
                  製作
                </TableCell>
                <TableCell component="th" align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Link>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.link}>
          <Link href="/user/photographers">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell component="th" scope="row">
                  撮影
                </TableCell>
                <TableCell component="th" align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Link>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.link}>
          <Link href="/user/countries">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell component="th" scope="row">
                  製作国
                </TableCell>
                <TableCell component="th" align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Link>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.link}>
          <Link href="/user/studios">
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell component="th" scope="row">
                  制作会社
                </TableCell>
                <TableCell component="th" align="right"></TableCell>
              </TableRow>
            </TableHead>
          </Link>
        </Table>
      </TableContainer>
    </>
  )
}

export default Activity
