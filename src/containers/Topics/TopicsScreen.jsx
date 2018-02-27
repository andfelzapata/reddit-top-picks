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

  renderLoading() {
    return (
      <Spinner name="circle" className="Topics__Spinner"/>
    )
  }

  renderRow(row) {
    return (
      <div>
        <h3>{row.title}</h3>
        <p>{row.description}</p>
      </div>
    )
  }

  render() {
    const {
      rowsById,
      rowsIdArray
    } = this.props;

    if(!rowsIdArray) return this.renderLoading()

    return (
      <div className="TopicsScreen">
        <ListView
          rowsById={rowsById}
          rowsIdArray={rowsIdArray}
          renderRow={this.renderRow}
        />
      </div>
    )
  }
}

TopicsScreen.propTypes = {

}

const mapSateToProps = (state) => ({
  rowsById: selectors.getTopicsByUrl(state),
  rowsIdArray: selectors.getTopicsUrlArray(state)
})

const mapDispatchToProps = {
  fetchTopics
}

export default connect(mapSateToProps, mapDispatchToProps)(TopicsScreen)