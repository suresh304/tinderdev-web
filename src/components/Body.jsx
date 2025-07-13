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
  const user = useSelector(store => store.user)
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
      navigate('/')

    } catch (error) {
      if (error.status == 401) {
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])
  return (
    <>

      <div className="relative bg-cover bg-center bg-fixed w-full overflow-scroll">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <Navbar />
        </div>

        {/* Content below navbar with padding-top */}
        <div className="pt-[64px]"> {/* adjust to navbar height */}
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default Body