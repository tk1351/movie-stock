/**
 * @jest-environment jsdom
 */

import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Alert from '../../../components/common/Alert'
import { RecoilRoot } from 'recoil'
import { alertState, IAlert } from '../../../recoil/atoms/alert'

const openAlert: IAlert = {
  msg: 'test',
  alertType: 'succeeded',
  open: true,
}

const closeAlert: IAlert = {
  msg: 'test',
  alertType: 'succeeded',
  open: false,
}

const Component = (newVal: IAlert) => {
  return (
    <RecoilRoot initializeState={({ set }) => set(alertState, newVal)}>
      <Alert />
    </RecoilRoot>
  )
}

describe('レンダリング', () => {
  it('openがtrueの場合、正しくmsgが表示される', () => {
    render(<Component {...openAlert} />)
    expect(screen.getByText(/test/)).toBeInTheDocument()
  })

  it('openがfalseの場合、msgは表示されない', () => {
    render(<Component {...closeAlert} />)
    expect(screen.getByText(/test/)).not.toBeInTheDocument()
  })
})
