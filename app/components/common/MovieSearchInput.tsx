import React from 'react'
import { NextPage } from 'next'
import { Paper, IconButton } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import styles from '../../styles/components/common/movieSearchInput.module.css'
import AutoCompleteForm from './AutoCompleteForm'
import { useAutoCompleteHandleChange } from '../../src/utils/hooks/useAutoCompleteHandleChange'

interface MovieSearchInputProps {}

interface Query {
  title?: string
}

const defaultValues: Query = {
  title: '',
}

const MovieSearchInput: NextPage<MovieSearchInputProps> = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm<Query>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<Query> = async (data) => {
    const { title } = data
    router.push({
      pathname: '/search',
      query: {
        title,
      },
    })
  }

  const { filterMovies, titleHandleChange } = useAutoCompleteHandleChange()

  return (
    <Paper
      component="form"
      className={styles.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange } }) => (
          <AutoCompleteForm
            autocomplete={{
              onChange: (_: any, data: any) => onChange(data),
              id: 'search-title',
              options: filterMovies.map((option) => option.title),
            }}
            textField={{
              label: '映画を検索する',
              className: styles.textField,
              id: 'search-title',
              type: 'text',
              name: 'title',
              variant: 'filled',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value)
                titleHandleChange('title', e.target.value)
              },
            }}
          />
        )}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  )
}

export default MovieSearchInput
