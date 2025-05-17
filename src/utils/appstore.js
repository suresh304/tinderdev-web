import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionsSlice'
import requestReducer from './requestSlice'
import themesReducer from './themeSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    feed:feedReducer,
    connection:connectionReducer,
    request:requestReducer,
    themes:themesReducer
  },
})