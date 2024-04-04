import React, { useState, useEffect } from "react";
import { useCon } from "../UserContext";

import Control from "../assets/Control.png";
import Logo from "../assets/Logo.png";
import Chart_fill from "../assets/Chart_fill.png";
import Profile from "../assets/Profile.png";
import Faculty from "../assets/Faculty.png";
import Add from "../assets/Add.png";
import Remove from "../assets/Remove.png";
import List from "../assets/List.png";

const AdminSideBar = () => {
  const [open, setOpen] = useState(true);
  const [Menus, setMenus] = useState([]);

  const { User } = useCon();

  useEffect(() => {
    if (User.user_type === "admin") {
      setMenus([
        { title: "Dashboard", src: Chart_fill },
        { title: "Profile", src: Profile },
        { title: "Our Faculty", src: Faculty, gap: true, readOnly: true },
        { title: "Add Faculty", src: Add },
        { title: "Remove Faculty", src: Remove },
        { title: "Faculty List", src: List },
      ]);
    } else if (User.user_type === "teacher") {
      setMenus([]);
    } else {
      setMenus([
        { title: "Dashboard", src: Chart_fill },
        { title: "Profile", src: Profile },
        { title: "Our Faculty", src: Faculty, gap: true, readOnly: true },
        { title: "Add Faculty", src: Add },
        { title: "Remove Faculty", src: Remove },
        { title: "Faculty List", src: List },
      ]);
    }
  }, []);

  const handleClick = () => {
    // Handle click logic here
  };

  const handleResize = () => {
    setOpen(window.innerWidth >= window.screen.width * 0.7);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${
        open ? "w-full md:w-72" : "w-20"
      } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
    >
      <img
        src={Control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
        alt="Control"
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={Logo}
          className={`cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          } `}
          alt="Logo"
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Admin
        </h1>
      </div>

      <ul className="gap-y-15">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex p-2  text-gray-300 text-lg items-center gap-x-4 ${
              Menu.readOnly
                ? " mt-9 border-b "
                : " rounded-md cursor-pointer hover:bg-light-white "
            } ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
            onClick={() => {
              handleClick();
            }}
          >
            <img src={Menu.src} alt={Menu.title} className=" h-6 " />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
      <ul className="pt-6">
        <li
          className={`flex p-2  text-gray-300 text-lg items-center gap-x-4 `}
          onClick={() => {
            handleClick();
          }}
        >
          <img className=" h-6 " />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
