import { axiosIntance, API_SERVER, API_SERVER_GIGA_DIGITAL } from './auth_header'

export const _getCategory = async () => {
  const request = await axiosIntance.get(`${API_SERVER}/product/categories`)
  return request.data
}

export const _getSubCategory = async (id) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/sub-categories/${id}`)
  return request.data
}

export const _getFavouriteProduct = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/favourite/get` ,{
    params: params
  })
  return request.data
}

export const _postFavouriteProduct = async (body) => {
  const request = await axiosIntance.post(`${API_SERVER}/product/favourite/get`, body)
  return request.data
}

export const _deleteFavouriteProduct = async (id) => {
  const request = await axiosIntance.put(`${API_SERVER}/product/favourite/${id}`)
  return request
}

export const _getCategoryBySlug = async (slug) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/categories-by-slug/${slug}`)
  return request
}

// Lay chi tiet
export const _getProductDetail = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/product`, {
    params: params
  })
  return request.data
}

export const _getListProduct = async (params, body) => {
  const request = await axiosIntance.post(`${API_SERVER}/product/product-categories-web`, body, {
    params: params
  })
  return request.data
}


export const _getProductFromCart = async (data) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/product-from-cart`, {
    params: data
  })
  return request.data
}

export const _getSearchProduct = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/search-web`, {
    params: params
  })
  return request
}

// Best seller
export const _getProductBestSeller = async (slug) => {
  const request = await axiosIntance.get(`${API_SERVER}/product/best-seller/${slug}`)
  return request.data
}

// Lay san pham tu web giga digital
export const _getProductFromGigaDigital = async (slug) => {
  const request = await axiosIntance.get(`${API_SERVER_GIGA_DIGITAL}/product`, {
    params: {
      slug: slug
    }
  })
  return request.data
}