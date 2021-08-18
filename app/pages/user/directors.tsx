import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import CrewsTable from '../../components/user/CrewsTable'

interface DirectorsPageProps {}

const directors: NextPage<DirectorsPageProps> = () => {
  return (
    <div>
      <Navbar />
      <CrewsTable number={1} />
    </div>
  )
}

export default directors
