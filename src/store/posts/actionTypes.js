import keymirror from 'keymirror'

const ActionTypes = keymirror({
  POSTS_FETCHED_REQUEST: null,
  POSTS_FETCHED_SUCCESS: null,
  POSTS_FETCHED_FAILURE: null,
})

export default ActionTypes
