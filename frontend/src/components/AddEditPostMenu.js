import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {SET_EDITING_POST, SET_EDITING_COMMENT} from "../actions/nav";
import {setCreatingPost, clearEditingPost, clearEditingComment} from "../actions/nav";

class AddEditPostMenu extends Component {

  getMenuItem = () => {
    const { state } = this.props

    switch (state) {
      case SET_EDITING_POST:
      case SET_EDITING_COMMENT:
        return <Menu.Item onClick={this.handleCancelEditing}>
          <Icon name='cancel' color='red' />
          Cancel Editing
        </Menu.Item>
      default:
        return <Menu.Item onClick={this.handleCreatePost}>
          Add a new Post
          <Icon name='add' color='green' />
        </Menu.Item>
    }
  }

  handleCreatePost = () => this.props.setCreatingPost(!this.props.isCreatingPost)

  handleCancelEditing = () => {
    const { state } = this.props
    if (state === SET_EDITING_POST) {
      this.props.clearEditingPost()
    } else {
      this.props.clearEditingComment()
    }
  }

  render() {
    const { state } = this.props
    const position = (state === SET_EDITING_POST || state === SET_EDITING_COMMENT) ? 'left' : 'right'

    return (
      <Menu>
        <Menu.Menu position={position}>
          {this.getMenuItem()}
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = ({ navState }) => ({
  state: navState.editingBarState,
  isCreatingPost: navState.creatingPost,
})

const mapDispatchToProps = (dispatch) => ({
  setCreatingPost: (isCreatingPost) => dispatch(setCreatingPost({ isCreatingPost })),
  clearEditingPost: () => dispatch(clearEditingPost()),
  clearEditingComment: () => dispatch(clearEditingComment())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPostMenu)