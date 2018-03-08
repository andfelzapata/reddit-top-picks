import { keyBy, flatten } from 'lodash'
import redditService from 'services/reddit'
import * as selectors from 'store/topics/selectors'
import ActionTypes from './actionTypes'

function fetchPostsRequest() {
  return {
    type: ActionTypes.POSTS_FETCHED_REQUEST,
    isLoading: true,
  }
}

function fetchPostsSuccess(postsById) {
  return {
    type: ActionTypes.POSTS_FETCHED_SUCCESS,
    isLoading: false,
    postsById,
  }
}

function fetchPostsFailure(err) {
  return {
    type: ActionTypes.POSTS_FETCHED_FAILURE,
    isLoading: false,
    err,
  }
}

function getPostsIds(topicPosts) {
  return keyBy(flatten(topicPosts), post => post.id);
}

function fetchSubredditPromises(selectedTopicUrls) {
  return selectedTopicUrls.map(topicUrl => redditService.getPostsFromSubreddit(topicUrl));
}

export function fetchPosts() {
  return async (dispatch, getState) => {
    dispatch(fetchPostsRequest())

    try {
      const selectedTopicUrls = selectors.getSelectedTopicUrls(getState())
      const fetchedPromises = fetchSubredditPromises(selectedTopicUrls)
      const topicPosts = await Promise.all(fetchedPromises)
      const postsById = getPostsIds(topicPosts)
      dispatch(fetchPostsSuccess(postsById))
    } catch (err) {
      dispatch(fetchPostsFailure(err))
    }
  }
}

function changeFilterRequest(currentFilter) {
  return {
    type: ActionTypes.POSTS_FILTER_CHANGED,
    currentFilter,
  }
}

export function changeFilter(newFilter) {
  return dispatch => dispatch(changeFilterRequest(newFilter))
}

function selectPostRequest(currentPostId) {
  return {
    type: ActionTypes.POST_SELECTED,
    currentPostId,
  }
}

export function selectPost(postId) {
  return dispatch => dispatch(selectPostRequest(postId))
}
