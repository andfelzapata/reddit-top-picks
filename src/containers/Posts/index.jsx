import React, { Component, Fragment } from 'react'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchPosts from 'store/actions'
import * as selectors from 'store/posts/selectors'
import ListView from 'components/ListView'
import ListRow from 'components/ListRow'
import './PostsScreen.css'

class PostsScreen extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  renderRow = (rowId, row) => (
    <ListRow rowId={rowId}>
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
      postsLoading,
      rowsIdArray,
    } = this.props

    return (
      <div className="PostsScreen">
        {
          postsLoading &&
          <Spinner name="circle" className="Topics__Spinner" />
        }
        {
          rowsById &&
          <Fragment>
            <h2>Posts</h2>
            <ListView
              rowsIdArray={rowsIdArray}
              rowsById={rowsById}
              renderRow={this.renderRow}
            />
          </Fragment>
        }
      </div>
    )
  }
}

PostsScreen.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  postsLoading: PropTypes.bool.isRequired,
  rowsById: PropTypes.shape({}).isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapStateToProps = (state) => {
  const [postsById, postsIdArray] = selectors.getPosts(state)
  return {
    rowsById: postsById,
    rowsIdArray: postsIdArray,
    postsLoading: selectors.postsLoading(state),
  }
}

const mapDispatchToProps = {
  fetchPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen)
