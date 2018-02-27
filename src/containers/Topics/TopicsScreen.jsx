import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './TopicsScreen.css'

class TopicsScreen extends Component {
  render() {
    return (
      <h2>Where are my topis?</h2>
    )
  }
}

const mapSateToProps = (state) => ({

})

export default connect(mapSateToProps)(TopicsScreen)