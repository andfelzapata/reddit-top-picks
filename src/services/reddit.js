import { get } from 'lodash'

const REDDIT_ENDPOINT = 'https://www.reddit.com'

class RedditService {

  async getDefaultSubReddits() {
    const url = `${REDDIT_ENDPOINT}/subreddits/default.json`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    if(!response.ok) {
      throw new Error(`RedditService getDefaultSubReddits failed, HTTP status ${response.status}`)
    }

    const data = await response.json()
    const children = get(data, 'data.children')
    if(!children) {
      throw new Error(`RedditService getDefaultSubReddits failed, children not returned`)

    }

    return children.map(subreddit => {
      return {
        title: get(subreddit, 'data.display_name'),
        description: get(subreddit, 'data.public_description'),
        url: get(subreddit, 'data.url')
      }
    })
  }

}

export default new RedditService()