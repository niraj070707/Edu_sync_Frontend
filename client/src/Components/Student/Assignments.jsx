import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar';
import { FetchCompletedAssignments, FetchIncompletedAssignments    } from '../ReusableComponents/Data';
import TanStackTable from '../ReusableComponents/Table';
import axios from 'axios'
import { storage } from "../ReusableComponents/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
 

const Assignments = () => {

  const [CompletedAssignments, setCompletedAssignments] = useState([]);
  const [assignments, setAssignments] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCompletedAssignments();  
        const data2 =await FetchIncompletedAssignments();
        console.log(data2);
        if (data) {
          setCompletedAssignments(data); 
        }
        if (data2) {
          setAssignments(data2);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData(); 
  }, []);

  const[progresspercent, setProgresspercent] = useState(0);
 
  const handleFileUpload = async (event, assignmentId) => {
     
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(storageRef);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           updateAssignment(assignmentId, downloadURL);
          console.log(downloadURL);
        });
      }
    );
    
  };

  const updateAssignment = async (assignmentId, uploadedDocLink) => { 
    try {
      await axios.put("/updateAssignment", {
        assignmentID: assignmentId,
        uploadLink: uploadedDocLink,
        isCompleted: true, // Set isCompleted to true
      });
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

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

      <div>
        <h1>Incomplete Assignments</h1>
        {assignments.map((assignment) => (
          <div key={assignment._id}>
            <h3>{assignment.problemstatement}</h3>
            <p>Assignment ID: {assignment._id}</p>
            <p>Subject: {assignment.subject}</p>
            <p>Teacher ID: {assignment.teacher_id}</p>
            <p>Uploaded Document Link: {assignment.uploaded_doc_link}</p>
            <form
              onSubmit={(event) => handleFileUpload(event, assignment._id)}
              className="form"
            >
              <input type="file" />
              <button type="submit">Upload</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignments
