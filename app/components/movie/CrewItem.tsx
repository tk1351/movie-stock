import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { ICrew } from '../../types/movie'

interface CrewItemPage {
  crews: ICrew[]
}

const CrewItem: NextPage<CrewItemPage> = ({ crews }) => {
  return (
    <>
      {crews && (
        <div>
          {crews.map((crew) => (
            <li key={crew.id}>
              <Link
                href={{
                  pathname: `/movie/${crew.movie.id}`,
                }}
              >
                <p>{crew.movie.title}</p>
              </Link>
              <p>{crew.movie.release}年</p>
              <p>{crew.movie.time}分</p>
            </li>
          ))}
        </div>
      )}
    </>
  )
}

export default CrewItem
