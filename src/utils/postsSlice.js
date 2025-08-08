import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:'posts',
    initialState:[],
    reducers:{
        addPosts:(state,action)=>{
            return action.payload
        },
        removePosts:(state,action)=>{
            return state.filter((r)=>r.post_id!==action.payload)
        },
    }
})

export const  {addPosts,removePosts} = postSlice.actions
export default postSlice.reducer