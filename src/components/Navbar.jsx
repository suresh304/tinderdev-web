import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, DEFAULT_PROFILE_URL, themes } from '../constants';
import { addUser } from '../utils/userSlice';
import { setTheme } from '../utils/themeSlice';
import { Menu, LogOut, User, Users } from 'lucide-react';
import { addPosts } from '../utils/postsSlice';
import { addFeed } from '../utils/feedSlice';
import { addRequest } from '../utils/requestSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currTheme, setCurrTheme] = useState(localStorage.getItem('theme') || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(addUser(null));
      dispatch(addPosts([]));
      dispatch(addFeed([]));
      dispatch(addRequest([]))
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (!selectedTheme || selectedTheme === currentTheme) return;

    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    setCurrTheme(selectedTheme);
    dispatch(setTheme(selectedTheme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <div className="navbar bg-blue-300 shadow-sm px-4">
      {/* Mobile Hamburger */}
      <div className="flex-none lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}><LogOut className="h-4 w-4" /> Logout</button></li>
          </ul>
        </div>
      </div>

      {/* Logo + Theme Selector */}
     <div className="flex flex-col md:flex-row md:items-center gap-2">
  <Link to="/feed" className="btn btn-ghost text-xl">
    sureChat😍💕
  </Link>

  <select
    value={currTheme}
    onChange={handleChange}
    className="btn text-sm"
  >
    <option disabled>Theme</option>
    {themes.map((theme) => (
      <option value={theme} key={theme}>
        {theme}
      </option>
    ))}
  </select>
</div>


      {/* Desktop Nav Items */}
      <div className="hidden lg:flex gap-3 items-center">
        <Link to='/posts' className='btn btn-primary'>Posts</Link>
        <Link to='/connections' className='btn btn-primary'>Chats</Link>
        <Link to='/requests' className='btn btn-primary'>Requests</Link>
        {user && (
          <p className="text-xs uppercase font-semibold">
            Welcome <i>{user.first_name}</i>..!
          </p>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-10 rounded-full">
              <img src={user?.photo_url || DEFAULT_PROFILE_URL} />
            </div>
          </div>
          {user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile'><User className="w-4 h-4" /> Profile</Link>
              </li>
              <li>
                <Link to='/connections'><Users className="w-4 h-4" /> Connections</Link>
              </li>
              <li>
                <Link to='/requests'>Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}><LogOut className="w-4 h-4" /> Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
