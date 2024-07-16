import { toast } from 'react-toastify'
import {
  _getCart,
  _countCart,
  _postCart,
  _putCart,
  _deleteCart,
  _createOrder,
  _confirmOrder ,
  _getListOrder,
  _deleteOrder,
  _getDetailOrder,
  _getBaoHanh,
  _getCheckOrder
} from '../../api/order'

import {
  GET_CART,
  COUNT_CART,
  POST_CART,
  PUT_CART,
  DELETE_CART,
  CREATE_ORDER,
  CONFIRM_ORDER,
  GET_LIST_ORDER,
  DELETE_ORDER,
  GET_DETAIL_ORDER,
  GET_BAO_HANH,
  GET_CHECK_ORDER
} from '../type'

export const getCart = () => async dispatch => {
  try {
    _getCart().then(res => {
      return dispatch({type: GET_CART, data: res.data})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const countCart = () => async dispatch => {
  try {
    _countCart().then(res => {
      return dispatch({type: COUNT_CART, data: res.data})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const postCart = (body) => async dispatch => {
  try {
    _postCart(body).then(res => {
      if (res.status == 200) {
        toast.info(res.data.message)
        dispatch(countCart())
        return dispatch({type: POST_CART, data: res.data})
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const putCart = (body) => async dispatch => {
  try {
    _putCart(body).then(res => {
      if (res.status == 200) {
        toast.info(res.data.message)
        return dispatch({type: PUT_CART, data: res.data})
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteCart = (id) => async dispatch => {
  try {
    _deleteCart(id).then(res => {
      if(res.status == 200) {
        dispatch(getCart())
        dispatch(countCart())
        return dispatch({type: DELETE_CART, data: res.data})
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}


export const createOrder = (body) => async dispatch => {
  try {
    _createOrder(body).then(function(res) {
      if(res.status == 200) {
        toast.success('Tạo đơn hàng thành công')
        return dispatch({type: CREATE_ORDER, data: res})
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const confirmOrder = (id) => async dispatch => {
  try {
    _confirmOrder(id).then(function(res) {
      return dispatch({type: CONFIRM_ORDER, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getListOrder = (params) => async dispatch => {
  try {
    _getListOrder(params).then(function(res) {
      return dispatch({type: GET_LIST_ORDER, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteOrder = (id, params) => async dispatch => {
  try {
    _deleteOrder(id).then(function(res) {
      dispatch(getListOrder(params))
      return dispatch({type: DELETE_ORDER, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getDetailOrder = (id) => async dispatch => {
  try {
    _getDetailOrder(id).then(function(res) {
      return dispatch({type: GET_DETAIL_ORDER, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getBaoHanh = (params) => async dispatch => {
  try {
    _getBaoHanh(params).then(function(res) {
      return dispatch({type: GET_BAO_HANH, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getCheckOrder = (params) => async dispatch => {
  try {
    _getCheckOrder(params).then(function(res) {
      return dispatch({type: GET_CHECK_ORDER, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

