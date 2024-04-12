import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useCon } from '../../UserContext';


const UpdateMarksAttendence = () => {
    const { User } = useCon();

    return (
        <div className=' flex'>
            <SideBar />
            <div className="flex-grow relative m-4 max-w-full w-full flex">
                <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-0 rounded-md absolute p-5 bg-gray-100 border flex-grow'>
                    <div className=' text-lg'>
                        <main className="p-6 sm:p-10 space-y-6">
                            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                                <div className="mr-6">
                                    <h1 className="text-4xl font-bold text-indigo-800 mb-2"> Upload Marks And Attendence</h1>
                                </div>
                                <button className="mr-6 flex p-1 pr-5 pl-5 hover:bg-indigo-500 bg-indigo-600 rounded-md justify-center items-center gap-2">
                                    <h2 className=" text-white font-semibold text-xl ml-0.5 text-decoration-font: italic ">{User.fname}</h2>
                                    <LogoutIcon className=" text-white cursor-pointer  hover:scale-100 transition-all " fontSize="large" />
                                </button>

                            </div>

                            <div className="h-full relative mt-10 sm:mx-auto sm:w-4/5">
                                <div className='no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-auto flex gap-5 '>
                                    <form className=" sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl space-y-6 sm:p-10  sm:bg-white" >
                                        <div className=' w-full'>
                                            <label htmlFor="subjectfile" className="block text-lg font-medium leading-6 text-gray-900">
                                                Choose Marks in Excel Format <em className='text-sm'>(Sheetname should match with test_type)</em>
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="file"
                                                    name="uploadFile"
                                                    type="file"
                                                    placeholder='Choose the file..'
                                                    required
                                                    className="p-2 pl-3 block w-full rounded-md cursor-pointer border-0  font-bold leading-6 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-indigo-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <button
                                            type="submit"
                                            className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateMarksAttendence
