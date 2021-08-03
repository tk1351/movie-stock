import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import UpdateForm from '../../components/movie/UpdateForm'

const movieId: NextPage = () => {
  return (
    <div>
      <Navbar />
      <UpdateForm />
    </div>
  )
}

export default movieId
