import keymirror from 'keymirror'

const ActionTypes = keymirror({
  TOPICS_FETCHED_REQUEST: null,
  TOPICS_FETCHED_SUCCESS: null,
  TOPICS_FETCHED_FAILURE: null,
  TOPICS_SELECTED: null,
})

export default ActionTypes
