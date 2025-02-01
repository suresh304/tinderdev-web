import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { store } from '../utils/appstore'

const Body = () => {

  const dispactch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store=>store.user)
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      })
      dispactch(addUser(res.data))

    } catch (error) {
      if(error.status==401){
        navigate('/login')
      }
      console.log("error fetching the profile", error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Body