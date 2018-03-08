import { keys, get } from 'lodash'

const postsLoading = state => state.posts.isLoading

const getPosts = (state) => {
  const {
    postsById,
    currentFilter,
  } = state.posts

  window.postsById = postsById

  const postsIdArray = currentFilter === 'all' ?
    keys(postsById) :
    keys(postsById).filter(postId => postsById[postId].topicUrl === currentFilter)

  return [postsById, postsIdArray]
}

const getCurrentFilter = state => state.posts.currentFilter

const getCurrentPost = state => get(state.posts.postsById, state.posts.currentPostId)

export {
  getPosts,
  postsLoading,
  getCurrentPost,
  getCurrentFilter,
}
