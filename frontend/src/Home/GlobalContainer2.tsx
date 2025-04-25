import React, { ReactNode } from 'react'

interface NavbarContainerProps{
    children:ReactNode;
    color?:string;
}


function GlobalContainer2({children}:NavbarContainerProps) {
    return (
        <div className={` w-screen `}>
            <div className='max-w-screen-lg  mx-auto '>
                {children}
            </div>
        </div>
    )
}

export default GlobalContainer2