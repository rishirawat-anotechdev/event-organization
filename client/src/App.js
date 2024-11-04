import React from 'react'
import MainPage from './pages/MainPage'

import { Routes, Route } from "react-router-dom"
import EventPage from './components/CategoriesEvents/EventPage'
import Layout from './Admin/Layout'
import LoginPage from './pages/LoginPage'
import DashBorad from './Admin/DashBorad'
import MessagePage from './Admin/MessagePage'
import ProtectedRoute from './auth/ProtectedRoute'



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={< MainPage />} />
        <Route path="/events/:categoryId" element={<EventPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute adminOnly={true} />}>

          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<DashBorad />} />
            <Route path="messages" element={<MessagePage />} />
          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App