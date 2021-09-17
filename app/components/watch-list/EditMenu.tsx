import React, { FC, memo } from 'react'
import { useRouter } from 'next/router'
import { Menu, MenuItem } from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Edit, Delete, Update } from '@material-ui/icons'
import {
  menuState,
  dialogState,
  DialogStateReturnType,
} from '../../recoil/atoms/open'
import { IWatchList } from '../../types/watchList'
import { currentColumnState } from '../../recoil/atoms/watchList'

interface EditMenuProps {}

const EditMenu: FC<EditMenuProps> = memo(() => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useRecoilState<null | HTMLElement>(menuState)
  const [currentColumn, setCurrentColumn] = useRecoilState<IWatchList | null>(
    currentColumnState
  )
  const setOpen = useSetRecoilState<DialogStateReturnType>(dialogState)

  const handleClose = () => {
    setAnchorEl(null)
    setCurrentColumn(null)
  }

  const handleClickOpen = (category: 'edit' | 'delete') => {
    setOpen({ open: true, category })
    setAnchorEl(null)
  }

  const onPushRegisterPageClicked = (id: number) => {
    setAnchorEl(null)
    if (currentColumn) router.push(`/update/watch-list/${currentColumn.id}`)
  }

  return (
    <>
      {currentColumn && (
        <Menu
          id="edit-menu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
          keepMounted
          anchorEl={anchorEl}
        >
          <MenuItem>
            <Update
              onClick={() => onPushRegisterPageClicked(currentColumn.id)}
            />
          </MenuItem>
          <MenuItem>
            <Edit onClick={() => handleClickOpen('edit')} />
          </MenuItem>
          <MenuItem>
            <Delete onClick={() => handleClickOpen('delete')} />
          </MenuItem>
        </Menu>
      )}
    </>
  )
})

export default EditMenu
