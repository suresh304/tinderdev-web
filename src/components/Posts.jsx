import React, { useEffect } from 'react'
import { addPosts } from '../utils/postsSlice'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../utils/appstore'
import { log } from '../utils/helpers'
import PostCard from './PostCard'
import { PlusIcon } from 'lucide-react'
import NewPostDialog from './NewPostDialog'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(store => store.posts)

  const getPosts = async () => {
    log(posts)
    if (posts?.length) return;
    try {
      const res = await axios.get(`${BASE_URL}/posts`, { withCredentials: true })
      dispatch(addPosts(res?.data?.posts))
    } catch (error) {
      console.log("error fetching the posts ", error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleNewPost = (newPost) => {
    dispatch(addPosts([newPost,...posts]))
  }

  return (
    <div>
      {/* List of posts */}
      <div>
        {posts?.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>

      {/* Floating + Button */}
      <button
        className="btn btn-primary fixed bottom-6 right-6 z-50 shadow-lg rounded-full"
        onClick={() => document.getElementById('newPostDialog').showModal()}
      >
        <PlusIcon />
      </button>

      {/* Dialog component */}
      <NewPostDialog onPostCreated={handleNewPost} />
    </div>
  )
}

export default Posts
