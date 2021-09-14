import React, { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  DialogContent,
  Grid,
} from '@material-ui/core'
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IWatchList, IWatchListInputs } from '../../types/watchList'
import { dialogState, menuState } from '../../recoil/atoms/open'
import { Auth, authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IMessage } from '../../types/defaultType'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { watchListState } from '../../recoil/atoms/watchList'
import styles from '../../styles/components/watch-list/editWatchListForm.module.css'
import { watchListValidationSchema } from '../../src/utils/watchListValidation'

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
    resolver: yupResolver(watchListValidationSchema),
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
          <DialogTitle>
            <Grid container justifyContent="center">
              {currentColumn.title}を編集する
            </Grid>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={styles.textField}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'タイトル'}
                      id="title"
                      type="text"
                      name="title"
                      variant="outlined"
                      defaultValue={currentColumn.title}
                      onChange={onChange}
                      fullWidth
                      helperText={errors.title && errors.title.message}
                      error={Boolean(errors.title)}
                    />
                  )}
                />
              </div>
              <div className={styles.textField}>
                <Controller
                  name="director"
                  control={control}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'監督'}
                      id="director"
                      type="text"
                      name="director"
                      variant="outlined"
                      defaultValue={currentColumn.director}
                      onChange={onChange}
                      fullWidth
                      helperText={errors.director && errors.director.message}
                      error={Boolean(errors.director)}
                    />
                  )}
                />
              </div>
              <div className={styles.textField}>
                <Controller
                  name="release"
                  control={control}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'製作年'}
                      id="release"
                      type="text"
                      name="release"
                      variant="outlined"
                      defaultValue={currentColumn.release}
                      onChange={onChange}
                      helperText={errors.release && errors.release.message}
                      error={Boolean(errors.release)}
                    />
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'時間'}
                      id="time"
                      type="text"
                      name="time"
                      variant="outlined"
                      defaultValue={currentColumn.time}
                      onChange={onChange}
                      helperText={errors.time && errors.time.message}
                      error={Boolean(errors.time)}
                    />
                  )}
                />
              </div>
              <div className={styles.textField}>
                <Controller
                  name="url"
                  control={control}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'URL'}
                      id="url"
                      type="text"
                      name="url"
                      variant="outlined"
                      defaultValue={currentColumn.url}
                      onChange={onChange}
                      fullWidth
                      helperText={errors.url && errors.url.message}
                      error={Boolean(errors.url)}
                    />
                  )}
                />
              </div>
              <Grid container justifyContent="center">
                <Button color="primary" type="submit" variant="contained">
                  編集する
                </Button>
              </Grid>
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
