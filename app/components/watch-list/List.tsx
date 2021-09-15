import React, { FC } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import ListTable from './ListTable'
import { useFetchWatchList } from '../../src/utils/hooks/useFetchWatchList'

interface ListProps {}

const List: FC<ListProps> = () => {
  const [data, watched, isLoading] = useFetchWatchList()
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
