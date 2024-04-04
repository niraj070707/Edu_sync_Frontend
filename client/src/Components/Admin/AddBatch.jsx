import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FetchTeacherData } from '../ReusableComponents/Data'
import { Menu, Transition } from '@headlessui/react';

const AddBatch = () => {
    const [teacher, setTeacher] = useState('');
    const [batch, setBatch] = useState('');
    const [teacherData, setTeacherData] = useState([]);
    const [currentTeacher, setCurrentTeacher] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchTeacherData();
                setTeacherData(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };
        fetchData();
    }, []);

    console.log(teacher);


    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/addbatches";
        // console.log(url);

        // Perform register operation using axios
        try {
             
            const { data } = await axios.post(url, { name : batch, teacherID : teacher });
            // Redirect to admin dashboard on successful login
            // console.log("Teacher ", data);
            setCurrentTeacher(''); setBatch(''); setTeacher('');
            toast.success("Registration Successfull");
        } catch (error) {
            console.error('Registration failed', error);
            // Handle login failure, show error message to user, etc.
            toast.error("Registration Failed");
        }
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow flex flex-col p-3 '>
                <div className=' flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Add Batch
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <div className='no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-10 '>
                            <form className=" sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl space-y-6 sm:p-10  sm:bg-white" onSubmit={handleSubmit}>
                                <div className=' w-full'>
                                    <label htmlFor="batch" className="block text-lg font-medium leading-6 text-gray-900">
                                        Name of The Batch
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={batch}
                                            onChange={ev => setBatch(ev.target.value)}
                                            id="batch"
                                            name="batch"
                                            type="batch"
                                            placeholder='eg. L1, B1,..'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <label htmlFor="teacher" className="block text-lg font-medium leading-6 text-gray-900 pb-2">
                                        Select Teacher
                                    </label>
                                    <Menu as='div' className='relative text-left flex '>
                                        <Menu.Button className={`${currentTeacher? " text-black ":" text-gray-400 "} flex-grow p-2 pl-3 flex justify-between w-full rounded-md border-0   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                                            {currentTeacher ? currentTeacher :"Select Teacher"}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </Menu.Button>
                                        
                                        <Transition
                                            as={Fragment}
                                            enter='transition ease-out duration-100'
                                            enterFrom='transform opacity-0 scale-95'
                                            enterTo='transform opacity-100 scale-100'
                                            leave='transition ease-in duration-100'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items className='origin-top-left absolute left-0 top-10 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none'>
                                                <div className='py-1'>
                                                    {teacherData.map((teacher, index) => (
                                                        <Menu.Item key={teacher._id}>
                                                            {({ active }) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setTeacher(teacher._id);
                                                                        setCurrentTeacher(`${teacher.regid} ${teacher.fname} ${teacher.lname}`)
                                                                    }}
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100 text-gray-900'
                                                                            : 'text-gray-700',
                                                                        'flex w-full px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    { ` ${teacher.regid} ${teacher.fname} ${teacher.lname}`}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>

                                <button
                                    type="submit"
                                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Batch
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddBatch