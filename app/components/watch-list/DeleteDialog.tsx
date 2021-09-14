import React, { FC } from 'react'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'
import { menuState, dialogState } from '../../recoil/atoms/open'
import { IWatchList } from '../../types/watchList'
import {
  currentColumnState,
  watchListState,
} from '../../recoil/atoms/watchList'
import { Auth, authState } from '../../recoil/atoms/auth'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IMessage } from '../../types/defaultType'
import { watchedState } from '../../recoil/atoms/movie'

interface DeleteDialogProps {}

const DeleteDialog: FC<DeleteDialogProps> = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)
  const [watchList, setWatchList] = useRecoilState<IWatchList[]>(watchListState)
  const setAnchorEl = useSetRecoilState<null | HTMLElement>(menuState)
  const currentColumn = useRecoilValue<IWatchList | null>(currentColumnState)
  const [dialog, setDialog] = useRecoilState(dialogState)
  const [watched, setWatched] = useRecoilState<number>(watchedState)

  const handleCloseOpen = () => {
    setDialog({ open: false, category: undefined })
    setAnchorEl(null)
  }

  const deleteWatchList = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list/delete/${id}`
    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)
      const res = await API.delete<IMessage>(url)

      const watchListIndex = watchList.findIndex((item) => item.id === id)
      const newWatchList = watchList.slice()
      newWatchList.splice(watchListIndex, 1)
      setWatchList([...newWatchList])
      setWatched(watched - 1)
      setIsAlert({
        msg: res.data.message,
        alertType: 'succeeded',
        open: true,
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <Dialog open={dialog.open} onClick={handleCloseOpen}>
      {currentColumn && (
        <>
          <DialogTitle>{currentColumn.title}を削除する</DialogTitle>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => deleteWatchList(currentColumn.id)}
            >
              削除する
            </Button>
            <Button color="default" onClick={handleCloseOpen}>
              キャンセル
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default DeleteDialog
