import {
  GET_CATEGORY_NEWS,
  GET_CATEGORY_SLUG,
  GET_SUB_CATEGORY_NEWS,
  GET_NEW_BY_CATE,
  GET_NEW_BY_SLUG,
  GET_NEW_BY_HOME,
  GET_NEW_BY_CREATED_AT,
  GET_NEW_BY_TAG
} from '../type'

const initialState = {
  listCategoryNews: [],
  categorySlug: null,
  listSubCategoryNews: [],
  listNews: [],
  listNewByCreatedAt: [],
  countNew: null,
  dataNew: null,
  listNewsHome: [],
  listNewsTag: null
}

const news = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_NEWS:
      return {
        ...state,
        listCategoryNews: action.data
      }
    case GET_CATEGORY_SLUG:
       return {
        ...state,
        categorySlug: action.data
       }
    case GET_SUB_CATEGORY_NEWS:
      return {
        ...state,
        listSubCategoryNews: action.data
      }
    case GET_NEW_BY_CATE:
      return {
        ...state,
        listNews: action.data.data,
        countNew: action.data.count
      }
    case GET_NEW_BY_SLUG:
      return {
        ...state,
        dataNew: action.data
      }
    case GET_NEW_BY_HOME:
      return {
        ...state,
        listNewsHome: action.data
      }
    case GET_NEW_BY_CREATED_AT:
       return {
        ...state,
        listNewByCreatedAt: action.data
       }
      case GET_NEW_BY_TAG:
        return {
          ...state,
          listNewsTag: action.data
        }
      default:
        return state
  }
}

export default news