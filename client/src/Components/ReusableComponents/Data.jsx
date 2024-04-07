import axios from "axios"
import { toast } from "react-toastify";

async function FetchTeacherData() {
    const url = "/getteachers";
    try {
        const {data} = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchStudentData() {
    const url = "/getstudents";
    try {
        const {data} = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchDivisionData() {
    const url = "/getdivision";
    try {
        const {data} = await axios.get(url);
        // console.log("division :" , data);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchBatchData() {
    const url = "/getbatches";
    try {
        const {data} = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchCompletedAssignments() {
  const url = "/getCompleted";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Not getting data", error);
    toast.error("Not getting data");
  }
}
async function FetchIncompletedAssignments() {
  const url = "/getIncomplete";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Not getting data", error);
    toast.error("Not getting data");
  }
}


export {
  FetchTeacherData,
  FetchStudentData,
  FetchBatchData,
  FetchDivisionData,
  FetchCompletedAssignments,
  FetchIncompletedAssignments,
};
