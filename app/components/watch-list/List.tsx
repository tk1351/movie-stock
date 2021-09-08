import React, { FC } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import ListTable from './ListTable'
import { useFetchWatchList } from '../../src/utils/hooks/useFetchWatchList'
import Spinner from '../common/Spinner'

interface ListProps {}

const List: FC<ListProps> = () => {
  const [data, isLoading] = useFetchWatchList()
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Grid container>
            <Grid container justifyContent="center">
              <Typography gutterBottom variant="h4" component="h2">
                <Box fontWeight="fontWeightBold">
                  観たい映画: {data.contents.length}本
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <ListTable />
        </>
      )}
    </>
  )
}

export default List
