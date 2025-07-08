import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../constants'
import { removeFeed } from '../utils/feedSlice'
import { useDispatch } from 'react-redux'

const FeedCard = (feed) => {
    const dispatch = useDispatch()
    const {age,firstName,lastName,gender,photoUrl,about,_id} = feed

    const handleSendRequest = async (status,userId)=>{
      try {
       const res =  await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials:true})
  
  
       dispatch(removeFeed(userId))
      } catch (error) {
      }
    }

  return (
    <div className="card ml-5 p-5 text-cyan-950  bg-amber-50 min-w-80 h-[60vh] overflow-scroll shadow-sm">
  <figure>
    <img
    className='w-60 rounded-full mt-4'
      src={photoUrl||"https://fastly.picsum.photos/id/683/200/200.jpg?hmac=gsOZBaeY42qvlTQSCuucn40FRUEnTdDYKl9q-YMcZh4"}
      alt="xyz" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-between">
      <button className="btn btn-primary" onClick={()=>handleSendRequest('interested',_id)}>interested</button>
      <button className="btn btn-primary" onClick={()=>handleSendRequest('ignored',_id)}>ignored</button>
    </div>
  </div>
</div>
  )
}

export default FeedCard