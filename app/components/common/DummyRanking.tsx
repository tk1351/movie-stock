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
import styles from '../../styles/components/common/dummyRanking.module.css'
import { CrewsRank } from '../../types/movie'

interface DummyRankingProps {
  number: 1 | 2 | 3 | 4
}

const DummyRanking: FC<DummyRankingProps> = ({ number }) => {
  const occupation = (number: 1 | 2 | 3 | 4) => {
    switch (number) {
      case 1:
        return '監督'
      case 2:
        return '脚本'
      case 3:
        return '製作'
      case 4:
        return '撮影'
      default:
        return ''
    }
  }

  const crewsRank: CrewsRank[] = [
    {
      cnt: '10',
      crews_name: 'スタンリー・キューブリック',
      crews_category: 1,
    },
    {
      cnt: '7',
      crews_name: 'アルフレッド・ヒッチコック',
      crews_category: 1,
    },
    {
      cnt: '5',
      crews_name: '黒澤明',
      crews_category: 1,
    },
  ]
  return (
    <div className={styles.crewsTableWrapper}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell component="th" scope="row">
                {occupation(number)}
              </TableCell>
              <TableCell component="th" align="right">
                本
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crewsRank &&
              crewsRank.map((crew: CrewsRank, index: number) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}:
                    <a className={styles.cellLink}>{crew.crews_name}</a>
                  </TableCell>
                  <TableCell align="right">{crew.cnt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DummyRanking
