import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: []
}

const mutations = {
    GET_USER_INFO (info) {
        state.userInfo = info
        // setStorage('user_id', userInfo.id); // 缓存user id
    }
}

const actions = {
    getUserInfo ({commit}, info) {
        commit('GET_USER_INFO', info)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
