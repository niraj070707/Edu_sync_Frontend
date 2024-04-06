import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchCurrentAdmin } from '../ReusableComponents/Data';
import { useCon } from "../../UserContext";


const AdminProfile = () => {
  // const { Admin } = useCon();

  // console.log("hi",Admin);
  return (
    <div className='flex'>
      <SideBar />
      <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
        <div>
          <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            My Profile
          </h2>
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
      </div>
    </div>
  )
}

export default AdminProfile