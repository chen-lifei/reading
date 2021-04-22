import Vue from 'vue'
import Vuex from 'vuex'
import { apiLogin, fecthInfo } from '@/api/user'

Vue.use(Vuex)

const state = {
    userInfo: {},
    userId: '',
    activeIndex: '1',
    token: localStorage.getItem('readingToken') || ''
}

const getters = {
}

const mutations = {
    getUserInfo (state, info) {
        state.userInfo = info
    },
    getActiveIndex (state, data) {
        state.activeIndex = data
    },
    login (state, data) {
        const { token, userId } = data
        state.token = token
        state.userId = userId
        localStorage.setItem('readingToken', token)
        localStorage.setItem('readerId', userId)
    }
}

const actions = {
    async getUserInfo ({commit}, userId) {
        const { data } = await fecthInfo(userId)
        commit('getUserInfo', data[0])
    },
    getActiveIndex ({commit}, data) {
        commit('getActiveIndex', data)
    },
    async login ({commit}, info) {
        const { account, password } = info
        const { data } = await apiLogin({ account, password })
        if (data.state === 1) {
            commit('login', {
                token: data.data.token,
                userId: data.data.userId
            })
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
