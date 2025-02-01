import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../constants'
import { removeFeed } from '../utils/feedSlice'
import { useDispatch } from 'react-redux'

const FeedCard = (feed) => {
    console.log("carduse>>>>>>>>>>>>>>",feed)
    const dispatch = useDispatch()
    const {age,firstName,lastName,gender,photoUrl,about,_id} = feed

    const handleSendRequest = async (status,userId)=>{
      console.log({status,userId})
      try {
       const res =  await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials:true})
  
  
       dispatch(removeFeed(userId))
       console.log("const request send response response>>>>>>>>>>>>",res)
      } catch (error) {
        console.log('error while send  request',error)
      }
    }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl||"https://fastly.picsum.photos/id/683/200/200.jpg?hmac=gsOZBaeY42qvlTQSCuucn40FRUEnTdDYKl9q-YMcZh4"}
      alt="xyz" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-between">
      <button className="btn btn-primary" onClick={()=>handleSendRequest('interested',_id)}>interested</button>
      <button className="btn btn-primary" onClick={()=>handleSendRequest('ignored',_id)}>ignored</button>
    </div>
  </div>
</div>
  )
}

export default FeedCard