import React from 'react'
import { NextPage } from 'next'
import Navbar from '../components/common/Navbar'
import Tags from '../components/movie/Tags'

const tags: NextPage = () => {
  return (
    <>
      <Navbar />
      <Tags />
    </>
  )
}

export default tags
