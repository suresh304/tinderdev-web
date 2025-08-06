import React, { useState } from 'react'
import FeedCard from './FeedCard'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Toast from './Toast'

const EditProfile = (user) => {
  console.log(user);
  
  const [first_name, setFirstName] = useState(user.first_name)
  const [last_name, setLastName] = useState(user.last_name)
  const [age, setAge] = useState(user.age)
  const [photo_url, setPhotoUrl] = useState(user.photo_url || '')
  const [about, setAbout] = useState(user.about)
  const [error, setError] = useState()
  const [showToast, setShowToast] = useState(false)

  const dispatch = useDispatch()

  const updateProfileHandler = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/profile/edit`, {
        first_name,
        last_name,
        age,
        photo_url,
        about,
      }, { withCredentials: true })

      console.log("added user",res.data);
      

      dispatch(addUser(res.data))
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-4 md:p-8">
      {/* Form Card */}
      <div className="card w-full max-w-md bg-base-200 shadow-md">
        <div className="card-body overflow-y-auto scrollbar-hide  max-h-[75vh]">
          <h2 className="card-title text-center text-2xl">Edit Profile</h2>

          {/* Input Fields */}
          <div className="form-control">
            <label className="label font-semibold">First Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Last Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
            />
          </div>

          <div className="form-control">
            
            <input
              type="number"
              className="input input-bordered"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              min={1}
              required
            />
          </div>

          <div className="form-control">
            
            <input
              type="url"
              className="input input-bordered"
              value={photo_url}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Photo URL"
              required
            />
          </div>

          <div className="form-control">
            
            <textarea
              className="textarea textarea-bordered resize-none"
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about yourself"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="btn btn-primary w-full mt-4"
            onClick={updateProfileHandler}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Profile Preview */}
      <div className="w-full max-w-sm">
        <FeedCard {...{ age, first_name, last_name, photo_url, about }} />
      </div>

      {/* Toast */}
      {showToast && <Toast message="Profile updated successfully" />}
    </div>
  )
}

export default EditProfile
