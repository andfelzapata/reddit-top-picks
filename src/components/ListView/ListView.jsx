import { get } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const renderRow = row => (
  <div>
    <h3>{row.title}</h3>
    <p>{row.description}</p>
  </div>
)

export default class ListView extends Component {
  renderRowById = rowId => (
    <li key={rowId}>
      {renderRow(get(this.props.rowsById, rowId))}
    </li>
  )

  render() {
    return (
      <ul>
        {this.props.rowsIdArray.map(this.renderRowById)}
      </ul>
    )
  }
}

ListView.propTypes = {
  rowsById: PropTypes.shape({}).isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
}
