import React from 'react'
import Navbar from './Navbar'
import HeroSection from '@/Home/Hero-Section/HeroSection'
import NavbarContainer from './NavbarContainer'
import GlobalContainer from './GlobalContainer'

function Home() {
  return (
    <>
      <div className="h-screen space-y-4 w-screen">
        {/* Full width navbar container */}
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
        {/* Inner Container: Centers content */}
        <div className="flex max-w-screen-xl mx-auto">
          <GlobalContainer color="">
            <HeroSection />
            <div className="py-100"></div>
          </GlobalContainer>
        </div>
      </div>
    </>
  )
}

export default Home