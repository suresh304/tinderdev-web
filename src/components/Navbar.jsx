import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, DEFAULT_PROFILE_URL, themes } from '../constants'
import { addUser } from '../utils/userSlice'
import { setTheme } from '../utils/themeSlice'


const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currTheme, setCurrTheme] = useState(localStorage.getItem('theme')||"")

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })


      dispatch(addUser(null))
      navigate('/login')
    } catch (error) {
      console.log(error)
    }

  }

  const handleChange = (e) => {
  const selectedTheme = e.target.value;
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (!selectedTheme || selectedTheme === currentTheme) return;

  // Optional: Validate theme against a list of allowed themes
  // const allowedThemes = ['light', 'dark', 'cupcake', 'sunset', 'rainbow', 'forest']; // Example themes
  // if (!allowedThemes.includes(selectedTheme)) return;

  document.documentElement.setAttribute('data-theme', selectedTheme);
  localStorage.setItem('theme', selectedTheme);
  setCurrTheme(selectedTheme)
  dispatch(setTheme(selectedTheme))
};


useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}, []);




  return (
    <div className="navbar bg-base-100 shadow-sm ">
      <div className="flex-1 my-auto">
        <Link to="/" className="btn btn-ghost text-xl">Hey 😍💕</Link>
        <select
      value={currTheme}
      defaultValue={themes[0]}
      onChange={handleChange}
      className="btn"
    >
      <option disabled>Theme</option>

      {themes.map((theme,i)=><option value={theme} key={theme}>{theme}</option>)}
      
    </select>
      </div>
      <div className="flex gap-2 items-center">
        <Link to='/connections' className='btn btn-primary'>Connections</Link>
        <Link to='/requests' className='btn btn-primary'>Requests</Link>
        {user && <p className='my-auto mx-5 text-xs uppercase font-semibold'>Welcome <i>{user?.firstName}</i>..!</p>}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-10 rounded-full" >
              <img
                src={user?.photoUrl || DEFAULT_PROFILE_URL} />
            </div>
          </div>
          {user && <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

            <li>
              <Link to='/profile' className="justify-between">
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