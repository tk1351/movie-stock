import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Years from '../../components/user/Years'

interface YearsPageProps {}

const years: NextPage<YearsPageProps> = () => {
  return (
    <>
      <Navbar />
      <Years />
    </>
  )
}

export default years
