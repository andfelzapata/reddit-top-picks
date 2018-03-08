import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class PostView extends Component {
  static renderEmpty() {
    return (<h3>Select a post to view</h3>)
  }

  static getBodyMarkup(body) {
    return {
      __html: body.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"'),
    }
  }

  static isImage(url) {
    if (!url) return false
    return (url.endsWith('.jpg') || url.endsWith('.gif') || url.endsWith('.png'));
  }

  /* eslint-disable react/no-danger */
  renderBody() {
    const { post } = this.props
    return (
      <div dangerouslySetInnerHTML={
        PostView.getBodyMarkup(post.body)
      }
      />
    )
  }

  renderImage() {
    const { post } = this.props
    return (
      <img src={post.url} alt={post.title} />
    )
  }

  renderUrl() {
    const { post } = this.props
    return (
      <Fragment>
        <h3>External Link</h3>
        <a href={post.url} target="_blank">Open</a>
      </Fragment>
    )
  }

  render() {
    const { post } = this.props
    if (!post) return this.renderEmpty()
    if (post.body) {
      return this.renderBody()
    } else if (PostView.isImage(post.url)) {
      return this.renderImage()
    }
    return this.renderUrl()
  }
}

PostView.defaultProps = {
  post: {},
}

PostView.propTypes = {
  post: PropTypes.shape({}),
}
