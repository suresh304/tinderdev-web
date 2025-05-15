import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { store } from '../utils/appstore'
import FeedCard from './FeedCard'

const Feed = () => {
    const dispactch = useDispatch()
    const feed = useSelector(store => store.feed)


    const getFeed = async () => {
        if (feed) {
            return
        }

        const res = await axios.get(`${BASE_URL}/feed`, {
            withCredentials: true
        })
        dispactch(addFeed(res?.data?.data))

    }



    useEffect(() => {
        getFeed()
    }, [])

    if(!feed?.length){
        return <h1>OOPS No suggestions...</h1>
    }
    return (
        <div className='flex  max-w-full mt-[7%] overflow-x-scroll'>
            {feed?.map((feed,i)=><FeedCard {...feed}/>)}
            

            {/* <FeedCard {...feed[0]}/> */}
        </div>
    )
}

export default Feed