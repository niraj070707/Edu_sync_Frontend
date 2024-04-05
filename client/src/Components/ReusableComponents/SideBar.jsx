import React, { useEffect, useRef, useState } from "react";
import {useCon} from "../../UserContext"
import { useNavigate } from "react-router";

import Control from "../../assets/Control.png";
import Logo from "../../assets/Logo.png";
import Chart_fill from "../../assets/Chart_fill.png";
import Profile from "../../assets/Profile.png";
import Faculty from "../../assets/Faculty.png";
import Add from "../../assets/Add.png";
import Remove from "../../assets/Remove.png";
import List from "../../assets/List.png";

import handleAdminClick from "../Admin/FunctionsToHandleClickForAdmin"
import handleStudentClick from "../Student/FunctionsToHandleClickForStudent";

const SideBar = () => {
    const [username, setUsername] = useState("");
    const [open, setOpen] = useState(true);
    const [Menus, setMenus] = useState([]);
    const [lastPartOfUrl, setLastPartOfUrl] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0); // State to store the scroll position
    const scrollContainerRef = useRef(null); // Reference to the scrollable container

    const { User } = useCon();
    const navigate = useNavigate();

    const Map = {
        "dashboard" : "Dashboard",
        "addfaculty" : "Add Faculty",
        "removefaculty" : "Remove Faculty",
        "facultylist" : "Faculty List",
        "adminprofile" : "Profile",
        "studentlist" : "Student List",
        "adddivision" : "Add Division",
        "addbatch" : "Add Batch",
        "batchlist" : "Batch List",
        "divisionlist" : "Division List",
    }

    useEffect(()=>{
        if(User.user_type === "admin"){
            setUsername(User.username);
            setMenus([
                { title: "Dashboard", src: Chart_fill },
                { title: "Profile", src: Profile }, // Corrected src reference
                { title: "Our Faculty", src: Faculty, gap: true, readOnly: true },
                { title: "Add Faculty", src: Add },
                { title: "Remove Faculty", src: Remove },
                { title: "Faculty List", src: List },
                { title: "Batch", src: Faculty, gap: true, readOnly: true },
                { title: "Add Batch", src: Add },
                { title: "Batch List", src: List },
                { title: "Division", src: Faculty, gap: true, readOnly: true },
                { title: "Add Division", src: Add },
                { title: "Division List", src: List },
                { title: "Our Students", src: Faculty, gap: true, readOnly: true },
                { title: "Student List", src: List },
            ]);
        }else if(User.user_type === "teacher"){
            setUsername(User.fname);
            setMenus([

            ]);
        }else{
            setUsername(User.fname);
            setMenus([
              { title: "Dashboard", src: Chart_fill },
              { title: "Profile", src: Profile }, // Corrected src reference
              { title: "Subject List", src: List },
              { title: "Assignment List", src: List },
              { title: "Chats", src: List },
            ]);
        }
    },[])


    const handleClick = (Menu) => {
        localStorage.setItem('scrollPosition', JSON.stringify(scrollContainerRef.current.scrollTop));

        if((User.user_type === "admin") && (!Menu.readOnly)){
            handleAdminClick({Menu, navigate});
        }else if((User.user_type === "student") && (!Menu.readOnly)){
            handleStudentClick({ Menu, navigate });
        }else if((User.user_type === "teacher") && (!Menu.readOnly)){

        }
        
    };

    const handleResize = () => {
        setOpen(window.innerWidth >= window.screen.availWidth * 0.7);
    };
    

    useEffect(() => {
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        setLastPartOfUrl(lastPart);
    }, []);


    useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            setScrollPosition(parseInt(savedScrollPosition, 10));
        }
    
        const handleBeforeUnload = () => {
            localStorage.setItem('scrollPosition', JSON.stringify(scrollContainerRef.current.scrollTop));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollPosition;
        }
    }, [scrollPosition]);

    return (
        <div>
            <div className={`${open ? "w-72" : "w-20"} bg-dark-purple min-h-screen p-5 flex flex-col  pt-8 relative duration-300`}>
                <img
                    src={Control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt="Control"
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={Logo}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"} `}
                        alt="Logo"
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
                        {username && username.charAt(0).toUpperCase() + username.slice(1)}
                    </h1>
                </div>

                <div className=" relative flex-grow mt-2">
                    <ul className="pt-4 absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll no-scrollbar" ref={scrollContainerRef}>
                        {Menus.map((Menu, index) => (
                            <li
                                key={index}
                                className={`flex p-2 text-gray-300 text-lg items-center gap-x-4 ${Menu.readOnly ? " mt-9 border-b " : " rounded-md cursor-pointer hover:bg-light-white "} ${Menu.gap ? "mt-9" : "mt-2"} ${Map[lastPartOfUrl] === Menu.title && "bg-light-white"} `}
                                onClick={(ev) => { 
                                    handleClick(Menu);
                                }}
                            >
                                <img src={Menu.src} alt={Menu.title} className=" h-6 " />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
        
    );
};

export default SideBar;