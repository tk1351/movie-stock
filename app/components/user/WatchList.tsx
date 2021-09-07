import React, { FC, useEffect } from 'react'
import API from '../../src/utils/api/api'
import { useRecoilValueLoadable, useRecoilState } from 'recoil'
import { Button } from '@material-ui/core'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { IWatchList } from '../../types/watchList'
import List from '../watch-list/List'
import RegisterForm from '../watch-list/RegisterForm'
import { watchListRegisterFormState } from '../../recoil/atoms/watchListRegisterForm'
import { watchListState } from '../../recoil/atoms/watchList'
import styles from '../../styles/components/user/watchList.module.css'

interface WatchListProps {}

const WatchList: FC<WatchListProps> = () => {
  const [data, setData] = useRecoilState<IWatchList[]>(watchListState)
  const [open, setOpen] = useRecoilState(watchListRegisterFormState)

  const isAuth = useRecoilValueLoadable(authState)
  useEffect(() => {
    ;(async () => {
      if (isAuth.state === 'hasValue') {
        setAuthToken(isAuth.contents.accessToken)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list`
        const res = await API.get<[IWatchList[], number]>(url)
        setData(res.data[0])
      }
    })()
  }, [isAuth])

  const onClick = () => {
    setOpen((prev) => !prev)
  }
  return (
    <div className={styles.watchListWrapper}>
      <div>
        <Button color="primary" variant="contained" onClick={() => onClick()}>
          登録
        </Button>
        {open && <RegisterForm />}
      </div>
      {data && <List watchList={data} />}
    </div>
  )
}

export default WatchList
