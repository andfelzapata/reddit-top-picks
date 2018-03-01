import { keys, keyBy } from 'lodash'

const getTopicsByUrl = state => state.topics.topicsByUrl

const getTopicsUrlArray = state => keys(state.topics.topicsByUrl)

const getSelectedTopicUrls = state => state.topics.selectedTopicUrls

const getSelectedTopicUrlsMap = state => keyBy(state.topics.selectedTopicUrls)

const isTopicSelectionValid = state => state.topics.selectedTopicUrls.length === 3

export {
  getTopicsByUrl,
  getTopicsUrlArray,
  getSelectedTopicUrls,
  isTopicSelectionValid,
  getSelectedTopicUrlsMap,
}
