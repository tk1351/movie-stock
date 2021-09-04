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

interface SortButtonProps {}

const SortButton: FC<SortButtonProps> = () => {
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

  const onClick = async (params: SortType) => {
    const { query, order } = params
    if (accessToken.state === 'hasValue')
      setAuthToken(accessToken.contents.accessToken)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/movies?offset=${offset}&limit=${limit}&${query}=${order}`

    const setMoviesAndSort = async () => {
      const res = await API.get<[IMovie[], number]>(url)
      setMovies(res.data[0])
      setSort({ query, order })
    }

    setMoviesAndSort()
    setHasMore(true)
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
        <MenuItem onClick={() => onClick({ query: 'rate', order: 'DESC' })}>
          評価の多い順
        </MenuItem>
        <MenuItem onClick={() => onClick({ query: 'rate', order: 'ASC' })}>
          評価の少ない順
        </MenuItem>
        <MenuItem onClick={() => onClick({ query: 'release', order: 'DESC' })}>
          製作年の新しい順
        </MenuItem>
        <MenuItem onClick={() => onClick({ query: 'release', order: 'ASC' })}>
          製作年の古い順
        </MenuItem>
        <MenuItem onClick={() => onClick({ query: 'movieId', order: 'DESC' })}>
          登録の新しい順
        </MenuItem>
        <MenuItem onClick={() => onClick({ query: 'movieId', order: 'ASC' })}>
          登録の古い順
        </MenuItem>
      </Menu>
    </>
  )
}

export default SortButton
