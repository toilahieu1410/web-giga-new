import {
  GET_COMMENT_PRODUCT,
  POST_COMMENT_PRODUCT,
  PUT_COMMENT_PRODUCT,
  GET_SALE_OFF,
  CLEAR_DATA
} from '../type'

const initialState = {
  listCommentProduct: [],
  countComment: 0,
  listSaleOff: []
}

const comment = ( state = initialState, action ) => {
  switch (action.type) {

    case GET_COMMENT_PRODUCT:
      return {
        ...state,
        listCommentProduct: action.data.data,
        countComment: action.data.count
      }
    case POST_COMMENT_PRODUCT:
      return {
        ...state,
        listCommentProduct: [action.data, ...state.listCommentProduct]
      }
    case PUT_COMMENT_PRODUCT:
      return {
        ...state,
        listCommentProduct: state.listCommentProduct.map(
          (item) => item._id === action.data._id ? item = action.data : item 
        )
      }
    case GET_SALE_OFF:
      return {
        ...state,
        listSaleOff: action.data
      }
    case CLEAR_DATA:
      return {
        ...state,
        listCommentProduct: [],
        countComment: 0
      }
    default:
      return state
  }
}

export default comment