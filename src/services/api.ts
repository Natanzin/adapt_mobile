import axios from 'axios'

const api = axios.create({
    baseURL: 'http://napi.adapterp.com.br'
})

export default api