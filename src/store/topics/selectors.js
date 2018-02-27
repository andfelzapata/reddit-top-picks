import  { keys } from 'lodash'

const getTopicsByUrl = state => {
  return state.topics.topicsByUrl
}

const getTopicsByUrlArray = (state) => {
  return keys(state.topics.topicsByUrl)
}

export {
  getTopicsByUrl,
  getTopicsByUrlArray
}