import { keyBy } from 'lodash'
import redditService from 'services/reddit'
import * as selectors from 'store/topics/selectors'
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

export function fetchTopics() {
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

function selecTopicRequest(selectedTopicUrls) {
  return {
    type: ActionTypes.TOPICS_SELECTED,
    selectedTopicUrls,
  }
}

export function selectTopic(topicUrl) {
  return (dispatch, getState) => {
    const selectedTopics = selectors.getSelectedTopicUrls(getState())
    const newSelectedTopics = selectedTopics.length < 3 ?
      selectedTopics.concat(topicUrl) :
      selectedTopics.slice(1).concat(topicUrl)

    dispatch(selecTopicRequest(newSelectedTopics))
  }
}
