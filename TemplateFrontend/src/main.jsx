import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './components/App.jsx'
import Login from './components/UserHandling/Login.jsx'
import Signup from './components/UserHandling/Signup.jsx'
import Home from './components/Home.jsx'
import ChatRoomList from './components/ChatRooms/ChatRoomList.jsx'
import ChatRoom from './components/ChatRooms/ChatRoom.jsx'
import RouteError from './components/RouteError.jsx'
import './stylesheet/index.css'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/chatrooms',
    element: <ChatRoomList />
  },
  {
    path: '/chatrooms/:chatRoomId',
    element: <ChatRoom />
  }, 
  {
    path: ':userInput',
    element: <RouteError />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Router}/>
  </React.StrictMode>,
)
