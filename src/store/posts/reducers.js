import Immutable from 'seamless-immutable'
import ActionTypes from './actionTypes'

const initialState = Immutable({
  err: null,
  isLoading: false,
  currentFilter: 'all',
  postsById: undefined,
  currentPostId: undefined,
})

export default function reduce(state = initialState, action) {
  const {
    err,
    type,
    isLoading,
    postsById,
    currentFilter,
    currentPostId,
  } = action;

  switch (type) {
    case ActionTypes.POSTS_FETCHED_REQUEST:
      return {
        ...state,
        isLoading,
      }
    case ActionTypes.POSTS_FETCHED_SUCCESS:
      return {
        ...state,
        isLoading,
        postsById,
      }
    case ActionTypes.POSTS_FETCHED_FAILURE:
      return {
        ...state,
        isLoading,
        err,
      }
    case ActionTypes.POSTS_FILTER_CHANGED:
      return {
        ...state,
        currentFilter,
      }
    case ActionTypes.POST_SELECTED:
      return {
        ...state,
        currentPostId,
      }
    default:
      return {
        ...state,
      }
  }
}
