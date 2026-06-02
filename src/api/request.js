import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.response.use(
  (response) => {
    const result = response.data

    if (result?.code && result.code !== 200) {
      ElMessage.error(result.message || '请求失败')
      return Promise.reject(result)
    }

    return result
  },
  (error) => {
    ElMessage.error(error.message || '网络请求失败')
    return Promise.reject(error)
  },
)

export default request
