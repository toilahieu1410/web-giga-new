import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import product from './product/reducer'
import home from './home/reducer'
import comment from './comment/reducer'
import order from './order/reducer'
import profile from './profile/reducer'
import news from './news/reducer'

const rootReducer = combineReducers({
  product, home, comment, order, profile, news
});

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store