import { Module } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'
import { getters } from './getters'
import { mutations } from './mutations'

const state: UserState = {
  cartCount: 0,
  cateId: 0
}

const namespaced = true
export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations
}
