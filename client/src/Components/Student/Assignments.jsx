import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar';
import { FetchCompletedAssignments, FetchIncompletedAssignments } from '../ReusableComponents/Data';
import TanStackTable from '../ReusableComponents/Table';

const Assignments = () => {

  const [CompletedAssignments, setCompletedAssignments] = useState([]);
  const [IncompletedAssignments, setIncompletedAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCompletedAssignments();
        const data2 = await FetchIncompletedAssignments();
        if (data) {
          setCompletedAssignments(data);
          setIncompletedAssignments(data2);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow p-3 ">
        <div className="flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5">
          <div>
            <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Completed Assignments
            </h2>
          </div>

          <div className="flex-grow relative mt-5 max-w-full w-full ">
            <div className="overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full">
              <TanStackTable
                USERS={CompletedAssignments}
                type={"CompletedAssignments"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-3 ">
        <div className="flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5">
          <div>
            <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Incompleted Assignments
            </h2>
          </div>

          <div className="flex-grow relative mt-5 max-w-full w-full ">
            <div className="overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full">
              <TanStackTable
                USERS={IncompletedAssignments}
                type={"IncompletedAssignments"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments
