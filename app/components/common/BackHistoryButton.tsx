import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid } from '@material-ui/core'

interface BackHistoryButtonProps {}

const BackHistoryButton: FC<BackHistoryButtonProps> = () => {
  const router = useRouter()

  const onClick = () => {
    router.back()
  }

  return (
    <Grid container>
      <Button variant="contained" color="default" onClick={() => onClick()}>
        戻る
      </Button>
    </Grid>
  )
}

export default BackHistoryButton
