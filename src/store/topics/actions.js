import { keyBy }  from 'lodash'
import ActionTypes from './actionTypes'
import redditService from 'services/reddit'

export function fetchTopics() {

  dispatch(fetchTopicsRequest())
  return async(dispatch, getState) => {
    try {
      const subRedditArray = await redditService.getDefaultSubReddits()
      const topicByUrls = keyBy(subRedditArray, subreddit.url)
      dispatch(fetchTopicsSuccess(topicByUrls))
    } catch (err) {
      dispatch(fetchTopicsFailure(err))
    }
  }

}

function fetchTopicsRequest() {
  return {
    type: ActionTypes.TOPICS_FETCHED_REQUEST,
    isLoading: true
  }
}

function fetchTopicsSuccess(topicsByUrl) {
  return {
    type: ActionTypes.TOPICS_FETCHED_SUCCESS,
    isLoading: false,
    topicsByUrl
  }
}

function fetchTopicsFailure(err) {
  return {
    type: ActionTypes.TOPICS_FETCHED_FAILURE,
    isLoading: false,
    err
  }
}