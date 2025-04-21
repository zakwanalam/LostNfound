import React, { ReactNode } from 'react'

interface NavbarContainerProps{
    children:ReactNode;
    color?:string;
}


function NavbarContainer({children,color='accent'}:NavbarContainerProps) {
    return (
        <div className={` fixed top-0 w-screen z-50 ${color} `}>
            <div className='w-4/5 max-w-screen-xl  mx-auto '>
                {children}
            </div>
        </div>
    )
}

export default NavbarContainer