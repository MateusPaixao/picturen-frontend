import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://192.168.0.3:3000'
    // baseURL: 'https://paixaodev.com.br/picturen' // TODO: fix https issue
    baseURL: 'http://54.205.251.255/picturen'
})

export default api