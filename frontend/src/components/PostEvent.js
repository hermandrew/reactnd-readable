import React, {Component} from 'react'
import { Feed, Icon, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import en from "javascript-time-ago/locale/en/index";
import TimeAgo from "javascript-time-ago";
import { deletePost, upVote, downVote } from '../actions/posts'
import { setEditingPost } from "../actions/nav";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isEmpty } from 'lodash'
import EditDeleteControl from './EditDeleteControl'

class PostEvent extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  handleUpVote = () => this.props.upVote()
  handleDownVote = () => this.props.downVote()

  handleTap = () => {
    const { history, post } = this.props
    history.push(`/${post.category}/${post.id}`)
  }

  render() {
    const { post } = this.props

    if (!post || isEmpty(post)) {
      return <div></div>
    }

    TimeAgo.locale(en)
    const timeAgo = new TimeAgo('en-US')

    return (
    <Feed.Event>
      <Feed.Label>
        <Icon name='user' />
      </Feed.Label>
      <Feed.Content onClick={this.handleTap}>
        <Feed.Date>{timeAgo.format(post.timestamp)}</Feed.Date>
        <Feed.Summary>
          <Feed.User>{post.author}</Feed.User> posted '{post.title}'
        </Feed.Summary>
        <Feed.Extra>{post.body}</Feed.Extra>
        <Feed.Meta>
          <Icon name='down arrow' onClick={this.handleDownVote} />
          <Icon name='up arrow' onClick={this.handleUpVote} />
          {post.voteScore} Updoots
          <Icon name='comment' />
          {post.commentCount} Comments
          <Label content={post.category} as={Link} to={post.category} />
        </Feed.Meta>
      </Feed.Content>
      <EditDeleteControl onDelete={this.props.deletePost}
                         onEdit={this.props.setEditingPost}
                         deleteWarningTitle='Are you sure you want to delete this post?'
                         deleteWarningDescription='This action cannot be undone.  Any deletes will be permanent.' />

    </Feed.Event>
  )}
}

const mapDispatchToProps = (dispatch, { post }) => ({
  deletePost: () => dispatch(deletePost({ post })),
  upVote: () => dispatch(upVote({ post })),
  downVote: () => dispatch(downVote({ post })),
  setEditingPost: () => dispatch(setEditingPost({ post })),
})

export default withRouter(connect(null, mapDispatchToProps)(PostEvent))