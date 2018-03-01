import { keys } from 'lodash'

const getPosts = (state) => {
  const { postsById } = state.posts
  const postsIdArray = keys(postsById)
  return [postsById, postsIdArray]
}

const postsLoading = state => state.posts.isLoading

export {
  getPosts,
  postsLoading,
}
