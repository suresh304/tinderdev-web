import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import { Provider } from 'react-redux'
import { store } from './utils/appstore.js'
import Feed from './components/Feed.jsx'
import Connections from './components/Connections.jsx'
import Requests from './components/Requests.jsx'
import Chat from './components/Chat.jsx'

function App() {

  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />

    <Provider store={store}>

    <BrowserRouter basename='/'>
    <Routes>
      <Route path = "/" element={<Body/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<Feed/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/' element={<Requests/>}/>
        <Route path='/connections' element={<Connections/>}>
        <Route path='connections/chat/:targetUser/:firstName?/:lastName?' element={<Chat/>}/>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
