import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

export default class TopicFilter extends Component {
  onFilterClick(id) {
    if (id === this.props.selected) return
    this.props.onChanged(id)
  }

  renderFilter = (id, label) => {
    const { selected } = this.props
    const className = selected === id ? 'selected' : undefined
    return (
      <button
        key={id}
        href="#"
        className={className}
        onClick={() => this.onFilterClick(id)}
      >
        {label}
      </button>
    )
  }

  render() {
    const {
      topics,
      className,
    } = this.props

    return (
      <div className={className}>
        {this.renderFilter('all', 'All')}
        {
          map(topics, (topic, topicId) => this.renderFilter(topicId, topic.title))
        }
      </div>
    )
  }
}

TopicFilter.propTypes = {
  onChanged: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  topics: PropTypes.shape({}).isRequired,
}
