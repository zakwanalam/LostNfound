import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'

import { LoginForm } from './components/login-form'
import { SignupForm } from './components/sign-up'
import HeroSection from './Home/Hero-Section/HeroSection'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/sign-up' element={<SignupForm />}></Route> 
    </Routes>
  )
}

export default App
