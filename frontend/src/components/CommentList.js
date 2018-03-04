import React, { Component } from 'react'
import { Comment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import SingleComment from './SingleComment'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  }

  render() {
    const { comments } = this.props

    return <Comment.Group style={{padding: '1em 1em 1em 2em'}}>
      {comments.filter(thisComment => !(thisComment.isDeleted || thisComment.arentDeleted))
        .sort((commentA, commentB) => commentB.timestamp - commentA.timestamp)
        .map( thisComment => <SingleComment comment={thisComment} key={thisComment.id} /> )}
    </Comment.Group>
  }
}

export default CommentList