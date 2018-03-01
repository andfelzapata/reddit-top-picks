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

export default function fetchPosts() {
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
