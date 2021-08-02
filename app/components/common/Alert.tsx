import React, { useState } from 'react'
import { NextPage } from 'next'
import { SnackbarOrigin, Snackbar } from '@material-ui/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { IAlert } from '../../recoil/atoms/alert'
import { setAlertState, removeAlertState } from '../../recoil/selectors/alert'

const Alert: NextPage = () => {
  const isAlert = useRecoilValue<IAlert>(setAlertState)
  const setRemoveAlert = useSetRecoilState<IAlert>(removeAlertState)

  const [state, setState] = useState<SnackbarOrigin>({
    vertical: 'top',
    horizontal: 'right',
  })

  const { vertical, horizontal } = state

  const handleClose = () => {
    setState({ ...state })
    setRemoveAlert(isAlert)
  }

  return (
    <>
      {isAlert.open === true && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={isAlert.open}
          message={isAlert.msg}
          key={vertical + horizontal}
          onClose={handleClose}
        />
      )}
    </>
  )
}

export default Alert
