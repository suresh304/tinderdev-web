import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'
import { use } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { formatTime } from '../utils/helpers'
import Modal from './Modal'

const Chat = () => {
    const { targetUser, firstName: targetUserFirsttName, lastName: targetUserLastName } = useParams()

    const user = useSelector(store => store.user)
    const userId = user?._id
    const firstName = user?.firstName
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [modal, setModal] = useState({ isopen: false, data: {} })
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    let interval;

    const getChats = async (id) => {
        const data = await axios.get(`${BASE_URL}/chat/${targetUser}`, { withCredentials: true })
        console.log("this is data...>>>", data.data.messages)
        setChats(data.data.messages)
    }

    useEffect(() => {
        if (!user?._id) return
        const socket = createSocketConnection()

        socket.emit('joinchat', { userId, firstName, targetUser })

        socket.on('messagerecieved', ({ senderId, recieverId, text, createdAt }) => {

            if (userId == recieverId._id)
                setChats((prev) => [...prev, { senderId, recieverId, text, createdAt }])
            console.log("this is chats>>>>>>>>>>>>>", chats)
            setIsTyping(false)

        })
        socket.on('typingStatusRecieved', (data, senderId, recieverId) => {
            if (data.recieverId == userId) {
                clearTimeout(interval)
                setIsTyping(true)
                interval = setTimeout(() => setIsTyping(false), 2000)
            }

        })

        socket.on('messageDeleted', (data, senderId, recieverId) => {
            console.log("message deleted>>>>>>>>>>")

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


        return () => clearTimeout(interval)
    }, [chats, isTyping]);



    const sendMessage = () => {
        const socket = createSocketConnection()

        socket.emit('sendmessage', { firstName, userId, targetUser, message })
        setChats((prev) => [...prev, { senderId: { firstName: "", lastName: "", photoUrl: "", _id: userId }, recieverId: { firstName: "", lastName: "", photoUrl: "", _id: targetUser }, createdAt: new Date().toISOString(), text: message }])

        setMessage('')
    }

    const typing = (e) => {
        const socket = createSocketConnection()

        socket.emit('typing', { data: { type: 'typing' }, userId, targetUser })
        setMessage(e.target.value)
    }



    const deleteMessage = async (id) => {
    console.log("This is the ID to be deleted:", id);
    const socket = createSocketConnection()
    try {
        const res = await axios.post(
            `${BASE_URL}/chat/${targetUser}/${id}`,
            { del_for_both: true },
            { withCredentials: true }
        );


   socket.emit('deleteMessage', { data: { type: 'typing' }, userId, targetUser })

        console.log(res.status)
        if(res.status = 200){
          setModal({ ...modal, isopen: false })  
        }

        console.log("Delete response >>>>>>>>", res.data);
    } catch (error) {
        console.error("This is the error >>>>>>>>>>>>>>>", error.response?.data || error.message);
    }
};




    return (
        <>
            {modal.isopen && <Modal Yes={() => deleteMessage(modal.data.id)} No={() => { }} onClose={() => setModal({ ...modal, isopen: false })} />}
            <div className='w-full   bg-amber-50 overflow-hidden  h-[90vh] flex flex-col justify-between'>
                <div className='w-full h-16 bg-blue-500 flex justify-between'>
                    <div>{targetUserFirsttName} {targetUserLastName}</div>


                </div>
                <div className='overflow-scroll' ref={chatContainerRef}>
                    {console.log("display>>>>>>>", chats)}

                    {chats?.map((chat, i) => {
                        return <div className={chat?.senderId?._id == userId ? "chat chat-end" : "chat chat-start"} key={i}>
                            <div className="chat-image avatar pl-5">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Chat Profile"
                                        src={chat.senderId.photoUrl}
                                    /> </div>
                            </div>
                            <div className="chat-header">
                                <time className="text-xs opacity-50 text-blue-700 font-bold">{formatTime(chat.createdAt)}</time>
                            </div>
                            <div className="chat-bubble" onDoubleClick={() =>
                                setModal({
                                    ...modal,
                                    isopen: true,
                                    data: {
                                        ...modal.data,
                                        id: chat._id
                                    }
                                })
                            }>

                                {chat.text}
                                {chat._id}


                            </div>
                            <div className="chat-footer text-amber-900 opacity-50">Delivered</div>
                        </div>
                    })}

                    {isTyping && <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Chat Profile"
                                /> </div>
                        </div>
                        <div className="chat-header">
                            <time className="text-xs opacity-50 text-amber-800">12:45</time>
                        </div>
                        <div className="chat-bubble">
                            <span className="loading loading-dots loading-sm"></span>
                        </div>
                    </div>}

                    <div ref={messagesEndRef} ></div>


                </div>
                <div className='flex justify-center items-center'>
                    <input
                        type="text"
                        value={message}
                        // onChange={(e) => {setMessage(e.target.value)}}
                        onChange={(e) => typing(e)}
                        onKeyDown={(e) => e.key == "Enter" && sendMessage()}
                        placeholder="Type here"
                        class="input input-bordered input-primary w-[70%] my-2" />
                    <button className="btn btn-info" onClick={() => sendMessage()}>Chat</button>

                </div>
            </div>
        </>
    )
}

export default Chat