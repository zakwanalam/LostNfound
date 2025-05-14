import React, { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './Home/Home'
import { LoginForm } from './components/login-form'
import { SignupForm } from './components/sign-up'
import { PhoneNumberCard } from './components/phone-number-card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './state/store'
import { loginSuccess, logout } from './state/auth/loginSlice'

import { foundItems } from './Home/Hero-Section/HeroSection'
import Items from './Items/Items'
import ItemsPage from './Items/ItemsPage'
import { fetchItems } from './state/item/fetchItem'
import Dashboard from './Dashboard/dashboard'

function App() {
  const [isVerifying, setIsVerifying] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.loginState.isAuthenticated);
  const dispatch = useDispatch();
  const {items,loading,error} = useSelector((state:RootState)=>state.itemState)
  console.log(items);
  
  useEffect(() => {
      const verifyToken = async () => {
          try {
              await axios.post(
                  "http://localhost:5086/api/auth/verifyToken",
                  {},
                  { withCredentials: true }
              );
              
              const data = localStorage.getItem("userData");
              if (data) {
                  dispatch(loginSuccess(JSON.parse(data)));
              }
          } catch (error) {
              console.log("Token verification failed", error);
              dispatch(logout());
          } finally {
              setIsVerifying(false);
          }
      };
      
      verifyToken();
      dispatch(fetchItems())
  }, [dispatch]);

  if (isVerifying) {
      return null // Show a loading spinner while verifying
  }
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='items' element={<ItemsPage/>}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/sign-up' element={<SignupForm />}></Route>
        <Route path='/phone' element={<PhoneNumberCard />}></Route>
      </Routes>
    </React.Fragment>
  )
}

export default App
