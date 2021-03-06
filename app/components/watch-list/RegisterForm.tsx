import React, { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TextField, Button, Container } from '@material-ui/core'
import {
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilValue,
  useRecoilState,
} from 'recoil'
import { yupResolver } from '@hookform/resolvers/yup'
import { IWatchListInputs, IWatchList } from '../../types/watchList'
import API from '../../src/utils/api/api'
import { IMessage } from '../../types/defaultType'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { authState, Auth } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { watchListState } from '../../recoil/atoms/watchList'
import { watchListSelector } from '../../recoil/selectors/watchList'
import styles from '../../styles/components/watch-list/registerForm.module.css'
import { watchedState } from '../../recoil/atoms/movie'
import {
  watchListFormState,
  WatchListFormReturnType,
} from '../../recoil/atoms/open'
import { watchListValidationSchema } from '../../src/utils/watchListValidation'

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const setForm = useSetRecoilState<WatchListFormReturnType>(watchListFormState)
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)
  const watchList = useRecoilValue<IWatchList[]>(watchListState)
  const setWatchList = useSetRecoilState<IWatchList[]>(watchListSelector)
  const [watched, setWatched] = useRecoilState<number>(watchedState)

  const defaultValues: IWatchListInputs = {
    title: '',
    director: '',
    release: '',
    time: '',
    url: '',
  }

  const { control, handleSubmit, reset } = useForm<IWatchListInputs>({
    defaultValues,
    resolver: yupResolver(watchListValidationSchema),
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

    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/watch-list/register`
      const res = await API.post<[IMessage, IWatchList]>(apiUrl, registerData)

      const msg = res.data[0].message
      const id = res.data[1].id

      const newData: IWatchList = {
        id,
        title,
        director,
        release: Number(release),
        time: Number(time),
        url,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const newWatchList = watchList.slice()
      newWatchList.unshift(newData)
      setWatchList(newWatchList)
      setWatched(watched + 1)
      setIsAlert({
        msg,
        alertType: 'succeeded',
        open: true,
      })
      reset()
    } catch (e) {
      throw new Error(e)
    }
  }

  const onClick = () => {
    setForm((prev) => ({
      open: !prev.open,
      category: undefined,
    }))
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
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <TextField
              label={'????????????'}
              id="title"
              type="text"
              name="title"
              variant="outlined"
              onChange={onChange}
              value={value}
              helperText={errors.title && errors.title.message}
              error={Boolean(errors.title)}
            />
          )}
        />
        <Controller
          name="director"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <TextField
              label={'??????'}
              id="director"
              type="text"
              name="director"
              variant="outlined"
              onChange={onChange}
              value={value}
              helperText={errors.director && errors.director.message}
              error={Boolean(errors.director)}
            />
          )}
        />
        <div>
          <Controller
            name="release"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextField
                label={'?????????'}
                id="release"
                type="text"
                name="release"
                variant="outlined"
                onChange={onChange}
                value={value}
                helperText={errors.release && errors.release.message}
                error={Boolean(errors.release)}
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextField
                label={'??????'}
                id="time"
                type="text"
                name="time"
                variant="outlined"
                onChange={onChange}
                value={value}
                helperText={errors.time && errors.time.message}
                error={Boolean(errors.time)}
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextField
                label={'URL'}
                id="url"
                type="text"
                name="url"
                variant="outlined"
                onChange={onChange}
                value={value}
                helperText={errors.url && errors.url.message}
                error={Boolean(errors.url)}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit" color="primary" variant="contained">
            ??????
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={() => onClick()}
            className={styles.cancelButton}
          >
            ???????????????
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default RegisterForm
