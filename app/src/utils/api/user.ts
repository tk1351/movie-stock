import { RegisterUser } from '../../../types/user'
import API from '../api/api'

export const registerUser = async (userData: RegisterUser) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register`

  try {
    await API.post(url, userData)
  } catch (e) {
    throw new Error(e)
  }
}
