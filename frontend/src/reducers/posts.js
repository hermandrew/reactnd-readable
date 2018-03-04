import { INSERT_POSTS, UPDATE_POST, CREATE_POST } from "../actions/posts";

const posts = (state=[], action) => {
  const { posts, post } = action

  switch(action.type) {
    case INSERT_POSTS:
      return posts
    case UPDATE_POST:
      return state.filter(thisPost => thisPost.id !== post.id)
                  .concat([post])
    case CREATE_POST:
      return state.concat([post])
    default:
      return state
  }
}

export default posts