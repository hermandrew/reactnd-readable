import posts from './posts'
import comments from './comments'
import categories from './categories'
import navState from './navState'
import { combineReducers } from 'redux'

export default combineReducers({
  posts,
  comments,
  categories,
  navState,
})