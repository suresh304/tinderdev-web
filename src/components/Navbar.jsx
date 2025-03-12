import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'
import { addUser } from '../utils/userSlice'

const Navbar = () => {
  const user = useSelector((store)=>store.user)
  const dispactch = useDispatch()
  const navigate = useNavigate()
  const [show ,setShow] = useState(true)

  const handleLogout = async()=>{
    try {
      await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true})


      dispactch(addUser(null))
      navigate('/login')
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="navbar bg-amber-100  text-blue-700 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Hello-DEV</Link>
  </div>
  <div className="flex gap-2">
    {user&&<p className='my-auto mx-5'>Welcome <i>{user?.firstName}</i>..!</p>}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-10 rounded-full" >
          <img
            src={user?.photoUrl || "https://imgs.search.brave.com/PkO5RpPGZW5uyCYOyjukOXVIfLUcTUbfk5BcF3ZrgQk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzA4LzQ3Lzc1/LzM2MF9GXzcwODQ3/NzUwOF9ETmt6Uklz/TkZnaWJnQ0o2S29U/Z0pqalJaTkpENG1i/NC5qcGc"} />
        </div>
      </div>
      {user&&<ul
        tabIndex={0}
        class="menu menu-sm text-cyan-50 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

        <li>
          <Link to ='/profile' className="justify-between">
            Profile
            
          </Link>
        </li>
        <li><Link to='/connections'>Connections</Link></li>
        <li><Link to='/requests'>Requests</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>}
    </div>
  </div>
</div> 
  )
}

export default Navbar