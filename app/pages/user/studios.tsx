import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Studios from '../../components/user/Studios'

interface StudiosPageProps {}

const studios: NextPage<StudiosPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Studios />
    </div>
  )
}

export default studios
