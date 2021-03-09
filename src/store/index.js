import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: {},
    activeIndex: '1'
}

const getters = {
}

const mutations = {
    getUserInfo (state, info) {
        state.userInfo = info
    },
    getActiveIndex (state, data) {
        state.activeIndex = data
    }
}

const actions = {
    getUserInfo ({commit}, info) {
        commit('getUserInfo', info)
    },
    getActiveIndex ({commit}, data) {
        commit('getActiveIndex', data)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
