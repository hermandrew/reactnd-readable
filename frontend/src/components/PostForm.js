import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { upperFirst, get } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost, updatePost } from "../actions/posts";
import { clearEditingPost } from "../actions/nav";

class PostForm extends Component {
  static propTypes = {
    isUpdating: PropTypes.bool.isRequired,
    post: PropTypes.object
  }

  state = {
    post: {
      id: '',
      timestamp: '',
      title: '',
      body: '',
      author: '',
      category: ''
    },
    validations: {
      title: true,
      body: true,
      author: true,
      category: true
    }
  }

  handleTextEntry = (e, { name, value }) => {
    this.setState((state) => {
      state.post[name] = value
      return state
    })
  }

  handleSubmit = () => {
    const { post } = this.state
    const { isUpdating, createPost, updatePost, clearEditingPost } = this.props

    const keys = [ 'title', 'body', 'author', 'category' ]
    const validations = keys.reduce((allValidations, thisKey) => ({
      ...allValidations,
      [thisKey]: post[thisKey].trim().length > 0
    }), {})
    const isValid = Object.values(validations)
      .reduce((aggregator, currentValid) => { return currentValid && aggregator }, true)

    if (isValid) {
      if (isUpdating) {
        updatePost({ post })
        clearEditingPost()
      } else {
        const uuidv5 = require('uuid/v5');
        post.id = uuidv5('hello.example.com', uuidv5.DNS)
        post.timestamp = Date.now()

        createPost({ post })
      }

      this.setState({
        post: {
          id: '',
          timestamp: '',
          title: '',
          body: '',
          author: '',
          category: ''
        },
        validations
      })
    } else {
      this.setState({ ...this.state, validations })
    }
  }

  componentWillMount() {
    const { post = null } = this.props
    if (post) {
      this.setState({ post })
    }
  }

  componentWillReceiveProps(props) {
    this.setState((state) => {
      state.post.category = get(props, 'match.params.category', '')
      return state
    })
  }

  render() {
    const { post, validations } = this.state
    const textEntries = [ 'title', 'body', 'author' ]
    const { categories, isUpdating } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        {textEntries.map((textField) => <Form.Field key={textField}
          name={textField}
          control={textField === 'body' ? TextArea : Input}
          label={upperFirst(textField)}
          placeholder={upperFirst(textField)}
          error={!validations[textField]}
          value={post[textField]}
          onChange={this.handleTextEntry}
          disabled={isUpdating && !(textField === 'title' || textField === 'body')}
          />
        )}
        <Form.Dropdown selection
                       label='Select Category'
                       placeholder='Select Category'
                       value={post.category}
                       name='category'
                       error={!validations.category}
                       onChange={this.handleTextEntry}
                       options={categories.map(category => ({text: category.name, value: category.name, key: category.name}))}
                       disabled={isUpdating}/>
        <Button fluid type='submit'>Submit Post</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
})

const mapDispatchToProps = (dispatch) => ({
  createPost: ({ post }) => dispatch(createPost({ post })),
  updatePost: ({ post }) => dispatch(updatePost({ post })),
  clearEditingPost: () => dispatch(clearEditingPost())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))