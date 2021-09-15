import React, { FC, useMemo, useState } from 'react'
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Container } from '@material-ui/core'
import debounce from 'lodash.debounce'
import {
  WatchListFormReturnType,
  watchListFormState,
} from '../../recoil/atoms/open'
import styles from '../../styles/components/watch-list/searchForm.module.css'
import { Auth, authState } from '../../recoil/atoms/auth'
import API, { offset, limit } from '../../src/utils/api/api'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import { IWatchList } from '../../types/watchList'
import { watchListState } from '../../recoil/atoms/watchList'
import { Clear } from '@material-ui/icons'
import { scrollState } from '../../recoil/atoms/scroll'
import { useFetchWatchList } from '../../src/utils/hooks/useFetchWatchList'
import { loadingState } from '../../recoil/atoms/loading'

interface SearchWatchListFormProps {}

interface ISearchQuery {
  query: string
}

const SearchWatchListForm: FC<SearchWatchListFormProps> = () => {
  const [input, setInput] = useState<boolean>(false)

  const setForm = useSetRecoilState<WatchListFormReturnType>(watchListFormState)
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const setWatchList = useSetRecoilState<IWatchList[]>(watchListState)
  const setHasMore = useSetRecoilState<boolean>(scrollState)
  const setIsLoading = useSetRecoilState<boolean>(loadingState)

  const { control, reset } = useForm<ISearchQuery>({
    defaultValues: { query: '' },
  })

  const onClick = () => {
    setForm((prev) => ({
      open: !prev.open,
      category: undefined,
    }))
  }

  const fetchWatchList = async (url: string) => {
    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)
      const res = await API.get<[IWatchList[], number]>(url)
      const result = res.data[0]

      setWatchList([...result])
    } catch (e) {
      throw new Error(e)
    }
  }

  const fetchWatchListByQuery = async (query: string) => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/watch-list?offset=${offset}&limit=${limit}&query=${encodeURI(query)}`

    await fetchWatchList(url)
  }

  const debouncedFetchWatchListByQuery = useMemo(
    () => debounce((query: string) => fetchWatchListByQuery(query), 800),
    []
  )

  const clearInputValue = async () => {
    reset({ query: '' })
    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list?offset=${offset}&limit=${limit}`

    setInput(false)
    await fetchWatchList(url)
  }

  const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const isInputted = (query: string) => {
    if (query.length === 0) setInput(false)
    return setInput(true)
  }

  const resetWatchList = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list?offset=${offset}&limit=${limit}`
    setIsLoading(true)

    try {
      if (accessToken.state === 'hasValue')
        setAuthToken(accessToken.contents.accessToken)

      const res = await API.get<[IWatchList[], number]>(url)

      const watchList = res.data[0]
      setWatchList(watchList)
      setHasMore(true)
      setIsLoading(false)
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <Container
      component="main"
      maxWidth={false}
      className={styles.searchFormWrapper}
    >
      <form onSubmit={preventSubmit}>
        <Controller
          name="query"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="検索"
              id="search"
              type="text"
              name="query"
              variant="outlined"
              value={value}
              defaultValue=""
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value)
                debouncedFetchWatchListByQuery(e.target.value)
                isInputted(e.target.value)
              }}
            />
          )}
        />
        <Button
          type="button"
          disabled={input === false}
          onClick={() => {
            clearInputValue()
            resetWatchList()
          }}
        >
          <Clear fontSize="small" />
        </Button>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => {
            onClick()
            resetWatchList()
          }}
          className={styles.cancelButton}
        >
          キャンセル
        </Button>
      </form>
    </Container>
  )
}

export default SearchWatchListForm
