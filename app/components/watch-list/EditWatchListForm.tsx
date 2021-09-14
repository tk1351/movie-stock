import React, { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  DialogContent,
} from '@material-ui/core'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IWatchList, IWatchListInputs } from '../../types/watchList'
import { dialogState, menuState } from '../../recoil/atoms/open'
import { Auth, authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IMessage } from '../../types/defaultType'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { watchListState } from '../../recoil/atoms/watchList'

interface EditWatchListFormProps {
  currentColumn: IWatchList | null
}

const EditWatchListForm: FC<EditWatchListFormProps> = ({ currentColumn }) => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const [dialog, setDialog] = useRecoilState(dialogState)
  const setAnchorEl = useSetRecoilState<null | HTMLElement>(menuState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)
  const [watchList, setWatchList] = useRecoilState<IWatchList[]>(watchListState)

  const handleCloseOpen = () => {
    setDialog({ open: false, category: undefined })
    setAnchorEl(null)
  }

  const defaultValues: IWatchListInputs = {
    title: String(currentColumn?.title),
    director: String(currentColumn?.director),
    release: String(currentColumn?.release),
    time: String(currentColumn?.time),
    url: String(currentColumn?.url),
  }

  const { control, handleSubmit } = useForm<IWatchListInputs>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<IWatchListInputs> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list/update/${currentColumn?.id}
`
    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)
      const res = await API.patch<[IMessage, IWatchList]>(url, data)
      const message = res.data[0].message
      const newData = res.data[1]

      setIsAlert({
        msg: message,
        alertType: 'succeeded',
        open: true,
      })

      const watchListIndex = watchList.findIndex(
        (item) => item.id === currentColumn?.id
      )
      const newWatchList = watchList.slice()
      newWatchList.splice(watchListIndex, 1, newData)
      setWatchList([...newWatchList])

      handleCloseOpen()
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <Dialog open={dialog.open}>
      {currentColumn && (
        <>
          <DialogTitle>{currentColumn.title}を編集する</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label={'タイトル'}
                      id="title"
                      type="text"
                      name="title"
                      variant="outlined"
                      defaultValue={currentColumn.title}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="director"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label={'監督'}
                      id="director"
                      type="text"
                      name="director"
                      variant="outlined"
                      defaultValue={currentColumn.director}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="release"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label={'製作年'}
                      id="release"
                      type="text"
                      name="release"
                      variant="outlined"
                      defaultValue={currentColumn.release}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label={'時間'}
                      id="time"
                      type="text"
                      name="time"
                      variant="outlined"
                      defaultValue={currentColumn.time}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="url"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label={'URL'}
                      id="url"
                      type="text"
                      name="url"
                      variant="outlined"
                      defaultValue={currentColumn.url}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <Button color="primary" type="submit" variant="contained">
                編集する
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="default" onClick={handleCloseOpen}>
              キャンセル
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default EditWatchListForm
