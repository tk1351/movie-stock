import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import CrewsTable from '../../components/user/CrewsTable'

interface WritersPageProps {}

const writers: NextPage<WritersPageProps> = () => {
  return (
    <div>
      <Navbar />
      <CrewsTable number={2} />
    </div>
  )
}

export default writers
