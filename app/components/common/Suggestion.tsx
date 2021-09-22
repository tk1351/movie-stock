import React, { FC } from 'react'
import Link from 'next/link'
import { Grid, Typography, Button } from '@material-ui/core'

const Suggestion: FC = () => {
  return (
    <Grid container justifyContent="center">
      <Typography gutterBottom variant="h4" component="h2">
        <Button color="primary" variant="contained">
          <Link href="/register">
            <a>映画を登録しよう</a>
          </Link>
        </Button>
      </Typography>
    </Grid>
  )
}

export default Suggestion
