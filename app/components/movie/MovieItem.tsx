import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { IMovie } from '../../types/movie'

interface MovieItemPageProps {
  movies: IMovie[]
}

const MovieItem: NextPage<MovieItemPageProps> = ({ movies }) => {
  return (
    <>
      {movies && (
        <div>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                href={{
                  pathname: `/movie/${movie.id}`,
                }}
              >
                <p>{movie.title}</p>
              </Link>
              <p>{movie.release}年</p>
              <p>{movie.time}分</p>
            </li>
          ))}
        </div>
      )}
    </>
  )
}

export default MovieItem
