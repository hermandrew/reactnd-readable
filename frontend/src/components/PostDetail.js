import React, {Component} from 'react'
import { Feed, Divider, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PostEvent from './PostEvent'
import {createComment, getComments} from "../actions/comments";
import AddCommentForm from './AddCommentForm'
import CommentList from './CommentList'
import { get } from 'lodash'

class PostDetail extends Component {
  handleClose = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    this.props.getComments()
  }

  render() {
    const { post, comments, match: { params: { post_id = null } }} = this.props

    return <Container style={{backgroundColor: 'white', padding: '2em'}}>
      <Feed>
        <PostEvent post={post}/>
      </Feed>

      <CommentList comments={comments}/>
      <div>
        <Divider horizontal>Add Comment</Divider>
        <AddCommentForm postID={post_id} />
      </div>
    </Container>
  }
}

const mapDispatchToProps = (dispatch, { match }) => ({
  createComment: (comment) => dispatch(createComment({ comment })),
  getComments: () => dispatch(getComments({ id: get(match, 'params.post_id', null) }))
})

const mapStateToProps = ({posts, comments}, ownProps) => {
  const postID = get(ownProps, 'match.params.post_id', '')
  return ({
    comments: comments.filter(thisComment => thisComment.parentId === postID),
    post: posts.reduce((agg, thisPost) => (thisPost.id === postID ? thisPost : agg), {})
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)