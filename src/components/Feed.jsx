import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { store } from '../utils/appstore'
import FeedCard from './FeedCard'
import NewsCard from './NewsCard'

const Feed = () => {
    const dispactch = useDispatch()
    const feed = useSelector(store => store.feed)
    const [newsFeed, setNewsFeed] = useState()
    const [query, setQuery] = useState('spirituality')


    const getFeed = async () => {
        if (feed) {
            return
        }

        const res = await axios.get(`${BASE_URL}/feed`, {
            withCredentials: true
        })
        dispactch(addFeed(res?.data?.data))

    }




    const getNewsFeed = async () => {
        try {
              

            
            const res = await fetch('http://localhost:3001/news?q='+query, {
                withCredentials: true,
            });


            console.log('news', res)
            const data = await res.json()
            console.log(data)

            if (res.ok) {
                setNewsFeed(data.articles)
            }

        } catch (error) {
            console.log('error while getting news..', error)
        }

    }



    useEffect(() => {
        getFeed()
        getNewsFeed()
    }, [query])


    return (
        <>
            {!feed?.length && <h1 className='text-4xl font-extrabold mx-20'> OOPS No suggestions...</h1>}

            <div className='flex  max-w-full  overflow-x-scroll'>
                <div className='text-2xl font-bold mx-20'> Search for interesting news </div>
                <input type="text" placeholder="Type key words for news" class="input input-accent" onChange={(e) => setQuery(e.target.value)} />
                {feed?.map((feed, i) => <FeedCard {...feed} />)}

            </div>
            <div className='flex justify-center flex-wrap'>
                {newsFeed?.map((news, i) => (
                    <NewsCard
                        key={news.url || i}
                        author={news.author}
                        title={news.title}
                        description={news.description}
                        content={news.content}
                        url={news.url}
                        imageUrl={news.urlToImage}
                    />
                ))}
            </div>
        </>
    )
}

export default Feed