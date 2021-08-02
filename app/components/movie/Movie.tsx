import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil'
import { authState, Auth } from '../../recoil/atoms/auth'
import { IMovie } from '../../types/movie'
import { movieState } from '../../recoil/atoms/movie'
import { fetchMovieById } from '../../src/utils/api/movie'
import Spinner from '../common/Spinner'

interface MoviePageProps {}

const crewCategory = {
  1: '監督',
  2: '脚本',
  3: '製作',
  4: '撮影',
}

const Movie: NextPage<MoviePageProps> = () => {
  const accessToken = useRecoilValueLoadable<Auth>(authState)
  const [movie, setMovie] = useRecoilStateLoadable<IMovie>(movieState)

  const router = useRouter()

  const id = router.query.movieId as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue') {
        const movieData = await fetchMovieById(
          accessToken.contents.accessToken,
          Number(id)
        )
        setMovie(movieData)
      }
    })()
  }, [accessToken])

  if (movie.state === 'loading') return <Spinner />
  if (movie.state === 'hasError') return <p>Error</p>

  return (
    <div>
      {movie.state === 'hasValue' && (
        <>
          <h1>{movie.contents.title}</h1>
          <p>{movie.contents.release}年</p>
          <p>{movie.contents.time}分</p>
          <h2>詳細</h2>
          {movie.contents.countries.map((country) => (
            <li key={country.id}>
              <p>製作国：</p>
              <Link
                href={{
                  pathname: '/countries',
                  query: { country: country.country },
                }}
              >
                <p>{country.country}</p>
              </Link>
            </li>
          ))}
          {movie.contents.studios.map((studio) => (
            <li key={studio.id}>
              <p>制作会社：</p>
              <Link
                href={{
                  pathname: '/studios',
                  query: { studio: studio.studio },
                }}
              >
                <p>{studio.studio}</p>
              </Link>
            </li>
          ))}
          <h2>スタッフ</h2>
          {movie.contents.crews.map((crew) => (
            <li key={crew.id}>
              <p>
                {crewCategory[crew.category]}
                <Link href={{ pathname: '/crews', query: { name: crew.name } }}>
                  <p>: {crew.name}</p>
                </Link>
              </p>
            </li>
          ))}
          <h2>タグ</h2>
          <ul>
            {movie.contents.tags.map((tag) => (
              <div key={tag.id}>
                <Link href={{ pathname: '/tags', query: { tag: tag.text } }}>
                  <p>#{tag.text}</p>
                </Link>
              </div>
            ))}
          </ul>
        </>
      )}
      <Link href="/">戻る</Link>
    </div>
  )
}

export default Movie
