import React from 'react'
import Navbar from './Navbar'

function Home() {
  return (
   <>
     <div className='flex relative items-center justify-center'>
      <div className='fixed top-0 w-4/5 max-w-screen-xl mx-auto '>
        <Navbar/>
      </div>
     </div>
   </>
  )
}

export default Home