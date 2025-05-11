import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { store } from '../utils/appstore'

const Body = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store=>store.user)
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
      navigate('/')

    } catch (error) {
      if(error.status==401){
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    console.log("helllllllllllllllllllllllllllll")
    fetchProfile()
  }, [])
  return (
    <>

    <div className=" relative bg-[url('./assets/coffee-break-6665746.png')] bg-cover bg-center bg-fixed h-screen w-full overflow-scroll  ">

      <Navbar />

      <Outlet />
    </div>
    </>
  )
}

export default Body