import React, { ReactNode } from 'react'

interface NavbarContainerProps {
    children: ReactNode;
    color?: string;
}


function NavbarContainer({ children }: NavbarContainerProps) {
    return (
        <div className=" flex px-8 lg:px-0 items-center justify-center bg-blue-400">
            <div className={` w-screen `}>
                <div className='max-w-screen-lg  mx-auto '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default NavbarContainer