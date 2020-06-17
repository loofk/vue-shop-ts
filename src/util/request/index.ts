import http from './core'
import { AxiosRequestConfig } from 'axios'

interface BaseResponse<T> {
  code: number;
  msg: string;
  data: T;
  meta?: any;
}

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    http
      .request<BaseResponse<T>>(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(e => reject(e))
  })
}

/**
 * POST方法实现
 * @param uri
 * @param body
 * @returns {Promise}
 */
export function post<T> (uri: string, body?: object | undefined): Promise<BaseResponse<T>> {
  return request<T>({
    url: uri,
    method: 'POST',
    data: body
  })
}
