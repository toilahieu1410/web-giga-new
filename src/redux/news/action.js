import {
  _getCategoryNews,
  _getCategoryBySlug,
  _getSubCategoryNews,
  _getNewsByCate,
  _getNewBySlug,
  _getNewHome,
  _getNewByCreatedAt,
  _getNewByTag
} from '../../api/news'

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

export const getCategoryNews = () => async dispatch => {
  try {
    _getCategoryNews().then(res => {
      return dispatch({ type: GET_CATEGORY_NEWS, data: res.data })
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

export const getSubCategoryNews = (id) => async dispatch => {
  try {
    _getSubCategoryNews(id).then(res => {
      return dispatch({ type: GET_SUB_CATEGORY_NEWS, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getNewsByCate = (params) => async dispatch => {
  try {
    _getNewsByCate(params).then(res => {
      return dispatch({ type: GET_NEW_BY_CATE, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getNewBySlug = (slug) => async dispatch => {
  try {
    _getNewBySlug(slug).then(res => {
      return dispatch({ type: GET_NEW_BY_SLUG, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getNewHome = () => async dispatch => {
  try {
    _getNewHome().then(res => {
      return dispatch({ type: GET_NEW_BY_HOME, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getNewByCreatedAt = (params) => async dispatch => {
  try {
    _getNewByCreatedAt(params).then(res => {
      return dispatch({ type: GET_NEW_BY_CREATED_AT, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getNewByTag = (params) => async dispatch => {
  try {
    _getNewByTag(params).then(res => {
      return dispatch({ type: GET_NEW_BY_TAG, data: res })
    })
  } catch (error) {
    throw new Error(error)
  }
}