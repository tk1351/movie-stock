import React from 'react'
import { NextPage } from 'next'
import Navbar from '../components/common/Navbar'
import Search from '../components/movie/Search'

const search: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Search />
    </div>
  )
}

export default search
