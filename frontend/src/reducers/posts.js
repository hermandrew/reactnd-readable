import { INSERT_POSTS, UPDATE_POST, CREATE_POST } from "../actions/posts";
import {CREATE_COMMENT, UPDATE_COMMENT} from "../actions/comments";

const posts = (state=[], action) => {
  const { posts, post } = action

  switch(action.type) {
    case INSERT_POSTS:
      return posts
    case UPDATE_POST:
      return updatePost(post)
    case CREATE_POST:
      return state.concat([post])
    case CREATE_COMMENT:
      return incrementCommentCountBy(1, action.comment.parentId, state)
    case UPDATE_COMMENT:
      if (action.comment.deleted) {
        return incrementCommentCountBy(-1, action.comment.parentId, state)
      } else {
        return state
      }
    default:
      return state
  }
}

const updatePost = (post, state) => {
  return state.filter(thisPost => thisPost.id !== post.id)
    .concat([post])
}

const incrementCommentCountBy = (increment, postID, state) => {
  var thisPost = state.reduce((agg, thisPost) => {
    return thisPost.id === postID ? thisPost : agg
  }, {})

  thisPost = {
    ...thisPost,
    commentCount: thisPost.commentCount + increment
  }

  return updatePost(thisPost, state)
}

export default posts