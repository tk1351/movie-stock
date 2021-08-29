import { removeFrontRearSpace } from '../../../src/utils/movie'
import { IMovieInputs } from '../../../types/movie'

const data: IMovieInputs = {
  title: 'test',
  release: '2000',
  time: '120',
  countries: [{ country: 'japan' }],
  studios: [{ studio: 'daiei' }],
  crews: [{ category: 1, name: 'John Ford' }],
  tags: [{ text: 'test' }],
}

describe('removeFrontRearSpace', () => {
  it('引数のデータと返り値が同じである', () => {
    let result = removeFrontRearSpace(data)
    expect(result).toEqual(data)
  })

  it('引数のデータの前後にスペースが含まれる場合は削除される', () => {
    const data: IMovieInputs = {
      title: ' test ',
      release: ' 2000 ',
      time: ' 120 ',
      countries: [{ country: ' japan ' }],
      studios: [{ studio: ' daiei ' }],
      crews: [{ category: 1, name: ' John Ford ' }],
      tags: [{ text: ' test ' }],
    }

    const { title, release, time, countries, studios, crews, tags } = data

    expect(title.length).toBe(6)
    expect(release.length).toBe(6)
    expect(time.length).toBe(5)
    expect(countries[0].country.length).toBe(7)
    expect(studios[0].studio.length).toBe(7)
    expect(crews[0].name.length).toBe(11)
    expect(crews[0].category).toBe(1)
    expect(tags[0].text.length).toBe(6)

    let result = removeFrontRearSpace(data)

    expect(result.title.length).toBe(4)
    expect(result.release.length).toBe(4)
    expect(result.time.length).toBe(3)
    expect(result.countries[0].country.length).toBe(5)
    expect(result.studios[0].studio.length).toBe(5)
    expect(result.crews[0].name.length).toBe(9)
    expect(result.crews[0].category).toBe(1)
    expect(result.tags[0].text.length).toBe(4)
  })
})
