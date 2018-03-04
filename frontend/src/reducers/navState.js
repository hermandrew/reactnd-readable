import { SET_CREATING_POST,
  SET_EDITING_POST, CLEAR_EDITING_POST,
  SET_EDITING_COMMENT, CLEAR_EDITING_COMMENT
  } from "../actions/nav";

const defaultState = {
  creatingPost: false,
  editingPost: null,
  editingComment: null,
  editingBarState: null
}

const navState = (state = defaultState, action) => {
  switch(action.type) {
    case SET_CREATING_POST:
      return {
        ...defaultState,
        creatingPost: action.isCreatingPost,
        editingBarState: action.type
      }
    case SET_EDITING_POST:
    case CLEAR_EDITING_POST:
      return {
        ...defaultState,
        editingPost: (action.type === SET_EDITING_POST) ? action.post : null,
        editingBarState: (action.type === SET_EDITING_POST) ? action.type : null
      }
    case SET_EDITING_COMMENT:
    case CLEAR_EDITING_COMMENT:
      return {
        ...defaultState,
        editingComment: (action.type === SET_EDITING_COMMENT) ? action.comment : null,
        editingBarState: (action.type === SET_EDITING_COMMENT) ? action.type : null
      }
    default:
      return state
  }
}

export default navState