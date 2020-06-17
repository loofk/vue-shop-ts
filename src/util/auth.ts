interface TokenOptions {
  name: string;
  date: number;
}
/**
 * 获取存储的Token
 */
export function getToken (): string | boolean {
  try {
    const res = localStorage.getItem('API-TOKEN')
    if (res !== null) {
      const token: TokenOptions = JSON.parse(res)
      return token.date > +new Date() ? token.name : false
    }
  } catch (e) { }

  return false
}

/**
 * 存储Token
 * @param token
 */
export function setToken (token: string): boolean {
  try {
    console.log('set token: ' + token)
    localStorage.setItem('API-TOKEN', JSON.stringify({ name: token, date: +new Date() + 7000000 }))
    return true
  } catch (e) {
    return false
  }
}
