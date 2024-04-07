import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchDivisionData } from "../ReusableComponents/Data"
import TanStackTable from '../ReusableComponents/Table'
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

const DivisionList = () => {
    const [divisionData, setDivisionData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchDivisionData();
                if(data){
                    setDivisionData(data);
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
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between ">
                        <div className="mr-6">
                            <h1 className="text-4xl font-bold text-indigo-800 mb-2"> Divison List</h1>
                        </div>
                        
                    </div>

                    <div className="flex-grow relative mt-5 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full'>
                            <TanStackTable USERS={divisionData} type={"division"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DivisionList