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

async function FetchCurrentAdmin(){
    //yecha route aahe ka nhi mahit nahi backend la 
    const url="/getcurentstudent";
    try{
        const {data}=await axios.get(url);
        return data
    }
    catch(error){
        console.error('Not getting data',error);
        toast.error("Not getting data");
    }
}
async function FetchCurrentStudent(){
    //yecha route aahe ka nhi mahit nahi backend la 
    const url="/getcurrentstudent";
    try{
        const {data}=await axios.get(url);
        return data
    }
    catch(error){
        console.error('Not getting data',error);
        toast.error("Not getting data");
    }
}
async function FetchCurrentTeacher(){
    //yecha route aahe ka nhi mahit nahi backend la 
    const url="/getcurrentteacher";
    try{
        const {data}=await axios.get(url);
        return data
    }
    catch(error){
        console.error('Not getting data',error);
        toast.error("Not getting data");
    }
}


export { FetchTeacherData, FetchStudentData, FetchBatchData, FetchDivisionData,FetchCurrentAdmin,FetchCurrentStudent,FetchCurrentTeacher};
