import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilStateLoadable,
} from 'recoil'
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { Button, Container, Grid, Typography, Box } from '@material-ui/core'
import { Remove, Add } from '@material-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { movieState } from '../../recoil/atoms/movie'
import { Auth, authState } from '../../recoil/atoms/auth'
import { fetchMovieByUserId } from '../../src/utils/api/movie'
import { IMovie, IMovieInputs, PostMovieData } from '../../types/movie'
import API from '../../src/utils/api/api'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { IMessage } from '../../types/defaultType'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { movieValidationSchema } from '../../src/utils/movieValidation'
import styles from '../../styles/components/movie/updateForm.module.css'
import { removeFrontRearSpace } from '../../src/utils/movie'
import BackHistoryButton from '../common/BackHistoryButton'
import MuiRating from '../mui/MuiRating'
import MuiTextField from '../mui/MuiTextField'
import MuiSelect from '../mui/MuiSelect'

interface UpdateFormPageProps {}

const UpdateForm: NextPage<UpdateFormPageProps> = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const [movie, setMovie] = useRecoilStateLoadable<IMovie>(movieState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)

  const router = useRouter()
  const id = router.query.movieId as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue' || movie.contents.id === 0) {
        const movieData: IMovie = await fetchMovieByUserId(
          accessToken.contents.accessToken,
          Number(id)
        )
        setMovie(movieData)
      }
    })()
  }, [accessToken])

  const defaultValues: IMovieInputs = {
    title: movie.contents.title,
    release: movie.contents.release,
    time: movie.contents.time,
    rate: movie.contents.rate,
    countries: movie.contents.countries,
    studios: movie.contents.studios,
    crews: movie.contents.crews,
    tags: movie.contents.tags,
  }

  const { control, handleSubmit } = useForm<IMovieInputs>({
    defaultValues,
    resolver: yupResolver(movieValidationSchema),
  })

  const {
    fields: countryFields,
    append: countryAppend,
    remove: countryRemove,
  } = useFieldArray<IMovieInputs, any, any>({
    control,
    name: 'countries',
  })

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

  const openAlert = (msg: string, alertType: 'succeeded' | 'failed') => {
    setIsAlert({ msg, alertType, open: true })
  }

  const onSubmit: SubmitHandler<IMovieInputs> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/update/${movie.contents.id}`

    const newData: PostMovieData = removeFrontRearSpace(data)

    try {
      if (accessToken.state === 'hasValue') {
        setAuthToken(accessToken.contents.accessToken)
        const res = await API.patch<IMessage>(url, newData)
        openAlert(res.data.message, 'succeeded')
        await router.push(`/movie/${movie.contents.id}`)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <Container component="main" maxWidth={false} className={styles.container}>
      <Grid container justifyContent="center" className={styles.header}>
        <Typography gutterBottom variant="h4" component="h2">
          <Box fontWeight="fontWeightBold">映画の編集</Box>
        </Typography>
      </Grid>
      {movie.state === 'hasValue' && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.textFieldWrapper}>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, ref }, formState: { errors } }) => (
                <MuiTextField
                  label={'タイトル'}
                  id="title"
                  type="text"
                  name="title"
                  variant="outlined"
                  defaultValue={movie.contents.title}
                  onChange={onChange}
                  inputRef={ref}
                  helperText={errors.title && errors.title.message}
                  error={Boolean(errors.title)}
                />
              )}
            />
            <Controller
              name="release"
              control={control}
              render={({ field: { onChange, ref }, formState: { errors } }) => (
                <MuiTextField
                  label={'製作年'}
                  id="release"
                  type="text"
                  name="release"
                  variant="outlined"
                  defaultValue={movie.contents.release}
                  onChange={onChange}
                  inputRef={ref}
                  helperText={errors.release && errors.release.message}
                  error={Boolean(errors.release)}
                />
              )}
            />
            <Controller
              name="time"
              control={control}
              render={({ field: { onChange, ref }, formState: { errors } }) => (
                <MuiTextField
                  label={'上映時間'}
                  id="time"
                  type="text"
                  name="time"
                  variant="outlined"
                  defaultValue={movie.contents.time}
                  onChange={onChange}
                  inputRef={ref}
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
                <MuiRating
                  name="movie-rating"
                  defaultValue={movie.contents.rate}
                  onChange={onChange}
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
                    render={({
                      field: { onChange, ref },
                      formState: { errors },
                    }) => (
                      <MuiTextField
                        label={'製作国'}
                        id={`countries.${index}.country`}
                        type="text"
                        name={`countries.${index}.country`}
                        variant="outlined"
                        onChange={onChange}
                        inputRef={ref}
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
                    render={({
                      field: { onChange, ref },
                      formState: { errors },
                    }) => (
                      <MuiTextField
                        label={'制作会社'}
                        id={`studios.${index}.studio`}
                        type="text"
                        name={`studios.${index}.studio`}
                        variant="outlined"
                        onChange={onChange}
                        inputRef={ref}
                        defaultValue={field.studio}
                        className={styles.textField}
                        helperText={
                          errors.studios &&
                          errors.studios[index]?.studio?.message
                        }
                        error={Boolean(errors.studios && errors.studios[index])}
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
                    defaultValue={
                      Number(field.category) ? Number(field.category) : 1
                    }
                    render={({
                      field: { onChange, value },
                      formState: { errors },
                    }) => (
                      <MuiSelect
                        className={styles.formControl}
                        label="職種"
                        name={`crews[${index}].category`}
                        id={`crews[${index}].category`}
                        onChange={onChange}
                        value={value ? value : 1}
                        error={Boolean(errors.crews && errors.crews[index])}
                        menuItems={['監督', '脚本', '製作', '撮影']}
                        helperText={
                          errors.crews && errors.crews[index]?.category?.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name={`crews.${index}.name`}
                    control={control}
                    defaultValue={field.name ? field.name : ''}
                    render={({
                      field: { onChange, ref },
                      formState: { errors },
                    }) => (
                      <MuiTextField
                        label={'名前'}
                        id={`crews[${index}].name`}
                        type="text"
                        name={`crews[${index}].name`}
                        variant="outlined"
                        onChange={onChange}
                        inputRef={ref}
                        defaultValue={field.name}
                        className={styles.crewTextField}
                        helperText={
                          errors.crews && errors.crews[index]?.name?.message
                        }
                        error={Boolean(errors.crews && errors.crews[index])}
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
                    render={({
                      field: { onChange, ref },
                      formState: { errors },
                    }) => (
                      <MuiTextField
                        label={'タグ'}
                        id={`tags[${index}].text`}
                        type="text"
                        name={`tags[${index}].text`}
                        variant="outlined"
                        onChange={onChange}
                        inputRef={ref}
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
              更新
            </Button>
          </Grid>
        </form>
      )}
      <BackHistoryButton />
    </Container>
  )
}

export default UpdateForm
