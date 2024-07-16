import {
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  GET_PRODUCT_DETAIL,
  GET_FAVOURITE_PRODUCT,
  POST_FAVOURITE_PRODUCT,
  DELETE_FAVOURITE_PRODUCT,
  GET_LIST_PRODUCT,
  SEARCH_PRODUCT,
  GET_CATEGORY_SLUG,
  GET_CATEGORY_DETAIL,
  GET_PRODUCT_BEST_SELLER,
  GET_PRODUCT_FROM_GIGA_DIGITAL,
  CLEAR_DATA,
  CLEAR_LIST_PRODUCT,
  GET_ALL_LIST_PRODUCT
} from '../type'

const initialState = {
  listCategory: [],
  listSubCategory: [],
  productDetail: {},
  listFavourite: [],
  listProduct: [],
  allProducts: [],
  searchProduct: null,
  listCategorySlug: null,
  listCategoryDetail: [],
  listProductBestSeller: [],
  productFromGigaDigital: null
}

const product = (state = initialState, action) => {

  switch (action.type) {

    case GET_CATEGORY:
      return {
        ...state,
        listCategory: action.data,
      }
    case GET_SUB_CATEGORY:
      return {
        ...state,
        listSubCategory: action.data,
      }
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.data,
      }
    case GET_FAVOURITE_PRODUCT:
      return {
        ...state,
        listFavourite: action.data,
      }
    case POST_FAVOURITE_PRODUCT:
      return {
        ...state,
        listFavourite: action.data,
      }
    case DELETE_FAVOURITE_PRODUCT:
      return {
        ...state,
        listFavourite: action.data,
      }

    case GET_LIST_PRODUCT:
      if (action.data && action.data.data && action.data.data.length > 0) {
        return {
          ...state,
          listProduct: action.data
        }
      } else {
        return state
      }

    case GET_ALL_LIST_PRODUCT:
      return {
        ...state,
        allProducts: action.data
      }
    case SEARCH_PRODUCT:
      return {
        ...state,
        searchProduct: action.data
      }
    case GET_CATEGORY_SLUG:
      return {
        ...state,
        listCategorySlug: action.data
      }
    case GET_CATEGORY_DETAIL:
      return {
        ...state,
        listCategoryDetail: action.data
      }
    case CLEAR_LIST_PRODUCT:
      return {
        ...state,
        listProduct: []
      }
    case GET_PRODUCT_BEST_SELLER:
      return {
        ...state,
        listProductBestSeller: action.data
      }
    case GET_PRODUCT_FROM_GIGA_DIGITAL:
      return {
        ...state,
        productFromGigaDigital: action.data
      }
    case CLEAR_DATA:
      return {
        ...state,
        productDetail: {}
      }
    default:
      return state
  }
}

export default product