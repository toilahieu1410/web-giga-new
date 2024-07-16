import { API_SERVER, axiosIntance } from "./auth_header"

export const _getCommentProduct = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/comment`, {
    params: params
  })
  return request
}

export const _postCommentProduct = async (body) => {
  const request = await axiosIntance.post(`${API_SERVER}/comment`, body)
  return request
}

export const _putCommentProduct = async (id, body) => {
  const request = await axiosIntance.put(`${API_SERVER}/comment/${id}`, body)
  return request
}

export const _getSalesOffPublic = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/comment/sales-off-public`)
  return request
}