import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'
import { use } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { formatTime, log } from '../utils/helpers'
import Modal from './Modal'

const Chat = () => {
    const { targetUser, first_name: targetUserFirsttName, last_name: targetUserlast_name } = useParams()
    console.log(targetUser, targetUserFirsttName)

    const user = useSelector(store => store.user)
    const userId = user?.id
    const userPhoto = user?.photo_url
    const first_name = user?.first_name
    const last_name = user?.last_name
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [modal, setModal] = useState({ isopen: false, data: {} })
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [idsToBeDeleted, setIdsToBeDeleted] = useState([])
    const theme = useSelector(store => store.themes)

    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [loading, setLoading] = useState(false)

    let interval;

    const getChats = async (id) => {

        const data = await axios.get(`${BASE_URL}/chat/${targetUser}/`, { withCredentials: true })
        setChats(data.data.messages)
        setIdsToBeDeleted([])
        setLoading((prev) => !prev)
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
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post(`${BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true // needed if backend uses cookies
            });

            setUploadedUrl(res.data.fileUrl); // S3 public URL
            alert("Upload successful!");
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. See console for details.");
        }
    };



    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);




    useEffect(() => {
        if (!user?.id) return
        const socket = createSocketConnection()

        socket.emit('joinchat', { userId, first_name, targetUser })

        socket.on('messagerecieved', ({ sender_id, receiver_id, text, created_at, deletedBy, id }) => {
            if (userId == receiver_id)
                setChats((prev) => [...prev, { sender_id, receiver_id, text, created_at }])
            if (Notification.permission === "granted") {
                new Notification("New message", {
                    body: `${first_name}: ${text}`,

                });
            }
            idsToBeDeleted.push(id)
            setIdsToBeDeleted(prev => [...idsToBeDeleted, id])
            setIsTyping(false)

        })
        socket.on('typingStatusRecieved', (data, sender_id, reciever_id) => {
            if (data.reciever_id == userId) {
                clearTimeout(interval)
                setIsTyping(true)
                interval = setTimeout(() => setIsTyping(false), 2000)
            }

        })

        socket.on('messageUpdated', (filteredMessages) => {

            console.log('filtered messages',filteredMessages)

            setChats(filteredMessages)
            setModal({
                ...modal,
                isopen: false,

            })


        })


        getChats()



        return () => {
            socket.disconnect()
        }

    }, [userId, targetUser])




    useEffect(() => {

        const chatDiv = chatContainerRef.current;
        // if (chatDiv && chatDiv.scrollHeight - chatDiv.scrollTop === chatDiv.clientHeight) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // }


        return () => clearTimeout(interval)
    }, [chats, isTyping, idsToBeDeleted]);



    const sendMessage = (msg) => {
        console.log('this is sendingf message>>>>>>>', message)
        const socket = createSocketConnection()

        socket.emit('sendmessage', { first_name, userId, targetUser, message })
        setChats((prev) => [...prev, {

            "text": message,
            "created_at": new Date().toISOString(),
            "sender_id": userId,
            "receiver_id": targetUser,
            "sender_first_name": first_name,
            "sender_last_name": last_name,
            "sender_photo_url": "",
            "receiver_first_name": targetUserFirsttName,
            "receiver_last_name": targetUserlast_name,
            "receiver_photo_url": ""
        }])

        setMessage('')
    }

    const typing = (e) => {
        const socket = createSocketConnection()

        socket.emit('typing', { data: { type: 'typing' }, userId, targetUser })
        setMessage(e.target.value)
    }



    const deleteMessage = async (msgId) => {
    console.log('Deleting message with ID:', msgId);

    const socket = createSocketConnection(); // Ensure this doesn't recreate socket every time

    try {
        if (!msgId) {
            if (idsToBeDeleted.length) {
                const lastMsgId = idsToBeDeleted[idsToBeDeleted.length - 1];
                socket.emit('deletingMessage', { msgId: lastMsgId, userId, targetUser });
                setIdsToBeDeleted(prev => prev.slice(0, -1));
            }

            // Optimistically remove last message from chat UI
            setChats(prev => prev.slice(0, -1));

            // Close the modal
            setModal(prev => ({ ...prev, isopen: false }));
            return;
        }

        // Emit delete for given msgId
        socket.emit('deletingMessage', { msgId, userId, targetUser });

    } catch (error) {
        console.error("Error while deleting message:", error?.response?.data || error.message);
    }
};


    return (
        <>
            {modal.isopen && <Modal Yes={() => deleteMessage(modal.data.id)} No={() => setModal({ ...modal, isopen: false })} onClose={() => setModal({ ...modal, isopen: false })} />}
            <div className=" relative w-full   overflow-hidden  h-screen flex flex-col justify-between  bg-cover bg-center bg-fixed pt-[64px]"
            // style={{ backgroundImage: `url('/${theme}.png')` }}
            >
                <div className='w-[25%] flex items-center justify-around rounded-b-lg p-1.5 bg-blue-300 mx-auto'>
                    <div>{targetUserFirsttName} {targetUserlast_name}</div>


                </div>
                <div className='overflow-scroll' ref={chatContainerRef} >

                    {chats?.map((chat, i) => {
                        log(chat)
                        return <div className={chat?.sender_id == userId ? "chat chat-end" : "chat chat-start"} key={i}>
                            <div className="chat-image avatar pl-5">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Chat Profile"
                                        src={chat.sender_photo_url}
                                    /> </div>
                            </div>
                            <div className="chat-header">
                                <time className="text-xs opacity-50 text-blue-700 font-bold">{formatTime(chat.created_at)}</time>
                            </div>
                            <div className="chat-bubble" onDoubleClick={() =>
                                setModal({
                                    ...modal,
                                    isopen: true,
                                    data: {
                                        ...modal.data,
                                        id: chat.id
                                    }
                                })
                            }>

                                {chat.text.includes('http') ? <a href='chat.text' target='_blank' /> : chat.text}

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
                <div className='fixed bottom-0  z-50 w-[70%] flex justify-center items-center'>
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