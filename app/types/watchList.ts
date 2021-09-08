import { DefaultType } from './defaultType'

export interface IWatchList extends DefaultType {
  title: string
  director: string
  release: number
  time: number
  url: string
}

export interface IWatchListInputs {
  title: string
  director: string
  release: string
  time: string
  url: string
}
