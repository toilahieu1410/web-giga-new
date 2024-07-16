import { REHYDRATE } from 'redux-persist';
import {
  GET_CITY,
  GET_DISTRICT,
  UPDATE_PROFILE,
  GET_PROFILE
} from '../type'

const initialState = {
  listCity: [],
  listDistrict: [],
  profileInfo: {},
}

const profile = ( state = initialState, action ) => {
  switch(action.type) {
    case REHYDRATE: {
      if(!action.payload || !action.payload.profile) {
        return state;
      }
      return {...action.payload.profile, isLoading: false}
    }
    case GET_CITY : 
      return {
        ...state,
        listCity: action.data,
      }
    case GET_DISTRICT : 
      return {
        ...state,
        listDistrict: action.data,
      }
    case GET_PROFILE : 
      return {
        ...state,
        profileInfo: action.data,
      }
    case UPDATE_PROFILE : 
      return {
        ...state,
      }
    default:
      return state
  }
}

export default profile