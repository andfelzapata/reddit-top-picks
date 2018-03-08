import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts, changeFilter, selectPost } from 'store/actions'
import * as postsSelectors from 'store/posts/selectors'
import * as topicsSelectors from 'store/topics/selectors'
import ListView from 'components/ListView'
import ListRow from 'components/ListRow'
import TopicFilter from 'components/TopicFilter'
import PostView from 'components/PostView'
import './PostsScreen.css'

class PostsScreen extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  onFilterChanged = (newFilter) => {
    this.props.changeFilter(newFilter)
  }

  onRowClick = (rowId) => {
    this.props.selectPost(rowId)
  }

  renderRow = (rowId, row) => (
    <ListRow
      rowId={rowId}
      onClick={this.onRowClick}
    >
      {
          !row.thumbnail ? null :
          <img src={row.thumbnail} alt="Subreddit Post" />
        }
      <h3>{row.title}</h3>
    </ListRow>
  )


  render() {
    const {
      rowsById,
      rowsIdArray,
      topicsByUrl,
      currentPost,
      postsLoading,
      currentFilter,
    } = this.props

    return (
      <div className="PostsScreen">
        {
          postsLoading &&
          <Spinner name="circle" className="Topics__Spinner" />
        }
        {
          rowsById &&
          <div className="PostsContainer">
            <h2>Posts</h2>
            <TopicFilter
              className="TopicFilter"
              topics={topicsByUrl}
              selected={currentFilter}
              onChanged={this.onFilterChanged}
            />
            <ListView
              rowsIdArray={rowsIdArray}
              rowsById={rowsById}
              renderRow={this.renderRow}
            />
          </div>
        }
        <div className="ContentPane">
          <PostView post={currentPost} />
        </div>
      </div>
    )
  }
}

PostsScreen.defaultProps = {
  rowsById: {},
  currentPost: {},
  currentFilter: 'all',
}

PostsScreen.propTypes = {
  rowsById: PropTypes.shape({}),
  currentFilter: PropTypes.string,
  currentPost: PropTypes.shape({}),
  selectPost: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  postsLoading: PropTypes.bool.isRequired,
  topicsByUrl: PropTypes.shape({}).isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapStateToProps = (state) => {
  const [postsById, postsIdArray] = postsSelectors.getPosts(state)
  return {
    rowsById: postsById,
    rowsIdArray: postsIdArray,
    postsLoading: postsSelectors.postsLoading(state),
    currentPost: postsSelectors.getCurrentPost(state),
    currentFilter: postsSelectors.getCurrentFilter(state),
    topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
  }
}

const mapDispatchToProps = {
  fetchPosts,
  selectPost,
  changeFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen)
