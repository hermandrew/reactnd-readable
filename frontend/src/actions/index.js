import api from '../api/axios'
import { insertPosts } from './posts'

export const GET_POSTS = 'GET_POSTS'

export const POST_STARTED_LOADING = 'POST_STARTED_LOADING'
export const POST_FAILED_LOADING = 'POST_FAILED_LOADING'
export const POST_SUCCEEDED_LOADING = 'POST_SUCCEEDED_LOADING'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export const CATEGORIES_STARTED_LOADING = 'CATEGORIES_STARTED_LOADING'
export const CATEGORIES_FAILED_LOADING = 'CATEGORIES_FAILED_LOADING'
export const CATEGORIES_SUCCEEDED_LOADING = 'CATEGORIES_SUCCEEDED_LOADING'

// POST API
export const getPosts = ({ category }) => (dispatch => {
  dispatch({ type: GET_POSTS })
  dispatch({ type: POST_STARTED_LOADING })

  const path = category ? `${category}/posts` : 'posts'

  api.get(path)
    .then(response => response.data)
    .then(posts => {
      dispatch(insertPosts({ posts }))
    })
    .then(() => dispatch({ type: POST_SUCCEEDED_LOADING }))
    .catch(() => dispatch({ type: POST_FAILED_LOADING }))
})

// CATEGORIES API
export const getCategories = () => (dispatch => {
  dispatch({ type: GET_CATEGORIES })
  dispatch({ type: CATEGORIES_STARTED_LOADING })

  api.get('categories')
    .then(response => response.data)
    .then(response => dispatch(addCategories(response)))
    .then(() => dispatch({ type: CATEGORIES_SUCCEEDED_LOADING}))
    .catch(() => dispatch({ type: CATEGORIES_FAILED_LOADING }))
})

// CATEGORIES CRUD

export const addCategories = ({ categories }) => ({
  type: ADD_CATEGORIES,
  categories
})