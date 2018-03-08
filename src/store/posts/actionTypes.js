import keymirror from 'keymirror'

const ActionTypes = keymirror({
  POST_SELECTED: null,
  POSTS_FILTER_CHANGED: null,
  POSTS_FETCHED_REQUEST: null,
  POSTS_FETCHED_SUCCESS: null,
  POSTS_FETCHED_FAILURE: null,
})

export default ActionTypes
