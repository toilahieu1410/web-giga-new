import { API_SERVER, API_SERVER_ERP, axiosIntance } from "./auth_header"

export const _login = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/account/sign-in`, {
    params: params
  })
  return request
}

export const _register = async (body) => {
  const request = await axiosIntance.post(`${API_SERVER}/account/sign-up`, body)
  return request
}

export const _forgotPassword = async (email) => {
  const request = await axiosIntance.get(`${API_SERVER}/account/forgot-password`, {
    params: { email: email }
  })
  return request
}

export const _changPassWord = async (id, body) => {
  const request = await axiosIntance.put(`${API_SERVER}/account/forgot-password/${id}`, body)
  return request
}

export const _loginErp = async (username, password) => {
  const request = await axiosIntance.get(`${API_SERVER_ERP}/api/Api_NhanVien/LoginERP/${username}/${password}`)
  return request.data
}

export const _getUserErp = async (username) => {
  const request = await axiosIntance.get(`${API_SERVER_ERP}/api/Api_NhanVien/GetChiTietNhanVien/${username}`)
  return request.data
}