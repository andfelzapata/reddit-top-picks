import keymirror from 'keymirror'

const ActionTypes = keymirror({
  TOPICS_SELECTED: null,
  TOPICS_FETCHED_REQUEST: null,
  TOPICS_FETCHED_SUCCESS: null,
  TOPICS_FETCHED_FAILURE: null,
  TOPIC_SELECTION_FINALIZED: null,
})

export default ActionTypes
