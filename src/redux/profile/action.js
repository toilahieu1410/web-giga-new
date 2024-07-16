import { toast } from "react-toastify"
import { 
  _getCity, 
  _getDistrict,
  _getProfile,
  _updateProfile
} from "../../api/profile"

import {
  GET_CITY, 
  GET_DISTRICT,
  GET_PROFILE,
  UPDATE_PROFILE
} from '../type'

export const getCity = () => async dispatch => {
  try {
    _getCity().then( function(res){
      return dispatch({type: GET_CITY, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getDistrict = (id) => async dispatch => {
  try {
    _getDistrict(id).then( function(res){
      return dispatch({type: GET_DISTRICT, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getProfile= () => async dispatch => {
  try {
    _getProfile().then( function(res){
      return dispatch({type: GET_PROFILE, data: res})
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const updateProfile= (body) => async dispatch => {
  try {
    _updateProfile(body).then( function(res){
      if(res.status == 200) {
        dispatch(getProfile())
        toast.success('Update thành công!')
        return dispatch({type: UPDATE_PROFILE, data: res})
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

