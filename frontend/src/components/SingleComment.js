import React, { Component } from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en/index";
import { connect } from 'react-redux'
import { upVoteComment, downVoteComment, deleteComment } from '../actions/comments'
import { setEditingComment } from "../actions/nav";
import EditDeleteControl from './EditDeleteControl'

class SingleComment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  }

  handleEdit = () => {
    this.props.setEditingComment(this.props.comment)
  }

  render() {
    const { comment, upVote, downVote } = this.props

    TimeAgo.locale(en)
    const timeAgo = new TimeAgo('en-US')

    return <Comment>
          <Comment.Content>
            <Comment.Author as='a'>{comment.author}</Comment.Author>
            <Comment.Metadata>
              <div>{timeAgo.format(comment.timestamp)}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={downVote}>
                <Icon name='down arrow' />
              </Comment.Action>
              <Comment.Action onClick={upVote}>
                <Icon name='up arrow' />
              </Comment.Action>
              <Comment.Action>
              {`${comment.voteScore} Updoots`}
              </Comment.Action>
              <Comment.Action>
                <EditDeleteControl onDelete={this.props.deleteComment}
                                   onEdit={this.handleEdit}
                                   icon='ellipsis horizontal'/>
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
  }
}

const mapDispatchToProps = (dispatch, { comment }) => ({
  upVote: () => dispatch(upVoteComment({ comment })),
  downVote: () => dispatch(downVoteComment({ comment })),
  deleteComment: () => dispatch(deleteComment({ comment })),
  setEditingComment: (comment) => dispatch(setEditingComment({ comment }))
})

export default connect(null, mapDispatchToProps)(SingleComment)