import React from 'react'
import { NextPage } from 'next'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import styles from '../../styles/components/common/movieSearchInput.module.css'

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

  return (
    <Paper
      component="form"
      className={styles.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, ref } }) => (
          <>
            <InputBase
              placeholder="Search Title..."
              onChange={onChange}
              inputRef={ref}
            />
          </>
        )}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  )
}

export default MovieSearchInput
