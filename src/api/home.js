import { API_SERVER, axiosIntance } from "./auth_header"

export const _getCarousel = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/home/banner`)
  return request.data
}

export const _getBrand = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/brand`, {
    params: params
  })
  return request.data
}

export const _getProductHome = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/home/product-home`)
  return request.data
}

export const _checkVoucher = async (voucher, listProductId, totalPrice) => {
  const params = {
    voucher: voucher,
    productId: listProductId,
    total_price: totalPrice
  }
  const request = await axiosIntance.get(`${API_SERVER}/home/check-voucher`, {
    params: params
  })
  return request.data
}

export const _getFlashSale = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/home/flash-sale`)
  return request.data
}

export const _postReserve = async (body) => {
  const request = await axiosIntance.post(`${API_SERVER}/home/reserve`, body)
  return request
}