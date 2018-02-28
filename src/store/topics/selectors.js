import { keys, keyBy } from 'lodash'

const getTopicsByUrl = state => state.topics.topicsByUrl

const getTopicsUrlArray = state => keys(state.topics.topicsByUrl)

const getSelectedTopicUrls = state => state.topics.selectedTopicUrls

const getSelectedTopicUrlsMap = state => keyBy(state.topics.selectedTopicUrls)

export {
  getTopicsByUrl,
  getTopicsUrlArray,
  getSelectedTopicUrls,
  getSelectedTopicUrlsMap,
}
