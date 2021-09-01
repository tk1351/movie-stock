import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Times from '../../components/user/Times'

interface TimesPageProps {}

const times: NextPage<TimesPageProps> = () => {
  return (
    <>
      <Navbar />
      <Times />
    </>
  )
}

export default times
