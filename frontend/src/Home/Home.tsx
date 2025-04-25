import React from 'react'
import Navbar from './Navbar'
import HeroSection from '@/Home/Hero-Section/HeroSection'
import GlobalContainer2 from './GlobalContainer2'
import GlobalContainer from './GlobalContainer2'

function Home() {
  return (
    <>
      <div className="h-screen space-y-4 w-screen">
        {/* Full width navbar container */}
        <div className=" flex px-8 lg:px-0 items-center justify-center bg-blue-400">
          <GlobalContainer2>
            <Navbar />
          </GlobalContainer2>
        </div>
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