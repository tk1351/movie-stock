import React from 'react'
import { NextPage } from 'next'
import Navbar from '../components/common/Navbar'
import Studios from '../components/movie/Studios'

const studios: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Studios />
    </div>
  )
}

export default studios
