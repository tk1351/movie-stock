import React, { FC, useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { FilterList } from '@material-ui/icons'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { authState } from '../../recoil/atoms/auth'
import { moviesState } from '../../recoil/atoms/movie'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API, { offset, limit } from '../../src/utils/api/api'
import { IMovie } from '../../types/movie'
import { SortType, sortState } from '../../recoil/atoms/sort'
import { scrollState } from '../../recoil/atoms/scroll'

interface SortButtonProps {
  category: SortCategoryComponentType
  query?: string
  begin?: number
  end?: number
}

export type SortCategoryComponentType =
  | 'moviesList'
  | 'search'
  | 'countries'
  | 'studios'
  | 'tags'
  | 'year'
  | 'time'

const SortButton: FC<SortButtonProps> = ({ category, query, begin, end }) => {
  const accessToken = useRecoilValueLoadable(authState)
  const setMovies = useSetRecoilState(moviesState)
  const setSort = useSetRecoilState(sortState)
  const setHasMore = useSetRecoilState(scrollState)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const switchUrl = (
    category: SortCategoryComponentType,
    query: string,
    params: SortType
  ) => {
    const { sort, order } = params
    switch (category) {
      case 'moviesList':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${offset}&limit=${limit}&${sort}=${order}`

      case 'search':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?title=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}&${sort}=${order}`

      case 'countries':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?country=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}&${sort}=${order}`

      case 'studios':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?studio=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}&${sort}=${order}`

      case 'tags':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies?tag=${encodeURI(
          query
        )}&offset=${offset}&limit=${limit}&${sort}=${order}`

      case 'year':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies/release/decade/${query}?offset=${offset}&limit=${limit}&${sort}=${order}`

      case 'time':
        return `${process.env.NEXT_PUBLIC_API_URL}/movies/time?begin=${begin}&end=${end}&offset=${offset}&limit=${limit}&${sort}=${order}`

      default:
        return ''
    }
  }

  const onClick = async (params: SortType) => {
    setHasMore(true)
    const { sort, order } = params
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const setMoviesAndSort = async () => {
      const res = await API.get<[IMovie[], number]>(
        switchUrl(category, String(query), params)
      )
      setMovies(res.data[0])
      setSort({ ...params, sort, order })
    }

    setMoviesAndSort()
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls="sort-menu"
      >
        <FilterList />
      </IconButton>
      <Menu
        id="sort-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        anchorEl={anchorEl}
      >
        <MenuItem onClick={() => onClick({ sort: 'rate', order: 'DESC' })}>
          評価の多い順
        </MenuItem>
        <MenuItem onClick={() => onClick({ sort: 'rate', order: 'ASC' })}>
          評価の少ない順
        </MenuItem>
        <MenuItem onClick={() => onClick({ sort: 'release', order: 'DESC' })}>
          製作年の新しい順
        </MenuItem>
        <MenuItem onClick={() => onClick({ sort: 'release', order: 'ASC' })}>
          製作年の古い順
        </MenuItem>
        <MenuItem onClick={() => onClick({ sort: 'movieId', order: 'DESC' })}>
          登録の新しい順
        </MenuItem>
        <MenuItem onClick={() => onClick({ sort: 'movieId', order: 'ASC' })}>
          登録の古い順
        </MenuItem>
      </Menu>
    </>
  )
}

export default SortButton
