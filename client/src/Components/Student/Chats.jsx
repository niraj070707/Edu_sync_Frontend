import React, { useState, useEffect } from "react";
import { useCon } from "../../UserContext";
import SideBar from "../ReusableComponents/SideBar";
import axios from "axios";
import Conversation from "./Conversation";

function Chats() {
  const { User } = useCon();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null); // State to store the active chat ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/student/myChats");
        if (response && response.data) {
          setChats(response.data); // Set the chats state with the fetched data
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle chat item click
  const handleChatItemClick = (chatId) => {
    setActiveChatId(chatId); // Set the clicked chat ID as active
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 mt-3">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">GoingChat</div>
          <div className="w-1/2">
            <input
              type="text"
              placeholder="search IRL"
              className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            {User.fname}
          </div>
        </div>
        <div className="container mx-auto shadow-lg rounded-lg">
          {/* Rest of your UI */}
          <div className="flex flex-row justify-between bg-white">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              {/* Render fetched chats */}
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${
                    activeChatId === chat.teacherId ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleChatItemClick(chat.teacherId)} // Handle click event
                >
                  <div className="w-full">
                    <div className="text-lg font-semibold">
                      {chat.teacherId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Render conversation component for active chat ID */}
            
            {activeChatId && (
              <Conversation
                studentId={User.studentId}
                teacherId={activeChatId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
