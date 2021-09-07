import React, { FC } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { IWatchList } from '../../types/watchList'
import ListTable from './ListTable'

interface ListProps {
  watchList: IWatchList[]
  watched: number
}

const List: FC<ListProps> = ({ watchList, watched }) => {
  return (
    <>
      <Grid container>
        <Grid container justifyContent="center">
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">観たい映画: {watched}件</Box>
          </Typography>
        </Grid>
      </Grid>
      <ListTable watchList={watchList} />
    </>
  )
}

export default List
