import { keyBy } from 'lodash'
import redditService from 'services/reddit'
import ActionTypes from './actionTypes'

function fetchTopicsRequest() {
  return {
    type: ActionTypes.TOPICS_FETCHED_REQUEST,
    isLoading: true,
  }
}

function fetchTopicsSuccess(topicsByUrl) {
  return {
    type: ActionTypes.TOPICS_FETCHED_SUCCESS,
    isLoading: false,
    topicsByUrl,
  }
}

function fetchTopicsFailure(err) {
  return {
    type: ActionTypes.TOPICS_FETCHED_FAILURE,
    isLoading: false,
    err,
  }
}

export default function fetchTopics() {
  return async (dispatch) => {
    dispatch(fetchTopicsRequest())

    try {
      const subRedditArray = await redditService.getDefaultSubReddits()
      const topicByUrls = keyBy(subRedditArray, subreddit => subreddit.url)
      dispatch(fetchTopicsSuccess(topicByUrls))
    } catch (err) {
      dispatch(fetchTopicsFailure(err))
    }
  }
}
