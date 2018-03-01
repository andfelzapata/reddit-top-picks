import Immutable from 'seamless-immutable'
import ActionTypes from './actionTypes'

const initialState = Immutable({
  err: null,
  topicsByUrl: {},
  isLoading: false,
  selectedTopicUrls: [],
  selectionFinalized: false,
})

export default function reduce(state = initialState, action = {}) {
  const {
    type,
    err,
    isLoading,
    topicsByUrl,
    selectedTopicUrls,
    selectionFinalized,
  } = action

  switch (type) {
    case ActionTypes.TOPICS_FETCHED_REQUEST:
      return {
        ...state,
        isLoading,
      }
    case ActionTypes.TOPICS_FETCHED_SUCCESS:
      return {
        ...state,
        isLoading,
        topicsByUrl,
      }
    case ActionTypes.TOPICS_FETCHED_FAILURE:
      return {
        ...state,
        isLoading,
        err,
      }
    case ActionTypes.TOPICS_SELECTED:
      return {
        ...state,
        selectedTopicUrls,
      }
    case ActionTypes.TOPIC_SELECTION_FINALIZED:
      return {
        ...state,
        selectionFinalized,
      }
    default:
      return {
        ...state,
      }
  }
}
