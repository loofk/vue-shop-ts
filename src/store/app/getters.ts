import { GetterTree } from 'vuex'
import { AppState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<AppState, RootState> = {
  getNavHeight: (state: AppState): number => {
    const { navHeight } = state
    return navHeight
  }
}
