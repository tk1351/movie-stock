import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/common/Navbar'
import RegisterForm from '../components/movie/RegisterForm'

const register: NextPage = () => {
  return (
    <>
      <Head>
        <title>映画の登録 | CineStock</title>
      </Head>
      <Navbar />
      <RegisterForm />
    </>
  )
}

export default register
