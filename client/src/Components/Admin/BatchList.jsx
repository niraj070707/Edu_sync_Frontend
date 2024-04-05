import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchBatchData } from "../ReusableComponents/Data"
import TanStackTable from '../ReusableComponents/Table'

const BatchList = () => {
    const [batchData, setBatchData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchBatchData();
                if(data){
                    setBatchData(data);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData(); 
    }, []);

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
                    <div>
                        <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Batches
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-5 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full'>
                            <TanStackTable USERS={batchData} type={"batch"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatchList