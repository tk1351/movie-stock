import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import { Button, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import List from '../watch-list/List'
import RegisterForm from '../watch-list/RegisterForm'
import { watchListRegisterFormState } from '../../recoil/atoms/watchListRegisterForm'
import styles from '../../styles/components/user/watchList.module.css'
import { useFetchWatchList } from '../../src/utils/hooks/useFetchWatchList'
import Spinner from '../common/Spinner'

interface WatchListProps {}

const WatchList: FC<WatchListProps> = () => {
  const [data, isLoading] = useFetchWatchList()
  const [open, setOpen] = useRecoilState(watchListRegisterFormState)

  const onClick = () => {
    setOpen((prev) => !prev)
  }
  return (
    <div className={styles.watchListWrapper}>
      {!open && (
        <Grid
          container
          justifyContent="center"
          className={styles.addButtonWrapper}
        >
          <Button color="primary" variant="contained" onClick={() => onClick()}>
            <Add />
          </Button>
        </Grid>
      )}
      {open && <RegisterForm />}
      {isLoading ? (
        <Spinner />
      ) : (
        data.state === 'hasValue' && <List watchList={data.contents} />
      )}
    </div>
  )
}

export default WatchList
