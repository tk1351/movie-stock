import React, { FC } from 'react'
import { Grid } from '@material-ui/core'
import styles from '../../styles/components/common/sort.module.css'
import SortButton, { SortCategoryComponentType } from './SortButton'

interface SortProps {
  category: SortCategoryComponentType
  query?: string
  begin?: number
  end?: number
}

const Sort: FC<SortProps> = ({ category, query, begin, end }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Grid container className={styles.sortButton}>
          <SortButton
            category={category}
            query={query}
            begin={begin}
            end={end}
          />
        </Grid>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}

export default Sort
