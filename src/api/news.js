import { API_SERVER_NEWS, axiosIntance } from "./auth_header"

export const _getCategoryNews = async () => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/categories`)
  return request
}

export const _getCategoryBySlug = async (slug) => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/categories/slug/${slug}`)
  return request
}

export const _getSubCategoryNews = async (id) => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/categories/sub-cate/${id}`)
  return request.data
}

export const _getNewsByCate = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/news`, {
    params: params
  })
  return request.data
}

export const _getNewBySlug = async (slug) => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/news/slug/${slug}`)
  return request.data
}

export const _getNewHome = async () => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/news/from-home`)
  return request.data
}

export const _getNewByCreatedAt = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/news/bai-viet-moi`, {
    params: params
  })
  return request.data
}

export const _getNewByTag = async (params) => {
  const request = await axiosIntance.get(`${API_SERVER_NEWS}/news/tag`, {
    params: params
  })
  return request.data
}