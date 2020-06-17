import { Module } from 'vuex'
import { AppState } from './types'
import { RootState } from '../types'
import { getters } from './getters'

const state: AppState = {
  navHeight: 45
}

const namespaced = true
export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  getters
}
