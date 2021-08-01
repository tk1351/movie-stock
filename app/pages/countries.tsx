import React from 'react'
import { NextPage } from 'next'
import Navbar from '../components/common/Navbar'
import Countries from '../components/movie/Countries'

const countries: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Countries />
    </div>
  )
}

export default countries
