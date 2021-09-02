import { IMovieInputs, PostMovieData } from '../../types/movie'

export const removeFrontRearSpace = (data: IMovieInputs): PostMovieData => {
  const { title, release, time, countries, studios, crews, tags } = data

  const targetTitle = title.replace(/(^\s+)|(\s+$)/g, '')
  const targetRelease = release.replace(/(^\s+)|(\s+$)/g, '')
  const targetTime = time.replace(/(^\s+)|(\s+$)/g, '')
  const targetCountries = countries.map((country) => {
    const target = country.country.replace(/(^\s+)|(\s+$)/g, '')
    return { country: target }
  })
  const targetStudios = studios.map((studio) => {
    const target = studio.studio.replace(/(^\s+)|(\s+$)/g, '')
    return { studio: target }
  })
  const targetCrews = crews.map((crew) => {
    const target = crew.name.replace(/(^\s+)|(\s+$)/g, '')
    return { category: crew.category, name: target }
  })
  const targetTags = tags.map((tag) => {
    const target = tag.text.replace(/(^\s+)|(\s+$)/g, '')
    return { text: target }
  })

  const newData: PostMovieData = {
    title: targetTitle,
    release: Number(targetRelease),
    time: Number(targetTime),
    countries: targetCountries,
    studios: targetStudios,
    crews: targetCrews,
    tags: targetTags,
  }

  return newData
}
