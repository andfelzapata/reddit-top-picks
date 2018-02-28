import React, { Component } from 'react'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectors from 'store/topics/selectors'
import fetchTopics from 'store/actions'
import ListView from 'components/ListView/ListView'
import './TopicsScreen.css'

class TopicsScreen extends Component {
  componentDidMount() {
    this.props.fetchTopics()
  }

  render() {
    const {
      rowsById,
      rowsIdArray,
    } = this.props;

    return (
      <div className="TopicsScreen">
        {
          rowsIdArray.length === 0 &&
          <Spinner name="circle" className="Topics__Spinner" />
        }
        {
          rowsIdArray.length >= 0 &&
          <ListView
            rowsById={rowsById}
            rowsIdArray={rowsIdArray}
            renderRow={this.renderRow}
          />
        }
      </div>
    )
  }
}

TopicsScreen.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  rowsById: PropTypes.shape({}).isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapSateToProps = state => ({
  rowsById: selectors.getTopicsByUrl(state),
  rowsIdArray: selectors.getTopicsUrlArray(state),
})

const mapDispatchToProps = {
  fetchTopics,
}

export default connect(mapSateToProps, mapDispatchToProps)(TopicsScreen)
