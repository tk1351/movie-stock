import React from 'react'
import { NextPage } from 'next'
import Navbar from '../../components/common/Navbar'
import Directors from '../../components/user/Directors'

interface DirectorsPageProps {}

const directors: NextPage<DirectorsPageProps> = () => {
  return (
    <div>
      <Navbar />
      <Directors />
    </div>
  )
}

export default directors
