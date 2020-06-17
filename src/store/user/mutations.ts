import { MutationTree } from 'vuex'
import { UserState } from './types'

export const mutations: MutationTree<UserState> = {
  // 记录购物车中的商品总数
  SET_CART_COUNT (state: UserState, num: number) {
    state.cartCount = num
  },
  // 记录分类页在哪一个分类
  SET_CATE_ID (state: UserState, cateId: number) {
    state.cateId = cateId
  }
}
