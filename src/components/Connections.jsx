import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { store } from '../utils/appstore'
import { Link } from 'react-router-dom'

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connection)
    console.log("heeeeeeeeeeeeee", connections)

    const fetchConnections = async () => {
        try {
            console.log("hello")
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true })
            console.log(res?.data?.data)
            dispatch(addConnections(res?.data?.data))
        } catch (error) {
            console.log("error fetching the connections ", error)
        }

    }




    useEffect(() => {
        fetchConnections()
    }, [])
    if (!connections) return
    if (connections.length == 0) {
        return <h1>No connections found</h1>
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-2xl my-4'>Connections</h1>
            {connections?.map((connection, i) => {
                const { firstName, lastName, photourl, _id } = connection
                return <div className="card bg-emerald-50 text-blue-900 my-4 w-96 shadow-sm ">
                    <div className="card-body">
                        <div className='flex justify-between flex-row-reverse'>

                            <h2 className="card-title">{firstName} {lastName}</h2>
                            <img className=" w-16 h-16 rounded-full" src={photourl || 'https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images..jpg'} />
                        </div>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

                    </div>
                    <Link to={`/chat/${_id}/${firstName}/${lastName}`} className='btn btn-info'>
                        <button className="btn btn-info">Chat</button>
                    </Link>

                </div>
            })}
        </div>
    )
}

export default Connections