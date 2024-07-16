import { axiosIntance, API_SERVER } from './auth_header'
import axios from 'axios'

//cart
export const _getCart = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/order/cart`)
  return request
}

export const _countCart = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/order/cart-count`)
  return request
}

export const _postCart = async (body) => {
  const request = await axiosIntance.post(`${API_SERVER}/order/cart`, body)
  return request
}

export const _putCart = async (body) => {
  const request = await axiosIntance.put(`${API_SERVER}/order/cart`, body)
  return request
}

export const _deleteCart = async (id) => {
  const request = await axiosIntance.delete(`${API_SERVER}/order/cart/${id}`)
  return request
}

//order api
export const _createOrder = async (body) => {
  if(body.shipping_district == null || body.shipping_district == '') {
    delete body.shipping_district
  }
  if(body.shipping_city == null || body.shipping_city == '') {
    delete body.shipping_city
  }
  const request = await axiosIntance.post(`${API_SERVER}/order/check-out`, body)
  return request
}

export const _createOrderErp = async (body) => {
  if(body.shipping_district == null || body.shipping_district == '') {
    delete body.shipping_district
  }
  if(body.shipping_city == null || body.shipping_city == '') {
    delete body.shipping_city
  }
  const request = await axiosIntance.post(`${API_SERVER}/order/check-out-erp`, body)
  return request
}

export const _createOrderNotUser = async (body) => {
  if(body.shipping_district == null || body.shipping_district == '') {
    delete body.shipping_district
  }
  if(body.shipping_city == null || body.shipping_city == '') {
    delete body.shipping_city
  }
  const request = await axiosIntance.post(`${API_SERVER}/order/check-out-guest`, body)
  return request
}

export const _confirmOrder = async (id) => {
  const request = await axiosIntance.put(`${API_SERVER}/order/submit-checkout/${id}`)
  return request
}

export const _confirmIpnVnpay = async (params) => {
  const request = await axiosIntance.get(`http://localhost:3000/order/vnpay-ipn`, {
    params: params
  })
  return request
}

export const _getListOrder = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/order/check-out`, {
    params: params
  })
  return request.data
}

export const _getDetailOrder = async (id) => {
  const request = await axiosIntance.get(`${API_SERVER}/order/check-out/${id}`)
  return request.data
}

export const _deleteOrder = async (id) => {
  const request = await axiosIntance.delete(`${API_SERVER}/order/check-out/${id}`)
  return request.data
}

export const _getBaoHanh = async (params) => {
  const request = await axios.get(`${API_SERVER}/order/check-insurance`, {
    params: params
  })
  return request.data
} 

export const _getCheckOrder = async (params) => {
  const request = await axios.get(`${API_SERVER}/order/traking-order`, {
    params: params
  })
  return request.data
}