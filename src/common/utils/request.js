import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from 'common/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 请求
service.interceptors.request.use(
  config => {
    if (!config.isMock) config.baseURL = process.env.VUE_APP_BASE_SERVE_API
    if (store.getters.token) config.headers['accessToken'] = getToken()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

// 返回
service.interceptors.response.use(
  response => {
    const data = response.data
    if (data.code === 200 && !data.data) {
      return Message.success('操作成功！')
    }

    switch (data.code) {
      case 401:
        Message.error('401')
        break
      case 403:
        Message.error('403')
        break
      case 500:
        Message.error('500')
        break
      default:
        return Promise.resolve(data)
    }
    return Promise.resolve(data)
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

// 增
export const postRequest = (url, params, isMock = false) => {
  return service({
    method: 'POST',
    url: url,
    data: params,
    isMock,
  })
}

// 删
export const deleteRequest = (url, params, isMock = false) => {
  return service({
    method: 'DELETE',
    url: `${url}/${params}`,
    isMock,
  })
}

// 改
export const putRequest = (url, params, isMock = false) => {
  return service({
    method: 'PUT',
    url: url,
    isMock,
    data: params,
  })
}

// 查
export const getRequest = (url, params, isMock = false) => {
  return service({
    method: 'GET',
    url: url,
    isMock,
    params: params,
  })
}
