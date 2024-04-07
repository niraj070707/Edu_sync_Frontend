import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchCurrentAdmin } from '../ReusableComponents/Data';
import { useCon } from "../../UserContext";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const AdminProfile = () => {
    const { User } = useCon();
    // const { Admin } = useCon();

    // console.log("hi",Admin);
    return (
        <div className='flex'>
            <SideBar />
            <div className="flex-grow relative m-4 max-w-full w-full flex">
                <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-0 rounded-md absolute p-5 bg-gray-100 border flex-grow'>
                    <div className=' text-lg p-6 sm:p-10 space-y-6'>
                            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                                <div className="mr-6">
                                    <h1 className="text-4xl font-bold text-indigo-800 mb-2"> <AccountCircleRoundedIcon className=" space-x-4 m-2 " fontSize="large" />Profile</h1>
                                </div>
                                <button className="mr-6 flex p-1 pr-5 pl-5 hover:bg-indigo-500 bg-indigo-600 rounded-md justify-center items-center gap-2">
                                    <h2 className=" text-white font-semibold text-xl ml-0.5 text-decoration-font: italic ">{User.username}</h2>
                                    <LogoutIcon className=" text-white cursor-pointer  hover:scale-100 transition-all " fontSize="large" />
                                </button>

                            </div>
                            <main className="w-full">
                    <div className="flex-grow relative mt-20 ">
                        <div className='top-0 left-0 right-0 bottom-2 p-5 bg-white border '>

                            <div class="border-t border-gray-200">
                                <dl>
                                    <div class="bg-blue-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="font-medium text-blue-700 ">
                                            Username
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {User.username} 
                                        </dd>
                                    </div>
                                    <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="font-medium text-blue-700">
                                            Email address
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {User.email} 
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
            </div>
            
        </div>
    )
}

export default AdminProfile
