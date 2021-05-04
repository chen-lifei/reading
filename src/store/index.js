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
    login ({ commit }, info) {
        const { account, password } = info
        return new Promise((resolve, reject) => {
            apiLogin({ account, password }).then(res => {
                if (res.data.state === 1) {
                    console.log(res.data)
                    commit('login', {
                        token: res.data.data.token,
                        userId: res.data.data.userId
                    })
                }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
