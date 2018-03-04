import { INSERT_COMMENTS, UPDATE_COMMENT, CREATE_COMMENT } from "../actions/comments";

const comments = (state=[], action) => {
  const { comments, comment } = action

  switch(action.type) {
    case INSERT_COMMENTS:
      return comments
    case UPDATE_COMMENT:
      return state.filter(thisComment => thisComment.id !== comment.id)
        .concat([comment])
    case CREATE_COMMENT:
      return state.concat([comment])
    default:
      return state
  }
}

export default comments