import http from './core'

/**
 * POST方法实现
 * @param uri
 * @param body
 * @returns {Promise}
 */
export const post = (uri: string, body?: object | undefined) => {
  return http({
    url: uri,
    method: 'post',
    data: body
  })
}
