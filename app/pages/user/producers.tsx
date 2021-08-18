import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import CrewsTable from '../../components/user/CrewsTable'

interface ProducersPageProps {}

const producers: NextPage<ProducersPageProps> = () => {
  return (
    <div>
      <Navbar />
      <CrewsTable number={3} />
    </div>
  )
}

export default producers
