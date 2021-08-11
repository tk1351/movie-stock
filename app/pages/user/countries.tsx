import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Countries from '../../components/user/Countries'

interface CountriesPageProps {}

const countries: NextPage<CountriesPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Countries />
    </div>
  )
}

export default countries
