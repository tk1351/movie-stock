import * as yup from 'yup'

const requireTitle = 'タイトルを入力してください'
const requireRelease = '製作年を入力してください'
const requireTime = '上映時間を入力してください'
const requireCountry = '製作国を入力してください'
const requireStudio = '制作会社を入力してください'
const requireCrewsCategory = '役職を入力してください'
const requireCrewsName = '名前を入力してください'
const requireTagsText = 'タグを入力してください'
const vaiolationNumber = '数字を入力してください'

export const movieValidationSchema = yup.object().shape({
  title: yup.string().required(requireTitle),
  release: yup.string().required(requireRelease),
  time: yup.string().required(requireTime),
  details: yup.array(
    yup.object().shape({
      country: yup.string().required(requireCountry),
      studio: yup.string().required(requireStudio),
    })
  ),
  crews: yup.array(
    yup.object().shape({
      category: yup
        .number()
        .typeError(vaiolationNumber)
        .required(requireCrewsCategory),
      name: yup.string().required(requireCrewsName),
    })
  ),
  tags: yup.array(
    yup.object().shape({
      text: yup.string().required(requireTagsText),
    })
  ),
})
