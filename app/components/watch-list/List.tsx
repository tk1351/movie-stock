import React, { FC } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { IWatchList } from '../../types/watchList'
import ListTable from './ListTable'

interface ListProps {
  watchList: IWatchList[]
}

const List: FC<ListProps> = ({ watchList }) => {
  return (
    <>
      <Grid container>
        <Grid container justifyContent="center">
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">
              観たい映画: {watchList.length}本
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <ListTable watchList={watchList} />
    </>
  )
}

export default List
