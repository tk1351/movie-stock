import axios from 'axios'

export const offset: number = 0
export const limit: number = 30

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:8080',
})
