import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'
import { use } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants'

const Chat = () => {
    const { targetUser,firstName:targetUserFirsttName,lastName:targetUserLastName } = useParams()

    const user = useSelector(store => store.user)
    const userId = user?._id
    const firstName = user?.firstName
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

    const getChats = async (id) => {
        const data = await axios.get(`${BASE_URL}/chat/${targetUser}`, { withCredentials: true })
        console.log("this is data...>>>", data)
        setChats(data.data.messages)
    }

    useEffect(() => {
        if (!user?._id) return
        const socket = createSocketConnection()

        socket.emit('joinchat', { userId, firstName, targetUser })

        socket.on('messagerecieved', ({ senderId, recieverId, text }) => {
            console.log({ senderId, recieverId, text })
            setChats((prev) => [...prev, { senderId, recieverId, text }])

        })


        getChats()



        return () => {
            socket.disconnect()
        }

    }, [userId, targetUser])




    useEffect(() => {

        console.log("triggered..............>")
        const chatDiv = chatContainerRef.current;
        // if (chatDiv && chatDiv.scrollHeight - chatDiv.scrollTop === chatDiv.clientHeight) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // }
      }, [chats]);



    const sendMessage = () => {
        const socket = createSocketConnection()

        socket.emit('sendmessage', { firstName, userId, targetUser, message })
        setMessage('')
    }



    return (
        <>
            <div className='w-full sm:w-[90%] lg:w-[60%] mx-auto bg-amber-50 overflow-hidden rounded-xl h-[90vh] flex flex-col justify-between'>
                    <h1 className='text-2xl font-light font-serif text-cyan-50 text-blue-950 flex bg-blue-400  justify-center sticky '> {targetUserFirsttName} {targetUserLastName}</h1>
                <div className='overflow-scroll' ref={chatContainerRef}>

                    {chats?.map((chat, i) => {
                        return <div className={chat?.senderId?._id == userId ? "chat chat-end" : "chat chat-start"} key={i}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Chat Profile"
                                        src={chat.senderId.photoUrl}
                                    /> </div>
                            </div>
                            <div className="chat-header">
                                {chat.firstName}
                                <time className="text-xs opacity-50 text-amber-800">12:45</time>
                            </div>
                            <div className="chat-bubble">
                                {chat.text}

                            </div>
                            <div className="chat-footer text-amber-900 opacity-50">Delivered</div>
                        </div>
                    })}
                    <div ref={messagesEndRef} ></div>
                    

                </div>
                <div className='flex justify-center items-center'>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type here"
                        class="input input-bordered input-primary w-[70%] my-2" />
                    <button className="btn btn-info" onClick={() => sendMessage()}>Chat</button>

                </div>
            </div>
        </>
    )
}

export default Chat