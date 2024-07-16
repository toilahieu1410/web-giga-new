import {
  _getCategory,
  _getSubCategory,
  _getFavouriteProduct,
  _postFavouriteProduct,
  _deleteFavouriteProduct,
  _getProductDetail,
  _getListProduct,
  _getSearchProduct,
  _getCategoryBySlug,
  _getProductBestSeller,
  _getProductFromGigaDigital,
} from "../../api/product"

import {
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  GET_FAVOURITE_PRODUCT,
  POST_FAVOURITE_PRODUCT,
  DELETE_FAVOURITE_PRODUCT,
  GET_PRODUCT_DETAIL,
  GET_LIST_PRODUCT,
  SEARCH_PRODUCT,
  GET_CATEGORY_SLUG,
  GET_CATEGORY_DETAIL,
  GET_PRODUCT_BEST_SELLER,
  GET_PRODUCT_FROM_GIGA_DIGITAL,
  GET_ALL_LIST_PRODUCT,
} from "../type"

export const getCategory = () => async dispatch => {
  try {
    _getCategory().then(function (res) {
      return dispatch({ type: GET_CATEGORY, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getSubCategory = (id) => async dispatch => {
  try {
    _getSubCategory(id).then(function (res) {
      return dispatch({ type: GET_SUB_CATEGORY, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getFavouriteProduct = (params) => async dispatch => {
  try {
    _getFavouriteProduct(params).then(function (res) {
      return dispatch({ type: GET_FAVOURITE_PRODUCT, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const postFavouriteProduct = (body) => async dispatch => {
  try {
    _postFavouriteProduct(body).then(function (res) {
      dispatch(getFavouriteProduct())
      return dispatch({ type: POST_FAVOURITE_PRODUCT, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteFavouriteProduct = (id) => async dispatch => {
  try {
    _deleteFavouriteProduct(id).then(function (res) {
      dispatch(getFavouriteProduct())
      return dispatch({ type: DELETE_FAVOURITE_PRODUCT, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getProductDetail = (id) => async dispatch => {
  try {
    _getProductDetail(id).then(function (res) {
      if (res) {
        const imageDetail = res.vesion_detail.filter((item) => item.image && item.image != '').map((item) => item.image)
        res.images = [...res.images, ...imageDetail]
      }
      return dispatch({ type: GET_PRODUCT_DETAIL, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getListProduct = (params, body) => async dispatch => {
  try {
    await _getListProduct(params, body).then(function (res) {
      return dispatch({ type: GET_LIST_PRODUCT, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllListProduct = (params, body) => async dispatch => {
  try {
    await _getListProduct(params, body).then(function (res) {
      return dispatch({ type: GET_ALL_LIST_PRODUCT, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}


export const getSearchProduct = (params) => async dispatch => {
  try {
    _getSearchProduct(params).then(function (res) {
      return dispatch({ type: SEARCH_PRODUCT, data: res.data })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getCategoryBySlug = (slug) => async dispatch => {
  try {
    _getCategoryBySlug(slug).then(res => {
      return dispatch({ type: GET_CATEGORY_SLUG, data: res.data })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getCategoryByDetail = (slug) => async dispatch => {
  try {
    _getSubCategory(slug).then(res => {
      return dispatch({ type: GET_CATEGORY_DETAIL, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getProductBestSeller = (slug) => async dispatch => {
  try {
    _getProductBestSeller(slug).then(res => {
      return dispatch({ type: GET_PRODUCT_BEST_SELLER, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getProductFromGigaDigital = (slug) => async dispatch => {
  try {
    _getProductFromGigaDigital(slug).then(res => {
      return dispatch({ type: GET_PRODUCT_FROM_GIGA_DIGITAL, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}