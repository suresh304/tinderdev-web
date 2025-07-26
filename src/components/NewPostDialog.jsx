// components/NewPostDialog.jsx
import React, { useRef } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { X } from 'lucide-react'

const NewPostDialog = ({ onPostCreated }) => {
  const dialogRef = useRef()
  const contentRef = useRef()

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = contentRef.current.value
    if (!content) return

    try {
      const res = await axios.post(`${BASE_URL}/posts`, {
        content,
        privacy: 'public' // or 'friends' if selectable
      }, {
        withCredentials: true
      })
console.log("hellooooo",res)
      if (res.data?.post) {
        onPostCreated(res.data.post)
        close()
      }
    } catch (err) {
      console.error("Failed to create post:", err)
    }
  }

  return (
    <>
      <dialog id="newPostDialog" ref={dialogRef} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Create a new post</h3>
              <button type="button" onClick={close} className="btn btn-sm btn-circle">
                <X size={18} />
              </button>
            </div>
            <textarea
              ref={contentRef}
              className="textarea textarea-bordered w-full"
              placeholder="What's on your mind?"
              rows={4}
              required
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Post</button>
              <button type="button" onClick={close} className="btn">Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default NewPostDialog
