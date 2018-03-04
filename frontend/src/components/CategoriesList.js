import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Header } from 'semantic-ui-react'
import { getCategories, getPosts } from "../actions";
import { withRouter } from 'react-router-dom'
import { get } from 'lodash'

class CategoriesList extends Component {

  componentWillMount() {
    this.props.getCategories()
  }

  componentWillReceiveProps(props) {
    const { getPosts, match } = props
    const { category=null } = match.params
    getPosts({ category })
  }

  render() {
    const { categories } = this.props
    const thisPath = get(this.props, 'match.params.category', 'all')

    return (
      <Menu vertical fluid>
        {categories.map(({name, path}) => (
          <Menu.Item as={Link}
                     to={'/' + path}
                     key={name}
                     active={path === thisPath}>
            <Header>{name}</Header>
          </Menu.Item>
          ))}
        <Menu.Item as={Link}
                   to='/'
                   key='all'
                   active={thisPath === 'all'}>
          <Header>View All</Header>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = ({categories, navState}) => ({
  categories,
  activeCategory: navState.activeCategory
})

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategories()),
  getPosts: ({ category }) => dispatch(getPosts({ category }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesList))