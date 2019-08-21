import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {
      userGoodsCount: 0
    },
    mutations: {
      setUserGoodsCount (state, payload) {
        state.userGoodsCount = payload
      }
    },
    actions: {
      setUserGoodsCount (context, payload) {
        context.commit('setUserGoodsCount', payload)
      }
    }
  })
}

export default store
