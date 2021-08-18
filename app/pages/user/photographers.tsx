import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import CrewsTable from '../../components/user/CrewsTable'

interface PhotographersPageProps {}

const photographers: NextPage<PhotographersPageProps> = () => {
  return (
    <div>
      <Navbar />
      <CrewsTable number={4} />
    </div>
  )
}

export default photographers
