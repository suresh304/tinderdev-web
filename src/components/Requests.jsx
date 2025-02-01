import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import axios from 'axios'
import { BASE_URL } from '../constants'

const Requests = () => {





  const dispatch = useDispatch()
  const requests = useSelector((store) => store.request)
  console.log("heeeeeeeeeeeeee", requests)

  const fetchrequests = async () => {
    try {
      console.log("hello req")
      const res = await axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true })
      console.log(res?.data?.data)
      dispatch(addRequest(res?.data?.data))
    } catch (error) {
      console.log("error fetching the recieed reqests ", error)
    }

  }

//http://localhost:3001/request/review/accepted/6799db8676cc9da9db21f3a6
  const handleReviewRequest = async (status,reqId)=>{
    console.log({status,reqId})
    try {
     const res =  await axios.post(`${BASE_URL}/request/review/${status}/${reqId}`,{},{withCredentials:true})


     dispatch(removeRequest(reqId))
     console.log("const review response>>>>>>>>>>>>",res)
    } catch (error) {
      console.log('error while review request',error)
    }
  }


  useEffect(() => {
    fetchrequests()
  }, [])
  if (!requests) return
  if (requests.length == 0) {
    return <h1>No reqests found</h1>
  }







  return (
    <div className='flex  flex-col items-center'>
        <h1 className='font-bold text-2xl my-4'>Requests</h1>
        {requests?.map((request,i)=>{
            const {firstName,lastName,photourl} = request.fromUserId
           return <div className="card  bg-base-300 my-2  shadow-sm">
           <div className="card-body">
            <div className='flex justify-between flex-row-reverse'>

             <h2 className="card-title">{firstName} {lastName}</h2>
             <img className =" w-16 h-16 rounded-full" src={photourl||'https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg'}/>
            </div>
             <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
             <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>handleReviewRequest('accepted',request._id)}>Accept</button>
      <button className="btn btn-error">Deny</button>
    </div>
           </div>
         </div>
        })}
    </div>
  )
}

export default Requests