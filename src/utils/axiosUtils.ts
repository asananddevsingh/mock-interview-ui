import axios from 'axios'
import { toast } from 'react-toastify'

//-================= Lokesh
const apiLokesh = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  baseURL: 'https://r1vsf5jut3.execute-api.eu-north-1.amazonaws.com/DEV',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const requestLokesh = async (method: string, url: string, data?: any, config?: any) => {
  try {
    const response = await apiLokesh({
      method,
      url,
      data,
      ...config
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const apiLokeshGet = (url: string, config?: any) => requestLokesh('GET', url, null, config)
export const apiLokeshPost = (url: string, data: any, config?: any) => requestLokesh('POST', url, data, config)
export const apiLokeshPut = (url: string, data: any, config?: any) => requestLokesh('PUT', url, data, config)
export const apiLokeshPatch = (url: string, data: any, config?: any) => requestLokesh('PATCH', url, data, config)
export const apiLokeshDeleteRequest = (url: string, config?: any) => requestLokesh('DELETE', url, null, config)

//-================= Anurag

const apiAnurag = axios.create({
  baseURL: 'https://tt7edl9tqg.execute-api.ap-south-1.amazonaws.com/dev',
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
