import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Writers from '../../components/user/Writers'

interface WritersPageProps {}

const writers: NextPage<WritersPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Writers />
    </div>
  )
}

export default writers
