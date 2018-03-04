import api from '../api/axios'

export const INSERT_POSTS = 'INSERT_POSTS'

export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'

const UPDATE_POST_STARTED_LOADING  = 'UPDATE_POST_STARTED_LOADING'
const UPDATE_POST_FINISHED_LOADING = 'UPDATE_POST_FINISHED_LOADING'

const CREATE_POST_STARTED_LOADING  = 'CREATE_POST_STARTED_LOADING'
const CREATE_POST_FINISHED_LOADING = 'CREATE_POST_FINISHED_LOADING'

const DELETE_POST_STARTED_LOADING  = 'DELETE_POST_STARTED_LOADING'
const DELETE_POST_FINISHED_LOADING = 'DELETE_POST_FINISHED_LOADING'

const VOTE_STARTED_LOADING  = 'VOTE_STARTED_LOADING'
const VOTE_FINISHED_LOADING = 'VOTE_FINISHED_LOADING'

// POST CRUD

export const insertPosts = ({ posts }) => ({
  type: INSERT_POSTS,
  posts
})

export const createPost = ({ post }) => (dispatch => {
  dispatch({ type: CREATE_POST_STARTED_LOADING })

  api.post('posts', post)
    .then(response => response.data)
    .then(post => dispatch({ type: CREATE_POST, post}))
    .finally(dispatch({ type: CREATE_POST_FINISHED_LOADING }))
})

export const updatePost = ({ post }) => (dispatch => {
  const { title, body } = post
  dispatch({ type: UPDATE_POST_STARTED_LOADING })

  api.put(`posts/${post.id}`, {title, body})
    .then(response => response.data)
    .then(post => dispatch({ type: UPDATE_POST, post}))
    .finally(dispatch({ type: UPDATE_POST_FINISHED_LOADING }))
})

export const deletePost = ({ post }) => (dispatch => {
  dispatch({ type: DELETE_POST_STARTED_LOADING})

  api.delete(`posts/${post.id}`, {})
    .then(response => response.data)
    .then(post => dispatch({ type: UPDATE_POST, post }))
    .finally(dispatch({type: DELETE_POST_FINISHED_LOADING}))
})

export const upVote = ({ post }) => dispatch => vote('upVote', post.id, dispatch)
export const downVote = ({ post }) => dispatch => vote('downVote', post.id, dispatch)

const vote = (voteString, postID, dispatch) => {
  dispatch({ type: VOTE_STARTED_LOADING })

  api.post(`/posts/${postID}`, { option: voteString })
    .then((response) => response.data)
    .then(post => dispatch({ type: UPDATE_POST, post }))
    .finally(dispatch({type: VOTE_FINISHED_LOADING}))
}