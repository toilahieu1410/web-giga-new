import { API_SERVER, axiosIntance, API_SERVER_IMAGE, API_SERVER_GHN } from "./auth_header"
import axios from "axios"

export const _getProfile = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/account/profile`)
  return request.data
}

export const _updateProfile = async (body) => {
  const request = await axiosIntance.put(`${API_SERVER}/account/profile`, body)
  return request
}

// export const _getCity = async () => {
//   const request = await axiosIntance.get(`${API_SERVER}/deliver/city`)
//   return request.data
// }

// export const _getDistrict = async (id) => {
//   const request = await axiosIntance.get(`${API_SERVER}/deliver/district/${id}`)
//   return request.data
// }

export const _getCity = async () => {
  const request = await axios.get(`${API_SERVER_GHN}/master-data/province`, {
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_TOKEN_GHN
    }
  })
  return request.data.data.reverse()
}

export const _getDistrict = async (id) => {
  const body = { 'province_id': id }
  const request = await axios.post(`${API_SERVER_GHN}/master-data/district`, body, {
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_TOKEN_GHN
    }
  })
  return request.data.data.reverse()
}

export const _getShippingFee = async (toDistrict) => {
  const bodyHN = {
    from_district_id: 1486,
    // service_id: 53319,
    service_type_id: 2,
    to_district_id: toDistrict,
    height: 20,
    width: 20,
    length: 20,
    weight: 100,
    insurance_value: 10000,
    coupon: null
  }
  const bodyHCM = {
    from_district_id: 1454,
    // service_id: 53319,
    service_type_id: 2,
    to_district_id: toDistrict,
    height: 20,
    width: 20,
    length: 20,
    weight: 100,
    insurance_value: 10000,
    coupon: null
  }
  const header = {
    'Content-Type': 'application/json',
    'ShopID': 78969,
    'token': process.env.REACT_APP_TOKEN_GHN
  }
  const requestHN = await axios.post(`${API_SERVER_GHN}/v2/shipping-order/fee`, bodyHN, {
    headers: header
  })
  const requestHCM = await axios.post(`${API_SERVER_GHN}/v2/shipping-order/fee`, bodyHCM, {
    headers: header
  })
  if(requestHN.data.data.total < requestHCM.data.data.total) {
    return requestHN.data.data
  }
  return requestHCM.data.data
}

export const _postImageProduct = async (params, body) => {
  const request = await axios.post(`${API_SERVER_IMAGE}/upload/product`, body, {
    params: params,
    headers: { "Content-Type": "multipart/form-data" } 
  })
  return request
}