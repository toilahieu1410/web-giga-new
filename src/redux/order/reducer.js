import {
  GET_CART,
  COUNT_CART,
  POST_CART,
  PUT_CART,
  DELETE_CART,
  CREATE_ORDER,
  CONFIRM_ORDER ,
  GET_LIST_ORDER,
  DELETE_ORDER,
  GET_DETAIL_ORDER,
  GET_BAO_HANH,
  GET_CHECK_ORDER
} from '../type'

const initialState = {
  listCart: [],
  count: null,
  listOrder: [],
  detailOrder: {},
  dataBaoHanh: [],
  checkOrder: null
}

const order = ( state = initialState, action ) => {
  switch(action.type) {
    case GET_CART:
      return {
        ...state,
        listCart: action.data
      }
    case COUNT_CART:
      return {
        ...state,
        count: action.data
      }
    case POST_CART:
      return {
        ...state
      }
    case PUT_CART:
      return {
        ...state
      }
    case DELETE_CART:
      return {
        ...state
      }
    case CREATE_ORDER :
      return {
        ...state
      }
    case CONFIRM_ORDER :
      return {
        ...state
      }
    case GET_LIST_ORDER :
      return {
        ...state,
        listOrder: action.data
      }
    case DELETE_ORDER :
      return {
        ...state
      }
    case GET_DETAIL_ORDER :
      return {
        ...state,
        detailOrder: action.data
      }
    case GET_BAO_HANH :
      return {
        ...state,
        dataBaoHanh: action.data
      }
    case GET_CHECK_ORDER :
      return {
        ...state,
        checkOrder: action.data
      }
    default:
      return state
  }
}

export default order