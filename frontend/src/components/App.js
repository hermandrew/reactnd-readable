import React, { Component } from 'react';
import PostList from './PostList'
import CategoriesList from './CategoriesList'
import AddEditPostMenu from './AddEditPostMenu'
import PostFormFlipper from './PostFormFlipper'
import PostDetail from './PostDetail'
import { Menu, Grid, Container } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Container>
        <Menu>
        </Menu>
        <Grid>
          <Grid.Column width={4}>
            <Switch>
              <Route path='/:category' component={CategoriesList} />
              <Route path='/' component={CategoriesList} />
            </Switch>
          </Grid.Column>
          <Grid.Column width={8}>
            <Switch>
              <Route path='/:category/:post_id' component={PostDetail} />
              <Route path='/:category' component={PostList} />
              <Route path='/' component={PostList} />
            </Switch>

          </Grid.Column>
          <Grid.Column width={4}>
            <AddEditPostMenu />
            <PostFormFlipper />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;
