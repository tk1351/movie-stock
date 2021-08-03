import React from 'react'
import { NextPage } from 'next'
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { IMovieInputs } from '../../types/movie'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IMessage } from '../../types/defaultType'
import { movieValidationSchema } from '../../src/utils/movieValidation'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState } from '../../recoil/selectors/alert'

interface RegisterFormPageProps {}

const RegisterForm: NextPage<RegisterFormPageProps> = () => {
  const router = useRouter()

  const { accessToken } = useRecoilValue(authState)
  const setIsAlert = useSetRecoilState<IAlert>(setAlertState)

  const defaultValues: IMovieInputs = {
    title: '',
    release: '',
    time: '',
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

  const { control, handleSubmit } = useForm<IMovieInputs>({
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

  const onSubmit: SubmitHandler<IMovieInputs> = async (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies/register`
    try {
      setAuthToken(accessToken)
      const res = await API.post<IMessage>(url, data)
      setIsAlert({
        msg: res.data.message,
        alertType: 'succeeded',
        open: true,
      })
      await router.push('/')
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
                    error={Boolean(errors.countries && errors.countries[index])}
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
                      defaultValue={1}
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
            登録
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
