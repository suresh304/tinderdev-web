import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../constants'
import { removeFeed } from '../utils/feedSlice'
import { useDispatch } from 'react-redux'

const FeedCard = (feed) => {
  const dispatch = useDispatch()
  const { age, firstName, lastName, gender, photoUrl, about, _id } = feed

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true })


      dispatch(removeFeed(userId))
    } catch (error) {
    }
  }

  return (
    <div className="card flex flex-wrap bg-base-300 my-2 w-full shadow-sm m-2">
      <div className="card-body">
        <div className='flex justify-between flex-row-reverse'>

          <h2 className="card-title">{firstName} {lastName}</h2>
          <img className=" w-16 h-16 rounded-full" src={photoUrl || 'https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg'} />
        </div>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => handleSendRequest('interested', _id)}>interested</button>
          <button className="btn btn-error" onClick={() => handleSendRequest('ignored', _id)}>ignored</button>
        </div>
      </div>
    </div>





  )
}

export default FeedCard