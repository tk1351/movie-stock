import React from 'react'
import { NextPage } from 'next'
import { Grid, Typography, Box } from '@material-ui/core'
import { Loadable } from 'recoil'
import { Auth } from '../../recoil/atoms/auth'
import styles from '../../styles/components/common/myPageHeader.module.css'

interface MyPageHeaderProps {
  isAuth: Loadable<Auth>
  deleteDomain: (userName: string) => string
}

const MyPageHeader: NextPage<MyPageHeaderProps> = ({
  isAuth,
  deleteDomain,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container justifyContent="center" className={styles.header}>
        {isAuth.contents.userInfo && (
          <Typography gutterBottom variant="h4" component="h2">
            <Box fontWeight="fontWeightBold">
              {deleteDomain(isAuth.contents.userInfo.name)}
            </Box>
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default MyPageHeader
