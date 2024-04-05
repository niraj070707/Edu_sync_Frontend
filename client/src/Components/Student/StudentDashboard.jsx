 
import { React, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Avatar from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import ReplyIcon from "@mui/icons-material/Reply";
import { useNavigate } from "react-router-dom";
import { useCon } from "../../UserContext";
import SideBar from "../ReusableComponents/SideBar";

const StudentDashboard = () => {
  const [open, setOpen] = useState(false);
  const { User } = useCon();
  console.log(User);

  const [value, onChange] = useState(new Date());

  const logout = () => {
    // dispatch({ type: "LOGOUT" });
    // navigate("/login/studentlogin");
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 mt-3">
        <div className="flex-[0.05] flex justify-between items-center mx-5 my-2">
          <div className="flex items-center ">
            <img
              src="https://icon-library.com/images/cms-icon/cms-icon-11.jpg"
              alt=""
              className="h-7"
            />
            {/* <h1 className="font-bold text-blue-600 text-sm">CMS</h1> */}
          </div>
          <h1 className="font-semibold text-black">Welcome</h1>
          <div className="flex items-center space-x-3">
            <h1>
              {User.fname} {User.lname}
            </h1>
            <LogoutIcon
              onClick={logout}
              className="cursor-pointer hover:scale-125 transition-all "
            />
          </div>
        </div>
        {/* /*--------------------------------------*/}
        <div className="space-y-3 space-x-4">
          <div className="flex text-gray-400 items-center space-x-4">
            <HomeIcon className=" space-x-4" />
            <h1>Dashboard</h1>
          </div>
          <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
            <div className="bg-white h-[8rem] rounded-xl shadow-lg grid grid-cols-4 justify-between px-8 items-center space-x-4">
              {/* Your other components */}
              <div className="flex items-center space-x-4 border-r-2">
                <EngineeringIcon
                  className="rounded-full py-2 bg-blue-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Subjects</h1>
                </div>
              </div>

              <div className="flex items-center space-x-4 ">
                <MenuBookIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Year</h1>
                  {User && (
                    <h2 className="flex text-xl font-bold">{User.year}</h2>
                  )}
                </div>
              </div>
            </div>
            {/* Rest of your components */}
            <div className="flex space-x-5">
              <div className="flex flex-col space-y-4 w-2/6">
                <div className="bg-white h-[17rem] rounded-xxl shadow-lg">
                  <Calendar onChange={onChange} value={value} />
                </div>
              </div>
              <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col  pt-3">
                <div className="flex px-3">
                  {open && (
                    <ReplyIcon
                      onClick={() => setOpen(false)}
                      className="cursor-pointer"
                    />
                  )}
                  <h1 className="font-bold text-xl w-full text-center">
                    Notices
                  </h1>
                </div>
                <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
