import React, { FC } from 'react'
import { useSetRecoilState } from 'recoil'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { TextField, Button, Container } from '@material-ui/core'
import {
  WatchListFormReturnType,
  watchListFormState,
} from '../../recoil/atoms/open'
import styles from '../../styles/components/watch-list/searchForm.module.css'

interface SearchWatchListFormProps {}

interface ISearchQuery {
  query: string
}

const SearchWatchListForm: FC<SearchWatchListFormProps> = () => {
  const setForm = useSetRecoilState<WatchListFormReturnType>(watchListFormState)

  const { control, handleSubmit } = useForm<ISearchQuery>({
    defaultValues: { query: '' },
  })

  const onSubmit: SubmitHandler<ISearchQuery> = async (data) => {
    console.log('data', data)
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
      className={styles.searchFormWrapper}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="query"
          control={control}
          render={({ field: { onChange } }) => (
            <TextField
              label="検索"
              id="search"
              type="text"
              name="query"
              variant="outlined"
              onChange={onChange}
            />
          )}
        />
        <Button type="submit" color="primary" variant="contained">
          検索
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
      </form>
    </Container>
  )
}

export default SearchWatchListForm
