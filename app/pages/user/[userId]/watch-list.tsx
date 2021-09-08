import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../../components/common/Navbar'
import WatchList from '../../../components/user/WatchList'

interface WatchListPageProps {}

const watchList: NextPage<WatchListPageProps> = () => {
  return (
    <div>
      <Navbar />
      <WatchList />
    </div>
  )
}

export default watchList
