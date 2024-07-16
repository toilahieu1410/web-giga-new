import { _getCarousel, _getProductHome, _getFlashSale, _getBrand } from "../../api/home"
import { GET_CAROUSEL, GET_PRODUCT_HOME, GET_FLASH_SALE, GET_BRAND } from '../type'

export const getCarousel =  () => async dispatch => {
  try {
    _getCarousel().then( function(res) {
      return dispatch({type: GET_CAROUSEL, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getProductHome = () => async dispatch => {
  try {
    _getProductHome().then(res => {
      return dispatch({type: GET_PRODUCT_HOME, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getBrand = (params) => async dispatch => {
  try {
    _getBrand(params).then(res => {
      return dispatch({type: GET_BRAND, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getFlashSale = () => async dispatch => {
  try {
    _getFlashSale().then(res => {
      return dispatch({ type: GET_FLASH_SALE, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}