import  { keys } from 'lodash'

const getTopicsByUrl = state => {
  return state.topics.topicsByUrl
}

const getTopicsUrlArray = (state) => {
  return keys(state.topics.topicsByUrl)
}

export {
  getTopicsByUrl,
  getTopicsUrlArray
}