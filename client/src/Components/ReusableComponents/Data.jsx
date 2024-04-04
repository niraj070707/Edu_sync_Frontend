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

export { FetchTeacherData, FetchStudentData };
