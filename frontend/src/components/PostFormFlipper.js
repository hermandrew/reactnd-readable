import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import AddCommentForm from './AddCommentForm'
import { SET_EDITING_POST, SET_CREATING_POST, SET_EDITING_COMMENT } from "../actions/nav";

class PostFormFlipper extends Component {
  render() {
    const { state, post, comment, isCreatingPost } = this.props

    switch(state) {
      case SET_CREATING_POST:
        return isCreatingPost ? <PostForm isUpdating={false} /> : null
      case SET_EDITING_POST:
        return <PostForm isUpdating={true} post={post} />
      case SET_EDITING_COMMENT:
        return <AddCommentForm postID={comment.parentId}
                               isUpdating={true}
                               comment={comment} />
      default:
        return null
    }
  }
}

const mapStateToProps = ({ navState }) => ({
  state: navState.editingBarState,
  post: navState.editingPost,
  comment: navState.editingComment,
  isCreatingPost: navState.creatingPost
})

export default connect(mapStateToProps)(PostFormFlipper)