import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../../../components/common/Navbar'
import Year from '../../../../components/user/Year'

const years: NextPage = () => {
  return (
    <>
      <Navbar />
      <Year />
    </>
  )
}

export default years
