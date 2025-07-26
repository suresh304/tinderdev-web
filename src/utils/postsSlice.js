import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:'posts',
    initialState:null,
    reducers:{
        addPosts:(state,action)=>{
            return action.payload
        },
        removePosts:(state,action)=>{
            return state.filter((r)=>r._id!==action.payload)
        },
    }
})

export const  {addPosts,removePosts} = postSlice.actions
export default postSlice.reducer