import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: {}
}

const getters = {
}

const mutations = {
    getUserInfo (state, info) {
        state.userInfo = info
    }
}

const actions = {
    getUserInfo ({commit}, info) {
        commit('getUserInfo', info)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
