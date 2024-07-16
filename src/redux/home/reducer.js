import {
  GET_CAROUSEL,
  GET_PRODUCT_HOME,
  GET_FLASH_SALE,
  GET_BRAND
} from '../type'

const initialState = {
  listBrand: [],
  countBrand: 0,
  listCarousel: null,
  listProductHome: null,
  flashSale: null
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAROUSEL:
      return {
        ...state,
        listCarousel: action.data,
      }
    case GET_BRAND:
      return {
        ...state,
        listBrand: action.data.data,
        countBrand: action.data.count,

      }
    case GET_PRODUCT_HOME:
      return {
        ...state,
        listProductHome: action.data
      }
    case GET_FLASH_SALE:
      return {
        ...state,
        flashSale: action.data
      }
    default:
      return state
  }
}

export default home