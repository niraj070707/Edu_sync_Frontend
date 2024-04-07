import React, { useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const FacultyProfile = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className='text-lg'>
                <main className="p-6 sm:p-10 space-y-6">
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div className="mr-6">
                            <h1 className="text-4xl font-bold text-indigo-800 mb-2"> <AccountCircleRoundedIcon className=" space-x-4 m-2 " fontSize="large" />Profile</h1>
                        </div>
                        <div className="mr-6 ">
                            <LogoutIcon className="cursor-pointer  hover:scale-125 transition-all " fontSize="large" />
                            <h2 className="text-indigo-500 font-semibold text-sm ml-0.5 text-decoration-font: italic ">Username</h2>
                        </div>

                    </div>

                    <div className="flex-grow relative mt-20 max-w-full w-2/3">
                        <div className='top-0 left-0 right-0 bottom-2 p-5 bg-white border w-full'>

                            <div class="border-t border-gray-200">
                                <dl>
                                    <div class="bg-blue-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="font-medium text-blue-700 ">
                                            Username
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {/* {Admin.username}  */}
                                        </dd>
                                    </div>
                                    <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="font-medium text-blue-700">
                                            Email address
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            m.poul@example.com
                                        </dd>
                                    </div>
                                    <div class="bg-blue-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="font-medium text-blue-700">
                                            About
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            To get social media testimonials like these, keep your customers engaged with your social media accounts by posting regularly yourself
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default FacultyProfile
