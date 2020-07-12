import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.3:3000'
    // baseURL: 'https://picturen-backend.herokuapp.com'
})

export default api