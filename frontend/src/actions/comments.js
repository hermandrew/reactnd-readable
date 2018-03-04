import api from '../api/axios'

export const GET_COMMENTS = 'GET_COMMENTS'
export const INSERT_COMMENTS = 'INSERT_COMMENTS'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

const GET_COMMENT_STARTED_LOADING  = 'GET_COMMENT_STARTED_LOADING'
const GET_COMMENT_FINISHED_LOADING = 'GET_COMMENT_FINISHED_LOADING'

const UPDATE_COMMENT_STARTED_LOADING  = 'UPDATE_COMMENT_STARTED_LOADING'
const UPDATE_COMMENT_FINISHED_LOADING = 'UPDATE_COMMENT_FINISHED_LOADING'

const CREATE_COMMENT_STARTED_LOADING  = 'CREATE_COMMENT_STARTED_LOADING'
const CREATE_COMMENT_FINISHED_LOADING = 'CREATE_COMMENT_FINISHED_LOADING'

const DELETE_COMMENT_STARTED_LOADING  = 'DELETE_COMMENT_STARTED_LOADING'
const DELETE_COMMENT_FINISHED_LOADING = 'DELETE_COMMENT_FINISHED_LOADING'

const COMMENT_VOTE_STARTED_LOADING  = 'COMMENT_VOTE_STARTED_LOADING'
const COMMENT_VOTE_FINISHED_LOADING = 'COMMENT_VOTE_FINISHED_LOADING'

// COMMENT CRUD

export const getComments = ({ id }) => (dispatch => {
  dispatch({ type: GET_COMMENTS })
  dispatch({ type: GET_COMMENT_STARTED_LOADING })

  api.get(`posts/${id}/comments`)
    .then(response => response.data)
    .then(comments => dispatch(insertComments({ comments })))
    .finally(dispatch({ type: GET_COMMENT_FINISHED_LOADING }))
})

export const insertComments = ({ comments }) => ({
  type: INSERT_COMMENTS,
  comments
})

export const createComment = ({ comment }) => (dispatch => {
  dispatch({ type: CREATE_COMMENT_STARTED_LOADING })

  api.post('comments', comment)
    .then(response => response.data)
    .then(comment => dispatch({ type: CREATE_COMMENT, comment}))
    .finally(dispatch({ type: CREATE_COMMENT_FINISHED_LOADING }))
})

export const updateComment = ({ comment }) => (dispatch => {
  const { body } = comment
  dispatch({ type: UPDATE_COMMENT_STARTED_LOADING })

  api.put(`comments/${comment.id}`, {timestamp: Date.now(), body})
    .then(response => response.data)
    .then(comment => dispatch({ type: UPDATE_COMMENT, comment}))
    .finally(dispatch({ type: UPDATE_COMMENT_FINISHED_LOADING }))
})

export const deleteComment = ({ comment }) => (dispatch => {
  dispatch({ type: DELETE_COMMENT_STARTED_LOADING})

  api.delete(`comments/${comment.id}`, {})
    .then(response => response.data)
    .then(comment => dispatch({ type: UPDATE_COMMENT, comment }))
    .finally(dispatch({type: DELETE_COMMENT_FINISHED_LOADING}))
})

export const upVoteComment = ({ comment }) => dispatch => voteOnComment('upVote', comment.id, dispatch)
export const downVoteComment = ({ comment }) => dispatch => voteOnComment('downVote', comment.id, dispatch)

const voteOnComment = (voteString, commentID, dispatch) => {
  dispatch({ type: COMMENT_VOTE_STARTED_LOADING })

  api.post(`/comments/${commentID}`, { option: voteString })
    .then((response) => response.data)
    .then(comment => dispatch({ type: UPDATE_COMMENT, comment }))
    .finally(dispatch({type: COMMENT_VOTE_FINISHED_LOADING}))
}