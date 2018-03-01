import { get } from 'lodash'

const REDDIT_ENDPOINT = 'https://www.reddit.com'

class RedditService {
  static async fetch(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
  }

  static throwError(errorMessage) {
    throw new Error(errorMessage)
  }

  static validateUrl(url = '') {
    return url.startsWith('http') ? url : undefined
  }

  static getChildrenData(data) {
    return get(data, 'data.children');
  }

  static parseUrl(body, post) {
    return !body ? RedditService.validateUrl(get(post, 'data.url')) : undefined
  }

  static parseThumbnail(post) {
    return RedditService.validateUrl(get(post, 'post.thumbnail'));
  }

  static async getDefaultSubReddits() {
    const url = `${REDDIT_ENDPOINT}/subreddits/default.json`
    const response = await RedditService.fetch(url);

    if (!response.ok) {
      RedditService.throwError(`RedditService getDefaultSubReddits failed, HTTP status ${response.status}`);
    }

    const data = await response.json()
    const children = RedditService.getChildrenData(data)
    if (!children) {
      RedditService.throwError('RedditService getDefaultSubReddits failed, children not returned')
    }

    return children.map(subreddit => ({
      url: get(subreddit, 'data.url'),
      title: get(subreddit, 'data.display_name'),
      description: get(subreddit, 'data.public_description'),
    }))
  }

  static async getPostsFromSubreddit(subredditUrl) {
    const url = `${REDDIT_ENDPOINT}${subredditUrl}hot.json`
    const response = await RedditService.fetch(url);

    if (!response.ok) {
      RedditService.throwError(`RedditService getPostsFromSubrredit failed, HTTP status ${response.status}`)
    }

    const data = await response.json()
    const children = RedditService.getChildrenData(data)
    if (!children) {
      RedditService.throwError('RedditService getPostsFromSubreddit failed, children not returned')
    }

    return children.map((post) => {
      const body = get(post, 'data.selftext_html')
      return {
        body,
        topicUrl: subredditUrl,
        id: get(post, 'data.id'),
        title: get(post, 'data.title'),
        url: this.parseUrl(body, post),
        thumbnail: this.parseThumbnail(post),
      }
    })
  }
}

export default RedditService
