import client from './index'

export const registerApi = async (userData) => {
  try {
    const response = await client.post('auth/register', userData)
    return response
  } catch (error) {
    console.log(error.message)
  }
}

export const loginApi = async (userData) => {
  try {
    const response = await client.post('auth/login', userData)
    return response
  } catch (error) {
    console.log(error.message)
  }
}

export const userApi = async (userData) => {
  try {
    const response = await client.get('auth/user', userData)
    return response
  } catch (error) {
    console.log(error.message)
  }
}