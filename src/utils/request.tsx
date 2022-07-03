import axios, { AxiosRequestConfig } from 'axios'
import { API_BASE_URL, NFTSCAN_API_KEY } from '../constants'

export const get = async <SuccessResponse extends unknown = unknown>({
  url,
  baseUri = `${API_BASE_URL}`,
  params,
}: {
  url: string
  baseUri?: string
  params?: { [key: string]: string | number | null | undefined | Array<any> }
}): Promise<SuccessResponse> => {
  const config: AxiosRequestConfig = {
    url,
    method: 'get',
    baseURL: baseUri,
    params,
    headers: {
      'x-api-key': NFTSCAN_API_KEY,
    },
  }

  const res = await axios.request<SuccessResponse>(config)

  if (res.status >= 400 && res.status < 600) {
    throw new Error(res.data as string)
  }

  return res.data
}

export const post = async <SuccessResponse extends unknown = unknown>({
  url,
  params,
  baseUri = `${API_BASE_URL}`,
}: {
  url: string
  baseUri?: string
  params?: { [key: string]: any }
  withCrud?: boolean
}) => {
  const baseURL = baseUri

  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': NFTSCAN_API_KEY,
    },
    validateStatus: function (status) {
      return status >= 200 && status < 520 // default
    },
  }

  if (params) {
    config.data = JSON.stringify(params)
  }

  const res = await axios.request<SuccessResponse>(config)
  if (res.status >= 400 && res.status < 600) {
    throw new Error(res.data as string)
  }
  return res.data
}
