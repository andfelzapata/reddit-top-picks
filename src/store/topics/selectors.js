import { keys } from 'lodash'

const getTopicsByUrl = state => state.topics.topicsByUrl

const getTopicsUrlArray = state => keys(state.topics.topicsByUrl)

export {
  getTopicsByUrl,
  getTopicsUrlArray,
}
