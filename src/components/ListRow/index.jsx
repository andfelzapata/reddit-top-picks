import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class ListRow extends Component {
  onClick = () => {
    this.props.onClick(this.props.rowId);
  }

  render() {
    const { selected } = this.props
    const backgroundColor = selected ? '#c0f0ff' : '#fff';
    return (
      <div
        tabIndex={0}
        role="button"
        style={{ backgroundColor }}
        onClick={this.onClick}
        onKeyDown={this.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

ListRow.defaultProps = {
  selected: null,
}

ListRow.propTypes = {
  selected: PropTypes.string,
  rowId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
}
