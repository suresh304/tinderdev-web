import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { store } from '../utils/appstore'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connection)
    const user = useSelector(store=>store.user)
    const navigate = useNavigate()

    const fetchConnections = async () => {
        try {
            console.log("hello")
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true })
            dispatch(addConnections(res?.data?.data))
        } catch (error) {
            console.log("error fetching the connections ", error)
        }

    }




    useEffect(() => {
        if(user)
        fetchConnections()
    else navigate('/login')
    }, [])
    if (!connections) return
    if (connections.length == 0) {
        return <h1>No connections found</h1>
    }

    return (
        <div className='flex flex-row-reverse overflow-y-scroll  h-[90vh]'>
            <div className='flex flex-3'>

            <Outlet/>
            </div>
        <div className='flex flex-1  bg-blue-500 text-amber-100 flex-col items-center overflow-scroll'>
            <h1 className='font-bold text-2xl my-4 text-amber-100'>Connections</h1>
            <ul className="list rounded-box shadow-md w-full">
            {connections?.map((connection, i) => {
                const { firstName, lastName, photoUrl, _id } = connection
                return <Link to={`connections/chat/${_id}/${firstName}/${lastName}`} className='mb-1'>
                <li className="list-row   text hover:bg-amber-200 hover:text-blue-700">
                <div><img className="size-10 rounded-box" src={photoUrl||"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"} alt='profile'/></div>
                <div>
                  <div className='  font-bold '>{firstName.toUpperCase()+" "+lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                </div>
                {/* <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button> */}
                
              </li>
                </Link>
            })}
</ul>
        </div>
        </div>
    )
}

export default Connections

