import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../../components/common/Navbar'
import Register from '../../../components/movie/Register'

interface IdPageProps {}

const id: NextPage<IdPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Register />
    </div>
  )
}

export default id
