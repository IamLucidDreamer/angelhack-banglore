import axios from 'axios'

const BASE_URL = `https://mutual-fund-msme.onrender.com`

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

server.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)
    return Promise.reject(error)
  }
)

export default server
