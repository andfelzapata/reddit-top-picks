import Immutable from 'seamless-immutable'
import ActionTypes from './actionTypes'

const initialState = Immutable({
  topicsByUrl: {},
  selectedTopicUrls: [],
  isLoading: false,
  err: null
})

export default function reduce(state = initialState, action = {}) {
  const { type, isLoading, err, topicsByUrl, selectedTopicUrls } = action
  switch (type) {
    case ActionTypes.TOPICS_FETCHED_REQUEST:
      return {
        ...state,
        isLoading
      }
    case ActionTypes.TOPICS_FETCHED_SUCCESS:
      return {
        ...state,
        isLoading,
        topicsByUrl
      }
    case ActionTypes.TOPICS_FETCHED_FAILURE:
      return {
        ...state,
        isLoading,
        err
      }
    default:
      return {
        ...state
      }
  }
}