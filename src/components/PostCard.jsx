import React from 'react'
import { log } from '../utils/helpers'
import { Heart, MessageCircle } from 'lucide-react'
import moment from 'moment/moment'

const PostCard = (post) => {
   const {author,content} = post

  return (
   


 <div className="card shadow-md bg-base-100 w-full max-w-xl mx-auto mb-6">
      {/* Card Body */}
      <div className="card-body">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={post.photo_url || 'https://imgs.search.brave.com/HXK5NBiliFajIBuw_zagStY3Xss_JvNnpYDm_Tg_Axs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/Ni8zMC8xMC8yMy9p/Y29uLTUzNTU4OTZf/NjQwLnBuZw'} alt="User" />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">{author}</h2>
            <p className="text-sm text-gray-500">
              {moment(post.created_at).format('MMMM Do YYYY, h:mm A')}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-base text-gray-700">{content}</p>

        {/* Actions */}
        <div className="mt-4 flex gap-6">
          <button className="btn btn-ghost btn-sm flex items-center gap-1 text-red-500">
            <Heart size={18} />
            <span>{post.likes || 0}</span>
          </button>
          <button className="btn btn-ghost btn-sm flex items-center gap-1 text-blue-500">
            <MessageCircle size={18} />
            <span>{post.comments || 0}</span>
            
          </button>
        </div>
      </div>
    </div>

  )
}

export default PostCard