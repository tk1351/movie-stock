import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Producers from '../../components/user/Producers'

interface ProducersPageProps {}

const producers: NextPage<ProducersPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Producers />
    </div>
  )
}

export default producers
