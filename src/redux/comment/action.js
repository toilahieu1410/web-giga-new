import { toast } from 'react-toastify'
import {
  _getCommentProduct,
  _postCommentProduct,
  _putCommentProduct,
  _getSalesOffPublic
} from '../../api/comment'

import {
  GET_COMMENT_PRODUCT,
  POST_COMMENT_PRODUCT,
  PUT_COMMENT_PRODUCT,
  GET_SALE_OFF
} from '../type'

export const getCommentProduct = (params) => async dispatch => {
  try {
    _getCommentProduct(params).then(res => {
      return dispatch({type: GET_COMMENT_PRODUCT, data: res.data})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const postCommentProduct = (body) => async dispatch => {
  try {
    _postCommentProduct(body).then(res => {
      if(res.status == 200) {
        toast.success('Thêm bình luận thành công')
        return dispatch({type: POST_COMMENT_PRODUCT, data: res.data})
      }
      toast.success('Lỗi không xác định')
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const putCommentProduct = (id, body) => async dispatch => {
  try {
    _putCommentProduct(id, body).then(res => {
      return dispatch({type: PUT_COMMENT_PRODUCT, data: res.data})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getSalesOffPublic = () => async dispatch => {
  try {
    _getSalesOffPublic().then(res => {
      return dispatch({type: GET_SALE_OFF, data: res.data})
    })
  } catch (error) {
    throw new Error(error)
  }
}