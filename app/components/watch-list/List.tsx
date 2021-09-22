import React, { FC } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { Loadable } from 'recoil'
import ListTable from './ListTable'
import { IWatchList } from '../../types/watchList'

interface ListProps {
  data: Loadable<IWatchList[]>
  watched: number
  isLoading: boolean
}

const List: FC<ListProps> = ({ data, watched, isLoading }) => {
  return (
    <>
      <Grid container>
        <Grid container justifyContent="center">
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">観たい映画: {watched}本</Box>
          </Typography>
        </Grid>
      </Grid>
      <ListTable watchList={data} isLoading={isLoading} />
    </>
  )
}

export default List
