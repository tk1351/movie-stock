import React, { FC } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Edit, Delete } from '@material-ui/icons'
import {
  menuState,
  dialogState,
  DialogStateReturnType,
} from '../../recoil/atoms/open'
import { IWatchList } from '../../types/watchList'
import { currentColumnState } from '../../recoil/atoms/watchList'

interface EditMenuProps {}

const EditMenu: FC<EditMenuProps> = () => {
  const [anchorEl, setAnchorEl] = useRecoilState<null | HTMLElement>(menuState)
  const setCurrentColumn = useSetRecoilState<IWatchList | null>(
    currentColumnState
  )
  const setOpen = useSetRecoilState<DialogStateReturnType>(dialogState)

  const handleClose = () => {
    setAnchorEl(null)
    setCurrentColumn(null)
  }

  const handleClickOpen = (category: 'edit' | 'delete') => {
    setOpen({ open: true, category })
  }
  return (
    <Menu
      id="edit-menu"
      open={Boolean(anchorEl)}
      onClose={handleClose}
      keepMounted
      anchorEl={anchorEl}
    >
      <MenuItem>
        <Edit onClick={() => handleClickOpen('edit')} />
      </MenuItem>
      <MenuItem>
        <Delete onClick={() => handleClickOpen('delete')} />
      </MenuItem>
    </Menu>
  )
}

export default EditMenu
