import { Indicator, Toast } from 'mint-ui'

export function loading (text: string | boolean = '', config: object = {}) {
  if (typeof text === 'boolean' && text === false) {
    Indicator.close()
  } else {
    const options = { text, spinnerType: 'fading-circle', ...config }
    Indicator.open(options)
  }
}

export function toast (text: string, icon: string, position = 'center', config: object = {}) {
  const options = { text, position, duration: 2000, ...config }
  Toast(options)
}
