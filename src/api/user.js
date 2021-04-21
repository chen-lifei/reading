import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export function apiLogin ({ account, password }) {
    return axios.post('/login', {
        account,
        password
    })
}

export function fecthInfo (id) {
    return axios.post('/getUser/' + id)
}
