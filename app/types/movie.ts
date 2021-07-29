import { DefaultType } from './defaultType'

export interface IMovie extends DefaultType {
  title: string
  release: string
  time: string
  country: string
  productionCompany: string
  userId: number
  tags: Tag[]
  crews: Crew[]
}

interface Tag extends DefaultType {
  text: string
  movieId: number
}

interface Crew extends DefaultType {
  category: 1 | 2 | 3 | 4
  name: string
  movieId: number
}

export interface IMovieInputs {
  title: string
  release: string
  time: string
  country: string
  productionCompany: string
  crews: {
    category: 1 | 2 | 3 | 4
    name: string
  }[]
  tags: {
    text: string
  }[]
}
