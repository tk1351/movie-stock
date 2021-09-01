import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../../../components/common/Navbar'
import Time from '../../../../components/user/Time'

const times: NextPage = () => {
  return (
    <>
      <Navbar />
      <Time />
    </>
  )
}

export default times
