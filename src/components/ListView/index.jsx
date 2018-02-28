import { get } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class ListView extends Component {
  renderRowById = rowId => (
    <li key={rowId}>
      {this.props.renderRow(rowId, get(this.props.rowsById, rowId))}
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
  renderRow: PropTypes.func.isRequired,
  rowsById: PropTypes.shape({}).isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
}
