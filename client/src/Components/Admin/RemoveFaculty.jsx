import React from 'react'
import SideBar from '../SideBar'

const RemoveFaculty = () => {
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Faculties
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-10 absolute p-5 bg-white border w-full'>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveFaculty