import React, {Component} from 'react'
import { Feed, Icon, Container, Menu } from 'semantic-ui-react'
import { getPosts } from '../actions'
import { connect } from 'react-redux'
import PostEvent from './PostEvent'

class PostList extends Component {
  state = {
    sortMethod: 'date',     // date, likeCount, commentCount
    isSortOrderAsc: false   // true for ascending, false for descending
  }

  handleSortItemClicked = (e, { sortmethod}) => {

    this.setState((state) => ({
        sortMethod: sortmethod,
        isSortOrderAsc: (sortmethod === state.sortMethod) ? !state.isSortOrderAsc : false
      }))
  }

  render() {
    const { posts } = this.props
    const { sortMethod, isSortOrderAsc } = this.state
    const caretIconName = (isSortOrderAsc) ? 'caret up' : 'caret down'
    const displayPosts = posts.filter(post => !post.deleted).sort((postA, postB) => {
      if (sortMethod === 'date') {
        return (postA.timestamp - postB.timestamp) * (isSortOrderAsc ? 1 : -1)
      } else if (sortMethod === 'likeCount') {
        return (postA.voteScore - postB.voteScore) * (isSortOrderAsc ? 1 : -1)
      } else if (sortMethod === 'commentCount') {
        return (postA.commentCount - postB.commentCount) * (isSortOrderAsc ? 1 : -1)
      } else {
        return 0
      }
    })

    return (
      <Container>
        <Menu>
          <Menu.Menu position='right'>
            <Menu.Item header>Sort By:</Menu.Item>
            <Menu.Item onClick={this.handleSortItemClicked} sortmethod='date'>
              <Icon name='calendar' />{(sortMethod === 'date' && <Icon name={caretIconName} />)}
            </Menu.Item>
            <Menu.Item onClick={this.handleSortItemClicked} sortmethod='likeCount'>
              <Icon name='heart' />{(sortMethod === 'likeCount' && <Icon name={caretIconName} />)}
            </Menu.Item>
            <Menu.Item onClick={this.handleSortItemClicked} sortmethod='commentCount'>
              <Icon name='comment' />{(sortMethod === 'commentCount' && <Icon name={caretIconName} />)}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Feed style={{background: 'white', paddingTop: '1em'}}>
          {displayPosts.map((post) => <PostEvent post={post} key={post.id} />)}
          {displayPosts.length === 0 && 'Nothing Here!'}
        </Feed>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

const mapDispatchToProps = dispatch => ({
  getPosts: ({ category }) => dispatch(getPosts({ category }))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)