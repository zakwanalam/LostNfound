import React from 'react'
import Navbar from './Navbar'
import NavbarContainer from './NavbarContainer'

function Home() {
  return (
    <>
      <div className='flex relative items-center justify-center'>
        {/* Navbar Container */}
        <NavbarContainer color='bg-gray-200'>
          <Navbar />
        </NavbarContainer>
      </div>
    </>
  )
}

export default Home