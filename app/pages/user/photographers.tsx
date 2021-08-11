import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Photographers from '../../components/user/Photographers'

interface PhotographersPageProps {}

const photographers: NextPage<PhotographersPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Photographers />
    </div>
  )
}

export default photographers
