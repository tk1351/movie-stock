import React, { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TextField, Button, Container } from '@material-ui/core'
import {
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilValue,
} from 'recoil'
import { IWatchListInputs, IWatchList } from '../../types/watchList'
import { watchListRegisterFormState } from '../../recoil/atoms/watchListRegisterForm'
import API from '../../src/utils/api/api'
import { IMessage } from '../../types/defaultType'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { watchListState } from '../../recoil/atoms/watchList'
import { watchListSelector } from '../../recoil/selectors/watchList'
import styles from '../../styles/components/watch-list/registerForm.module.css'

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const setOpen = useSetRecoilState(watchListRegisterFormState)
  const accessToken = useRecoilValueLoadable(authState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)
  const watchList = useRecoilValue(watchListState)
  const setWatchList = useSetRecoilState<IWatchList[]>(watchListSelector)

  const defaultValues: IWatchListInputs = {
    title: '',
    director: '',
    release: '',
    time: '',
    url: '',
  }

  const { control, handleSubmit, reset } = useForm<IWatchListInputs>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<IWatchListInputs> = async (data) => {
    const { title, director, release, time, url } = data
    const registerData = {
      title,
      director,
      release: Number(release),
      time: Number(time),
      url,
    }

    const newData: IWatchList = {
      id: watchList.length + 1,
      title,
      director,
      release: Number(release),
      time: Number(time),
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/watch-list/register`
      const res = await API.post<IMessage>(apiUrl, registerData)

      setWatchList([...watchList, newData])
      setIsAlert({
        msg: res.data.message,
        alertType: 'succeeded',
        open: true,
      })
      reset()
    } catch (e) {
      throw new Error(e)
    }
  }

  const onClick = () => {
    setOpen((prev) => !prev)
  }
  return (
    <Container
      component="main"
      maxWidth={false}
      className={styles.registerFormWrapper}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              label={'タイトル'}
              id="title"
              type="text"
              name="title"
              variant="outlined"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="director"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              label={'監督'}
              id="director"
              type="text"
              name="director"
              variant="outlined"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <div>
          <Controller
            name="release"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                label={'製作年'}
                id="release"
                type="text"
                name="release"
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                label={'時間'}
                id="time"
                type="text"
                name="time"
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                label={'URL'}
                id="url"
                type="text"
                name="url"
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit" color="primary" variant="contained">
            登録
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => onClick()}
            className={styles.cancelButton}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default RegisterForm
