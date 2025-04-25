import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'
import HeroSection from './Hero-Section/HeroSection'
import { LoginForm } from './components/login-form'
import { SignupForm } from './components/sign-up'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HeroSection />}></Route>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/sign-up' element={<SignupForm />}></Route>
      {/* <Route path='/' element={<Home />}></Route> */}
    </Routes>
  )
}

export default App
