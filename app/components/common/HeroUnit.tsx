import React, { FC } from 'react'
import { Container, Typography, Grid, Button } from '@material-ui/core'

interface HeroUnitProps {}

const HeroUnit: FC<HeroUnitProps> = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        CineStock
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        映画鑑賞 記録・集計サービス
      </Typography>
      <Typography
        variant="subtitle2"
        align="center"
        color="textSecondary"
        paragraph
      >
        鑑賞した映画を記録、スタッフや製作年ごとの集計をすることで次の鑑賞がより楽しく
      </Typography>
      <div>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary">
              ユーザー登録
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="default">
              ログイン
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default HeroUnit
