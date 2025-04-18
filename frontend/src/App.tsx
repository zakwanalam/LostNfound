import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  )
}

export default App
