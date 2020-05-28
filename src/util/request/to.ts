/**
 * 处理请求返回数据，将成功失败数据装载到res、err两个变量中
 * @param {Promise} promise
 * @returns {Array}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function to (promise: Promise<any>): Promise<any> {
  return promise
    .then(res => {
      return [null, res]
    })
    .catch(err => [err])
}
