import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createComment, updateComment } from "../actions/comments";
import { clearEditingComment } from "../actions/nav";
import PropTypes from 'prop-types'

class AddCommentForm extends Component {
  static propTypes = {
    postID: PropTypes.string.isRequired,
    isUpdating: PropTypes.bool,
    comment: PropTypes.object
  }

  static defaultProps = {
    isUpdating: false
  }

  state = {
    comment: {
      body: '',
      author: ''
    },
    validations: {
      isCommentValid: true,
      isAuthorValid: true
    }
  }

  componentWillMount() {
    if (this.props.isUpdating) {
      this.setState({ comment: Object.assign({}, this.props.comment) })
    }
  }

  handleSubmit = () => {
    const { createComment, updateComment, clearEditingComment, postID, isUpdating } = this.props
    const { comment: { body, author }} = this.state

    const validations = {
      isCommentValid: body.trim().length > 0,
      isAuthorValid: author.trim().length > 0
    }

    const isValid = Object.values(validations).reduce((aggregator, thisValid) => { return aggregator && thisValid }, true)

    if (isValid) {
      if (isUpdating) {
        updateComment(this.state.comment)
        clearEditingComment()
      } else {
        const uuidv5 = require('uuid/v5');
        const thisComment = {
          ...this.state.comment,
          parentId: postID,
          timestamp: Date.now(),
          id: uuidv5('hello.example.com', uuidv5.DNS)
        }

        createComment(thisComment)
      }

      this.setState({
        validations,
        comment: {
          body: '',
          author: ''
        }
      })
    } else {
      this.setState({ validations })
    }
  }

  handleTextInput = (e, { name, value }) => { this.setState({
    ...this.state,
    comment: {
      ...this.state.comment,
      [name]: value
    }})}

  render() {
    const { postID, isUpdating } = this.props
    const {
      comment: { body, author},
      validations: { isCommentValid, isAuthorValid }
    } = this.state

    return <Form reply onSubmit={this.handleSubmit}>

      <Form.Input name='author'
                  value={author}
                  onChange={this.handleTextInput}
                  label='Author'
                  placeholder='Your Name'
                  error={!isAuthorValid}
                  disabled={isUpdating} />

      <Form.TextArea name='body'
                     value={body}
                     onChange={this.handleTextInput}
                     label='Comment'
                     placeholder='Comment'
                     error={!isCommentValid} />

      <Button content={isUpdating ? 'Edit Reply' : 'Add Reply'}
              labelPosition='left'
              icon='edit'
              disabled={postID === null || postID.trim().length === 0}
              primary />
    </Form>
  }
}

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment({ comment })),
  updateComment: (comment) => dispatch(updateComment({ comment })),
  clearEditingComment: () => dispatch(clearEditingComment())
})

export default connect(null, mapDispatchToProps)(AddCommentForm)