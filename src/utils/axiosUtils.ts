import axios from 'axios'
import { toast } from 'react-toastify'

const apiAnurag = axios.create({
  baseURL: 'https://cnn8dm3ts0.execute-api.us-east-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const requestAnurag = async (method: string, url: string, data?: any, config?: any) => {
  try {
    const response = await apiAnurag({
      method,
      url,
      data,
      ...config
    })

    return response.data
  } catch (error) {
    toast.error('Something went wrong. Please try again.')

    // throw error
  }
}

export const apiAnuragGet = (url: string, config?: any) => requestAnurag('GET', url, null, config)
export const apiAnuragPost = (url: string, data: any, config?: any) => requestAnurag('POST', url, data, config)
export const apiAnuragPut = (url: string, data: any, config?: any) => requestAnurag('PUT', url, data, config)
export const apiAnuragPatch = (url: string, data: any, config?: any) => requestAnurag('PATCH', url, data, config)
export const apiAnuragDeleteRequest = (url: string, config?: any) => requestAnurag('DELETE', url, null, config)
