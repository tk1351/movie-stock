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
    category: 1 | 2 | 3 | 4
    name: string
  }[]
  tags: {
    text: string
  }[]
}
