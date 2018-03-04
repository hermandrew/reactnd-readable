import { ADD_CATEGORIES } from "../actions";

const categories = (state=[], action) => {
  switch(action.type) {
    case ADD_CATEGORIES:
      return state.concat(action.categories)
    default:
      return state
  }
}

export default categories