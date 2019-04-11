import Vue from 'vue'
import Vuex from 'vuex'
import * as interfaces from '@/interface'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state: interfaces.AppState = {
    p4State: {
        isReady: false,
    },
    p4Info: {
        userName: '',
        clientRoot: '',
    },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
