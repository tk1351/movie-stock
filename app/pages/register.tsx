import React from 'react'
import { NextPage } from 'next'
import Navbar from '../components/common/Navbar'
import RegisterForm from '../components/movie/RegisterForm'

const register: NextPage = () => {
  return (
    <>
      <Navbar />
      <RegisterForm />
    </>
  )
}

export default register
