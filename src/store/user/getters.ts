import { GetterTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<UserState, RootState> = {
  getCartCount: (state: UserState): number => {
    const { cartCount } = state
    return cartCount
  },
  getCateId: (state: UserState): number => {
    const { cateId } = state
    return cateId
  }
}
