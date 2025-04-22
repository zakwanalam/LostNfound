import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'
import HeroSection from './Hero-Section/HeroSection'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HeroSection />}></Route>
      {/* <Route path='/' element={<Home />}></Route> */}
    </Routes>
  )
}

export default App
