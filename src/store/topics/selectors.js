import { keys, keyBy, mapValues } from 'lodash'

const topicsLoading = state => state.topics.isLoading

const getTopicsByUrl = state => state.topics.topicsByUrl

const getTopicsUrlArray = state => keys(state.topics.topicsByUrl)

const getSelectedTopicUrls = state => state.topics.selectedTopicUrls

const isSelectionFinalized = state => state.topics.selectionFinalized

const getSelectedTopicUrlsMap = state => keyBy(state.topics.selectedTopicUrls)

const isTopicSelectionValid = state => state.topics.selectedTopicUrls.length === 3

const getSelectedTopicsByUrl = (state) => {
  const {
    topicsByUrl,
    selectedTopicUrls,
  } = state.topics
  return mapValues(keyBy(selectedTopicUrls), topicUrl => topicsByUrl[topicUrl])
}

const getTopics = (state) => {
  const {
    topics: { topicsByUrl },
  } = state
  const topicsUrlArray = keys(topicsByUrl)
  return [topicsByUrl, topicsUrlArray]
}


export {
  getTopics,
  topicsLoading,
  getTopicsByUrl,
  getTopicsUrlArray,
  getSelectedTopicUrls,
  isSelectionFinalized,
  isTopicSelectionValid,
  getSelectedTopicsByUrl,
  getSelectedTopicUrlsMap,
}
