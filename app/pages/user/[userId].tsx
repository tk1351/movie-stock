import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import MyPage from '../../components/user/MyPage'

const userId: NextPage = () => {
  return (
    <div>
      <Navbar />
      <MyPage />
    </div>
  )
}

export default userId
