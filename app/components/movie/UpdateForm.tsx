import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'
import { Remove, Add } from '@material-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { movieState } from '../../recoil/atoms/movie'
import { Auth, authState } from '../../recoil/atoms/auth'
import { fetchMovieById } from '../../src/utils/api/movie'
import { IMovie, IUpdateMovieInputs } from '../../types/movie'
import API from '../../src/utils/api/api'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { IMessage } from '../../types/defaultType'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'
import { movieValidationSchema } from '../../src/utils/movieValidation'

interface UpdateFormPageProps {}

const UpdateForm: NextPage<UpdateFormPageProps> = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const movie = useRecoilValueLoadable(movieState)
  const setMovie = useSetRecoilState(movieState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)

  const router = useRouter()
  const id = router.query.movieId as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue' || movie.contents.id === 0) {
        const movieData: IMovie = await fetchMovieById(
          accessToken.contents.accessToken,
          Number(id)
        )
        setMovie(movieData)
      }
    })()
  }, [accessToken])

  const defaultValues: IUpdateMovieInputs = {
    title: movie.contents.title,
    release: movie.contents.release,
    time: movie.contents.time,
    countries: movie.contents.countries,
    studios: movie.contents.studios,
    crews: movie.contents.crews,
    tags: movie.contents.tags,
  }

  const { control, handleSubmit } = useForm<IUpdateMovieInputs>({
    defaultValues,
    resolver: yupResolver(movieValidationSchema),
  })

  const {
    fields: countryFields,
    append: countryAppend,
    remove: countryRemove,
  } = useFieldArray<IUpdateMovieInputs, any, any>({
    control,
    name: 'countries',
  })

  const {
    fields: studioFields,
    append: studioAppend,
    remove: studioRemove,
  } = useFieldArray<IUpdateMovieInputs, any, any>({ control, name: 'studios' })

  const {
    fields: crewFields,
    append: crewAppend,
    remove: crewRemove,
  } = useFieldArray<IUpdateMovieInputs, any, any>({ control, name: 'crews' })

  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray<IUpdateMovieInputs, any, any>({ control, name: 'tags' })

  const onSubmit: SubmitHandler<IUpdateMovieInputs> = async (data) => {
    if (accessToken.state === 'hasValue') {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/update/${movie.contents.id}`
      try {
        setAuthToken(accessToken.contents.accessToken)
        const res = await API.patch<IMessage>(url, data)
        setIsAlert({
          msg: res.data.message,
          alertType: 'succeeded',
          open: true,
        })
        await router.push(`/movie/${movie.contents.id}`)
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  return (
    <div>
      <h1>Update</h1>
      {movie.state === 'hasValue' && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, ref }, formState: { errors } }) => (
              <TextField
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
              <TextField
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
              <TextField
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
          <ul>
            {countryFields.map((field, index) => (
              <li key={field.id}>
                <Controller
                  name={`countries.${index}.country`}
                  control={control}
                  defaultValue={field.country ? field.country : ''}
                  render={({
                    field: { onChange, ref },
                    formState: { errors },
                  }) => (
                    <TextField
                      label={'製作国'}
                      id={`countries.${index}.country`}
                      type="text"
                      name={`countries.${index}.country`}
                      variant="outlined"
                      onChange={onChange}
                      inputRef={ref}
                      defaultValue={field.country}
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
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            type="button"
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
                <Controller
                  name={`studios.${index}.studio`}
                  control={control}
                  defaultValue={field.studio ? field.studio : ''}
                  render={({
                    field: { onChange, ref },
                    formState: { errors },
                  }) => (
                    <TextField
                      label={'制作会社'}
                      id={`studios.${index}.studio`}
                      type="text"
                      name={`studios.${index}.studio`}
                      variant="outlined"
                      onChange={onChange}
                      inputRef={ref}
                      defaultValue={field.studio}
                      helperText={
                        errors.studios && errors.studios[index]?.studio?.message
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
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            type="button"
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
                    <FormControl>
                      <InputLabel>役職</InputLabel>
                      <Select
                        aria-label={'役職'}
                        label={'役職'}
                        name={`crews[${index}].category`}
                        id={`crews[${index}].category`}
                        defaultValue={Number(field.category)}
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
                  defaultValue={field.name ? field.name : ''}
                  render={({
                    field: { onChange, ref },
                    formState: { errors },
                  }) => (
                    <TextField
                      label={'名前'}
                      id={`crews[${index}].name`}
                      type="text"
                      name={`crews[${index}].name`}
                      variant="outlined"
                      onChange={onChange}
                      inputRef={ref}
                      defaultValue={field.name}
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
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            type="button"
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
                <Controller
                  name={`tags.${index}.text`}
                  control={control}
                  defaultValue={field.text ? field.text : ''}
                  render={({
                    field: { onChange, ref },
                    formState: { errors },
                  }) => (
                    <TextField
                      label={'タグ'}
                      id={`tags[${index}].text`}
                      type="text"
                      name={`tags[${index}].text`}
                      variant="outlined"
                      onChange={onChange}
                      inputRef={ref}
                      defaultValue={field.text}
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
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() =>
              tagAppend({
                text: '',
              })
            }
          >
            <Add />
          </Button>
          <div>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              更新
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default UpdateForm
