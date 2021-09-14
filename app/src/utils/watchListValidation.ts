import * as yup from 'yup'

const requireTitle = 'タイトルを入力してください'
const requireDirector = '監督名を入力してください'
const requireRelease = '製作年を入力してください'
const requireTime = '上映時間を入力してください'
const requireURL = 'URLを入力してください'

export const watchListValidationSchema = yup.object().shape({
  title: yup.string().required(requireTitle),
  director: yup.string().required(requireDirector),
  release: yup.string().required(requireRelease),
  time: yup.string().required(requireTime),
  url: yup.string().required(requireURL),
})
