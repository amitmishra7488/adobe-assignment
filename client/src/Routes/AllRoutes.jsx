import React, { useContext, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../components/Homepage/Home'
import Login from '../components/Login/Login'
import Signup from '../components/Login/Signup'
import Profile from '../components/Profile/Profile'
import Analytics from '../components/Analytics'




export default function AllRoutes() {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="*" element={<Home />} />
        </Routes>
    )
}