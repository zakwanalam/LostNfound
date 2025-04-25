import React, { ReactNode } from 'react'

interface NavbarContainerProps{
    children:ReactNode;
    color?:string;
}


function GlobalContainer({children}:NavbarContainerProps) {
    return (
        <div className={` w-screen `}>
            <div className='max-w-screen-xl  mx-auto '>
                {children}
            </div>
        </div>
    )
}

export default GlobalContainer