export const SET_CREATING_POST = 'SET_CREATING_POST'
export const SET_EDITING_POST = 'SET_EDITING_POST'
export const CLEAR_EDITING_POST = 'CLEAR_EDITING_POST'
export const SET_EDITING_COMMENT = 'SET_EDITING_COMMENT'
export const CLEAR_EDITING_COMMENT = 'CLEAR_EDITING_COMMENT'

// CATEGORIES MISC

export const setEditingPost = ({ post }) => ({
  type: SET_EDITING_POST,
  post
})

export const clearEditingPost = () => ({
  type: CLEAR_EDITING_POST
})

export const setEditingComment = ({ comment }) => ({
  type: SET_EDITING_COMMENT,
  comment
})

export const clearEditingComment = () => ({
  type: CLEAR_EDITING_COMMENT
})

export const setCreatingPost = ({ isCreatingPost }) => ({
  type: SET_CREATING_POST,
  isCreatingPost
})