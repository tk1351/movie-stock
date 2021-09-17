import React, { FC, useEffect } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Container,
  Grid,
  Typography,
  Box,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { Add, Remove } from '@material-ui/icons'
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { IMovieInputs, PostMovieData } from '../../types/movie'
import { movieValidationSchema } from '../../src/utils/movieValidation'
import styles from '../../styles/components/movie/form.module.css'
import AutoCompleteForm from '../common/AutoCompleteForm'
import { useAutoCompleteHandleChange } from '../../src/utils/hooks/useAutoCompleteHandleChange'
import BackHistoryButton from '../common/BackHistoryButton'
import { IWatchList } from '../../types/watchList'
import { removeFrontRearSpace } from '../../src/utils/movie'
import { IAlert } from '../../recoil/atoms/alert'
import { authState } from '../../recoil/atoms/auth'
import { setAlertState } from '../../recoil/selectors/alert'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { IMessage } from '../../types/defaultType'
import API from '../../src/utils/api/api'

interface FormProps {
  watchList?: IWatchList
}

const Form: FC<FormProps> = ({ watchList }) => {
  const router = useRouter()
  const accessToken = useRecoilValueLoadable(authState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)

  const defaultValues: IMovieInputs = {
    title: '',
    release: '',
    time: '',
    rate: '0',
    countries: [{ country: '' }],
    studios: [{ studio: '' }],
    crews: [
      {
        category: 1,
        name: '',
      },
    ],
    tags: [
      {
        text: '',
      },
    ],
  }

  const { control, handleSubmit, setValue } = useForm<IMovieInputs>({
    defaultValues,
    resolver: yupResolver(movieValidationSchema),
  })

  const {
    fields: countryFields,
    append: countryAppend,
    remove: countryRemove,
  } = useFieldArray<IMovieInputs, any, any>({ control, name: 'countries' })

  const {
    fields: studioFields,
    append: studioAppend,
    remove: studioRemove,
  } = useFieldArray<IMovieInputs, any, any>({ control, name: 'studios' })

  const {
    fields: crewFields,
    append: crewAppend,
    remove: crewRemove,
  } = useFieldArray<IMovieInputs, any, any>({ control, name: 'crews' })

  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray<IMovieInputs, any, any>({ control, name: 'tags' })

  const setWatchListValues = (watchList: IWatchList) => {
    const { title, time, release, director } = watchList
    setValue('title', title)
    setValue('time', String(time))
    setValue('release', String(release))
    setValue('crews.0.name', director)
  }

  useEffect(() => {
    if (watchList) {
      setWatchListValues(watchList)
    }
  }, [watchList])

  const deleteWatchList = async (watchList: IWatchList) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list/delete/${watchList.id}`

    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)
      await API.delete(url)
    } catch (e) {
      throw new Error(e)
    }
  }

  const registerMovie = async (data: IMovieInputs) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/register`

    const newData: PostMovieData = removeFrontRearSpace(data)

    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)
      const res = await API.post<IMessage>(url, newData)
      setIsAlert({
        msg: res.data.message,
        alertType: 'succeeded',
        open: true,
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  const onSubmit: SubmitHandler<IMovieInputs> = async (data) => {
    registerMovie(data)

    if (watchList) {
      deleteWatchList(watchList)
    }
    await router.push('/')
  }

  const {
    crewsSuggestions,
    studiosSuggestions,
    debouncedCrewsSuggestions,
    debouncedStudiosSuggestions,
  } = useAutoCompleteHandleChange()

  return (
    <Container component="main" maxWidth={false} className={styles.container}>
      <Grid container justifyContent="center" className={styles.header}>
        <Typography gutterBottom variant="h4" component="h2">
          <Box fontWeight="fontWeightBold">映画の登録</Box>
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.textFieldWrapper}>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextField
                label={'タイトル'}
                id="title"
                type="text"
                name="title"
                variant="outlined"
                value={value}
                onChange={onChange}
                helperText={errors.title && errors.title.message}
                error={Boolean(errors.title)}
              />
            )}
          />
          <Controller
            name="release"
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextField
                label={'製作年'}
                id="release"
                type="text"
                name="release"
                variant="outlined"
                value={value}
                onChange={onChange}
                helperText={errors.release && errors.release.message}
                error={Boolean(errors.release)}
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            render={({ field: { onChange, value }, formState: { errors } }) => (
              <TextField
                label={'上映時間'}
                id="time"
                type="text"
                name="time"
                variant="outlined"
                value={value}
                onChange={onChange}
                helperText={errors.time && errors.time.message}
                error={Boolean(errors.time)}
              />
            )}
          />
        </div>
        <Grid container justifyContent="center" className={styles.rate}>
          <Controller
            name="rate"
            control={control}
            render={({ field: { onChange } }) => (
              <Rating
                name="movie-rating"
                onChange={onChange}
                precision={0.5}
                size="large"
              />
            )}
          />
        </Grid>
        <ul>
          {countryFields.map((field, index) => (
            <li key={field.id}>
              <div className={styles.textFieldWrapper}>
                <Controller
                  name={`countries.${index}.country`}
                  control={control}
                  defaultValue={field.country ? field.country : ''}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'製作国'}
                      id={`countries.${index}.country`}
                      type="text"
                      name={`countries.${index}.country`}
                      variant="outlined"
                      onChange={onChange}
                      defaultValue={field.country}
                      className={styles.textField}
                      helperText={
                        errors.countries &&
                        errors.countries[index]?.country?.message
                      }
                      error={Boolean(
                        errors.countries && errors.countries[index]
                      )}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => countryRemove(index)}
                >
                  <Remove />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          type="button"
          className={styles.appendButton}
          onClick={() =>
            countryAppend({
              country: '',
            })
          }
        >
          <Add />
        </Button>
        <ul>
          {studioFields.map((field, index) => (
            <li key={field.id}>
              <div className={styles.textFieldWrapper}>
                <Controller
                  name={`studios.${index}.studio`}
                  control={control}
                  defaultValue={field.studio ? field.studio : ''}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <AutoCompleteForm
                      autocomplete={{
                        onChange: (_: any, data: any) => onChange(data),
                        id: `studios.${index}.studio`,
                        options: studiosSuggestions.map(
                          (option) => option.studios_studio
                        ),
                      }}
                      textField={{
                        label: '制作会社',
                        id: `studios.${index}.studio`,
                        type: 'text',
                        name: `studios.${index}.studio`,
                        variant: 'outlined',
                        className: styles.textField,
                        helperText:
                          errors.studios &&
                          errors.studios[index]?.studio?.message,
                        error: Boolean(errors.studios && errors.studios[index]),
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.value)
                          debouncedStudiosSuggestions('studios', e.target.value)
                        },
                      }}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => studioRemove(index)}
                >
                  <Remove />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          type="button"
          className={styles.appendButton}
          onClick={() =>
            studioAppend({
              studio: '',
            })
          }
        >
          <Add />
        </Button>
        <ul>
          {crewFields.map((field, index) => (
            <li key={field.id}>
              <div className={styles.textFieldWrapper}>
                <Controller
                  name={`crews.${index}.category`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    formState: { errors },
                  }) => (
                    <FormControl className={styles.formControl}>
                      <InputLabel>職種</InputLabel>
                      <Select
                        aria-label={'職種'}
                        label={'職種'}
                        name={`crews.${index}.category`}
                        id={`crews.${index}.category`}
                        onChange={onChange}
                        value={value ? value : 1}
                        error={Boolean(errors.crews && errors.crews[index])}
                      >
                        <MenuItem value={1}>監督</MenuItem>
                        <MenuItem value={2}>脚本</MenuItem>
                        <MenuItem value={3}>製作</MenuItem>
                        <MenuItem value={4}>撮影</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.crews && errors.crews[index]?.category?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name={`crews.${index}.name`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    formState: { errors },
                  }) => (
                    <AutoCompleteForm
                      autocomplete={{
                        onChange: (_: any, data: any) => onChange(data),
                        id: `crews.${index}.name`,
                        options: crewsSuggestions.map(
                          (option) => option.crews_name
                        ),
                        value,
                      }}
                      textField={{
                        label: '名前',
                        id: `crews.${index}.name`,
                        type: 'text',
                        name: `crews.${index}.name`,
                        className: styles.crewTextField,
                        variant: 'outlined',
                        helperText:
                          errors.crews && errors.crews[index]?.name?.message,
                        error: Boolean(errors.crews && errors.crews[index]),
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.value)
                          debouncedCrewsSuggestions('crews', e.target.value)
                        },
                        value: value,
                      }}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => crewRemove(index)}
                >
                  <Remove />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          type="button"
          className={styles.appendButton}
          onClick={() =>
            crewAppend({
              category: 1,
              name: '',
            })
          }
        >
          <Add />
        </Button>
        <ul>
          {tagFields.map((field, index) => (
            <li key={field.id}>
              <div className={styles.textFieldWrapper}>
                <Controller
                  name={`tags.${index}.text`}
                  control={control}
                  defaultValue={field.text ? field.text : ''}
                  render={({ field: { onChange }, formState: { errors } }) => (
                    <TextField
                      label={'タグ'}
                      id={`tags[${index}].text`}
                      type="text"
                      name={`tags[${index}].text`}
                      variant="outlined"
                      onChange={onChange}
                      defaultValue={field.text}
                      className={styles.textField}
                      helperText={
                        errors.tags && errors.tags[index]?.text?.message
                      }
                      error={Boolean(errors.tags && errors.tags[index])}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => tagRemove(index)}
                >
                  <Remove />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          type="button"
          className={styles.appendButton}
          onClick={() =>
            tagAppend({
              text: '',
            })
          }
        >
          <Add />
        </Button>
        <Grid container justifyContent="center">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={styles.registerButton}
          >
            登録
          </Button>
        </Grid>
      </form>
      <BackHistoryButton />
    </Container>
  )
}

export default Form
