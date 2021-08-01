import React from 'react'
import { NextPage } from 'next'
import Navbar from '../components/common/Navbar'
import Crews from '../components/movie/Crews'

const crews: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Crews />
    </div>
  )
}

export default crews
