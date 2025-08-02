import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { setTheme } from '../utils/themeSlice'
import { store } from '../utils/appstore'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../index.css';
import Toast from './Toast'
import NoResults from './NoResults'

const Connections = () => {

  const dispatch = useDispatch()
  const connections = useSelector((store) => store.connection)
  const user = useSelector(store => store.user)
  const theme = useSelector(store => store.themes)
  console.log("user info", user)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState(null);
  const [showToast, setShowToast] = useState(false)

  const navigate = useNavigate()

  const fetchConnections = async () => {
    console.log(connections)
    if (connections) return;
    try {

      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true })
      dispatch(addConnections(res?.data?.data))
    } catch (error) {
      console.log("error fetching the connections ", error)
    }

  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setUploading(true)
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      // setUploadedUrl(res.data.fileUrl); 
      setUploading(false)
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 4000)


    } catch (err) {
      console.error("Upload failed:", err);

    }
  };




  useEffect(() => {
    if (user)
      fetchConnections()
    else navigate('/login')
  }, [])
  if (!connections) return
  if (connections.length === 0) {
  return (
   <NoResults message={"You haven’t connected with anyone yet. Start building meaningful conversations now!"}/>
  );
}


  return (
   <div className="flex flex-row-reverse h-[85%] bg-base-200">
  {showToast && <Toast message={"Uploaded successfully!"} />}

  {/* Right Side: Chat Area */}
  <div className="flex flex-[4] overflow-y-scroll border-l border-base-300 shadow-inner">
    <Outlet />
  </div>

  {/* Left Sidebar: Connections + Upload */}
  <div className="flex flex-col flex-1 h-[91vh] bg-base-100 border-r border-base-300 shadow-lg">

    {/* Upload Section for Admin */}
      {user?.email_id === 'admin@gmail.com' && (
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
          <button className="btn btn-primary gap-2" onClick={handleUpload}>
            Upload
            {uploading && <span className="loading loading-ring loading-sm"></span>}
          </button>
        </div>
      )}

    {/* Connections List */}
    <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-2">
      <ul className="space-y-2">
        {connections?.map(({ first_name, last_name, photo_url, id }) => (
          <Link
            to={`connections/chat/${id}/${first_name}/${last_name}`}
            key={id}
            className="block"
          >
            <li className="flex items-center gap-4 p-3 rounded-lg bg-base-100 shadow-sm hover:bg-base-300 transition">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      photo_url ||
                      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                    }
                    alt="profile"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold text-base text-primary">
                  {first_name.toUpperCase()} {last_name.toUpperCase()}
                </div>
                <div className="text-sm font-medium text-gray-500">📎 Remaining Reason</div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  </div>
</div>

  )
}

export default Connections

