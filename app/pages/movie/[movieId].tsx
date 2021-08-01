import React from 'react'
import { NextPage } from 'next'
import Movie from '../../components/movie/Movie'
import Navbar from '../../components/common/Navbar'

const movieId: NextPage = () => {
  return (
    <>
      <Navbar />
      <Movie />
    </>
  )
}

export default movieId
