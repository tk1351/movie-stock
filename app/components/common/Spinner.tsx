import React from 'react'
import { NextPage } from 'next'
import { Grid, CircularProgress } from '@material-ui/core'

const Spinner: NextPage = () => {
  return (
    <Grid container justifyContent="center">
      <CircularProgress />
    </Grid>
  )
}

export default Spinner
