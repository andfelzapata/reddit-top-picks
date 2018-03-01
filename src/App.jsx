import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as topicSelectors from 'store/topics/selectors'
import TopicsScreen from 'containers/Topics'
import PostsScreen from 'containers/Posts'
import './App.css';

const App = ({ isSelectionFinalized }) => (
  <div className="App">
    {
      !isSelectionFinalized ?
        <TopicsScreen /> :
        <PostsScreen />
    }
  </div>
)

App.propTypes = {
  isSelectionFinalized: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isSelectionFinalized: topicSelectors.isSelectionFinalized(state),
})

export default connect(mapStateToProps)(App)
