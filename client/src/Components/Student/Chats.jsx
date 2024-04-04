import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCon } from "../../UserContext"; 
import SideBar from "../ReusableComponents/SideBar";

function Chats() {
  const { User } = useCon();
  const { teacherId } = useParams();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch(`/getstudentchats/${teacherId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.chats) {
          setChats(data.chats);
        }
      })
      .catch((error) => console.error("Error fetching chats:", error));
  }, [teacherId]);

  return (
    <div className="flex">
      <SideBar/>
      <div className="flex-1 mt-3">
        <div className="container mx-auto shadow-lg rounded-lg">
          <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">GoingChat</div>
            <div className="w-1/2">
              <input
                type="text"
                name=""
                id=""
                placeholder="search IRL"
                className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
              />
            </div>
            <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
              {User.fname}
            </div>
          </div>

          <div className="flex flex-row justify-between bg-white">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              <div className="border-b-2 py-4 px-2">
                <input
                  type="text"
                  placeholder="search chatting"
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>

              {/* Render fetched chats */}
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
                >
                  <div className="w-1/4">
                    <img
                      src={
                        chat.sender === "teacher"
                          ? chat.teacherImageUrl
                          : chat.studentImageUrl
                      }
                      className="object-cover h-12 w-12 rounded-full"
                      alt="sender"
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-lg font-semibold">{chat.sender}</div>
                    <span className="text-gray-500">{chat.message}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Remaining code unchanged */}
            <div className="w-full px-5 flex flex-col justify-between">
              {/* Remaining code unchanged */}
            </div>

            <div className="w-2/5 border-l-2 px-5">
              {/* Remaining code unchanged */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
