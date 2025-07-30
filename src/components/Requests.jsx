import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useNavigate } from 'react-router-dom'
import Toast from './Toast'
import { log } from '../utils/helpers'
import NoResults from './NoResults'

const Requests = () => {





  const dispatch = useDispatch()
  const requests = useSelector((store) => store.request)
  const user = useSelector(store => store.user)
  console.log("user>>>>>>>>>>>", user)
  const navigate = useNavigate()
  const [notify, setNotify] = useState(false)

  const fetchrequests = async () => {
    setNotify(false)
    if (!user) {
      navigate('/login')
      setNotify(true)


    }
    // if(requests) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true })

      log("this is ", res.data.data)
      dispatch(addRequest(res?.data?.data))
    } catch (error) {
      console.log("error fetching the recieed reqests ", error)
    }

  }

  //http://localhost:3001/request/review/accepted/6799db8676cc9da9db21f3a6
  const handleReviewRequest = async (status, reqId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${reqId}`, {}, { withCredentials: true })


      dispatch(removeRequest(reqId))
    } catch (error) {
      console.log('error while review request', error)
    }
  }


  useEffect(() => {
    fetchrequests()
  }, [])
  useEffect(() => {
    console.log('notfy')
  }, [notify])
  if (!requests) return
  if (requests.length == 0) {
    return <NoResults message={"No requests for you !"} />
  }







  return (
    <div className='flex  flex-col items-center'>
      <h1 className='font-bold text-2xl my-4'>Requests</h1>
      {requests?.map((request, i) => {
        const { from_first_name, from_last_name, from_photo_url,to_photo_url, from_user_id, to_user_id, status, to_first_name, to_last_name } = request
        return <div className="card  bg-base-300 my-2  shadow-sm">
          <div className="card-body">
            <div className='flex justify-between flex-row-reverse'>

              <h2 className="card-title">
                {user.id === from_user_id
                  ? `${to_first_name} ${to_first_name}`
                  : `${from_first_name} ${from_last_name}`}
              </h2>
              <img className=" w-16 h-16 rounded-full" src={user.id === from_user_id
                  ? `${to_photo_url} `
                  : `${from_photo_url} `} />
            </div>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => handleReviewRequest('accepted', request.id)}
                disabled={user.id == from_user_id}

              >{user.id == from_user_id ? "sent" : "Accept"}</button>
              <button className="btn btn-error" onClick={() => handleReviewRequest('rejected', request.id)}>Deny</button>
            </div>
          </div>
        </div>
      })}
      {notify && <Toast message={"Please login"} />}
    </div>
  )
}

export default Requests