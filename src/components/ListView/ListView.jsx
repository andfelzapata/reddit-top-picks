import { get } from 'lodash'
import React, { Component } from 'react'

export default class ListView extends Component {

  renderRowById = (rowId) => {
    return (
      <li key={rowId}>
        {this.props.renderRow(get(this.props.rowsById, rowId))}
      </li>
    )
  }

  render() {
    return (
      <ul>
        {this.props.rowsIdArray.map(this.renderRowById)}
      </ul>
    )
  }

}