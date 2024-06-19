import axiosInstance from './APIHelper.js'

export function getTodos(userId) {
  return axiosInstance({
    method: 'get',
    url: `/user/${userId}`
  })
}
