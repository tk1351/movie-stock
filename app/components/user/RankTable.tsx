import React from 'react'
import { NextPage } from 'next'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core'
import { CrewsRank, CountriesRank, StudiosRank } from '../../types/movie'
import styles from '../../styles/components/user/rankTable.module.css'

interface RankTableProps {
  watched: number
  directorsRank: CrewsRank[]
  writersRank: CrewsRank[]
  producersRank: CrewsRank[]
  photographersRank: CrewsRank[]
  countriesRank: CountriesRank[]
  studiosRank: StudiosRank[]
}

const RankTable: NextPage<RankTableProps> = ({
  watched,
  directorsRank,
  writersRank,
  producersRank,
  photographersRank,
  countriesRank,
  studiosRank,
}) => {
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
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                監督
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directorsRank.map((director, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}: {director.crews_name}
                </TableCell>
                <TableCell align="right">{director.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                脚本
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {writersRank.map((writer, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}: {writer.crews_name}
                </TableCell>
                <TableCell align="right">{writer.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                製作
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {producersRank.map((producer, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}: {producer.crews_name}
                </TableCell>
                <TableCell align="right">{producer.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                撮影
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {photographersRank.map((photographer, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}: {photographer.crews_name}
                </TableCell>
                <TableCell align="right">{photographer.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                製作国
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countriesRank.map((country, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}: {country.countries_country}
                </TableCell>
                <TableCell align="right">{country.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                制作会社
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studiosRank.map((studio, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}: {studio.studios_studio}
                </TableCell>
                <TableCell align="right">{studio.cnt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RankTable
