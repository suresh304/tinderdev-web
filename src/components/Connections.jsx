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

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connection)
    const user = useSelector(store => store.user)
    const theme = useSelector(store => store.themes)
    console.log("user info", user)
    const [uploading,setUploading] = useState(false)
    const [file, setFile] = useState(null);
    const [showToast,setShowToast] = useState(false)

    const navigate = useNavigate()

    const fetchConnections = async () => {
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
            setTimeout(()=>{
              setShowToast(false)
            },4000)
           
            
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
    if (connections.length == 0) {
        return <h1>No connections found</h1>
    }

    return (
        <div className='flex flex-row-reverse  h-[90%]'>
          {showToast&&<Toast message={"uploaded successfully!"}/>}
            <div className='flex flex-3 overflow-y-scroll'>

                <Outlet />
            </div>
            
            <div className="flex flex-1 flex-col h-screen bg-amber-100">

  <div className="sticky top-0 z-10 bg-amber-100 px-4 py-2">
   { user.emailId == 'admin@gmail.com'&&<div className="flex items-center gap-2">
      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="input input-bordered input-primary w-[70%]"
      />
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
        {uploading&&<span className="loading loading-ring loading-md"></span>}
        </button>
    </div>
    
    }
    
  </div>
  

  {/* 🔃 Scrollable List */}
  <div className="flex-1 overflow-y-auto px-4 pb-4">
    <ul className="list bg-base-100 rounded-box shadow-md w-full">
     

      {connections?.map((connection, i) => {
        const { firstName, lastName, photoUrl, _id } = connection;
        return (
          <Link to={`connections/chat/${_id}/${firstName}/${lastName}`} key={_id} className="mb-1">
            <li className="list-row flex items-center gap-3 p-2">
              <img
                className="size-10 rounded-box"
                src={photoUrl || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
                alt="profile"
              />
              <div>
                <div className="font-bold">
                  {firstName.toUpperCase() + " " + lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  </div>

</div>

        </div>
    )
}

export default Connections

