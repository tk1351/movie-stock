import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { dialogState, DialogStateReturnType } from '../../recoil/atoms/open'
import { IWatchList } from '../../types/watchList'
import { currentColumnState } from '../../recoil/atoms/watchList'
import EditWatchListForm from './EditWatchListForm'
import DeleteDialog from './DeleteDialog'

interface EditDialogProps {}

const EditDialog: FC<EditDialogProps> = () => {
  const currentColumn = useRecoilValue<IWatchList | null>(currentColumnState)
  const dialog = useRecoilValue<DialogStateReturnType>(dialogState)

  return (
    <>
      {dialog.category === undefined && <></>}
      {dialog.category === 'edit' && (
        <EditWatchListForm currentColumn={currentColumn} />
      )}
      {dialog.category === 'delete' && <DeleteDialog />}
    </>
  )
}

export default EditDialog
