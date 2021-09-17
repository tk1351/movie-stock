import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/common/Navbar'
import Register from '../components/movie/Register'

const register: NextPage = () => {
  return (
    <>
      <Head>
        <title>映画の登録 | CineStock</title>
      </Head>
      <Navbar />
      <Register />
    </>
  )
}

export default register
