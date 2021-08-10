import { DefaultType } from './defaultType'

export interface IMovie extends DefaultType {
  title: string
  release: string
  time: string
  userId: number
  countries: Country[]
  studios: Studio[]
  tags: Tag[]
  crews: Crew[]
}

export interface Country extends DefaultType {
  country: string
}

export interface Studio extends DefaultType {
  studio: string
}

export interface Tag extends DefaultType {
  text: string
  movieId: number
}

export interface Crew extends DefaultType {
  category: 1 | 2 | 3 | 4
  name: string
  movieId: number
}

interface Movie extends DefaultType {
  title: string
  release: string
  time: string
  userId: number
}

export interface ICrew extends Crew {
  movie: Movie
}

export interface IMovieInputs {
  title: string
  release: string
  time: string
  countries: {
    country: string
  }[]
  studios: {
    studio: string
  }[]
  crews: {
    category: number
    name: string
  }[]
  tags: {
    text: string
  }[]
}

export interface IUpdateMovieInputs {
  title: string
  release: string
  time: string
  countries: {
    country: string
  }[]
  studios: {
    studio: string
  }[]
  crews: {
    category: number
    name: string
  }[]
  tags: {
    text: string
  }[]
}

export interface CrewsRank {
  cnt: string
  crews_name: string
  crews_category: number
}

export interface StudiosRank {
  cnt: string
  studios_studio: string
}

export interface CountriesRank {
  cnt: string
  countries_country: string
}

export interface TMDBSearchResult {
  page: number
  result: {
    poster_path: string | null
    adult: boolean
    overview: string
    release_date: string
    genre_ids: number[]
    id: number
    original_title: string
    original_language: string
    title: string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    video: boolean
    vote_average: number
  }[]
  total_results: number
  total_pages: number
}

export interface TMDBWatchProvider {
  id: number
  result: any[]
}
