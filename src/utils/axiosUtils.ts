import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  baseURL: 'https://r1vsf5jut3.execute-api.eu-north-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json'
  }
})

const request = async (method: string, url: string, data?: any, config?: any) => {
  try {
    const response = await api({
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

export const apiGet = (url: string, config?: any) => request('GET', url, null, config)
export const apiPost = (url: string, data: any, config?: any) => request('POST', url, data, config)
export const apiPut = (url: string, data: any, config?: any) => request('PUT', url, data, config)
export const apiPatch = (url: string, data: any, config?: any) => request('PATCH', url, data, config)
export const apiDeleteRequest = (url: string, config?: any) => request('DELETE', url, null, config)

export default request
