import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/todos',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export default axiosInstance
