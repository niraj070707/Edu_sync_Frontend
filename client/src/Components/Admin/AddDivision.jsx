import React, { useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddDivision = () => {
    const [teacherName, setTeacherName] = useState('');
    const [division, setDivision] = useState('');
    const [batchNames, setBatchNames] = useState('');
    const [year, setYear] = useState('');


    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/adddivision";
        // console.log(url);

        // Perform register operation using axios
        try {
            const { data } = await axios.post(url, { division, year, teacherName, batchNames });
            setTeacherName(''); setDivision(''); setYear(''); setBatchNames(''); 
            toast.success("Add Division Successfully");
        } catch (error) {
            console.error('Addition failed', error);
            toast.error("Division Not added");
        }
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow flex flex-col p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Add Division
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <div className='sm:p-10 no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl '>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className=' w-full'>
                                    <label htmlFor="division" className="block text-lg font-medium leading-6 text-gray-900">
                                        Division Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={division}
                                            onChange={ev => setDivision(ev.target.value)}
                                            id="division"
                                            name="division"
                                            type="division"
                                            placeholder='enter first name'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <label htmlFor="year" className="block text-lg font-medium leading-6 text-gray-900">
                                        Year
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={year}
                                            onChange={ev => setYear(ev.target.value)}
                                            id="year"
                                            name="year"
                                            type="year"
                                            placeholder='enter first name'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <label htmlFor="batchNames" className="block text-lg font-medium leading-6 text-gray-900">
                                        BatchNames
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={batchNames}
                                            onChange={ev => setBatchNames(ev.target.value)}
                                            id="batchNames"
                                            name="batchNames"
                                            type="batchNames"
                                            placeholder='enter batchNames no.'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <label htmlFor="teacherName" className="block text-lg font-medium leading-6 text-gray-900">
                                        Class Coordinator Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={teacherName}
                                            onChange={ev => setTeacherName(ev.target.value)}
                                            id="teacherName"
                                            name="teacherName"
                                            type="teacherName"
                                            placeholder='enter teacherName'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddDivision