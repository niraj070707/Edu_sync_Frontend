// TanStack Table
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { USERS } from "../data";
import React, { useEffect, useState } from "react";
import DownloadTableDataInExel from "./DownloadTableDataInExel";
import DebouncedInput from "./DebounceInput";
import Search from "../../assets/Search.png";
import { useNavigate } from "react-router";
import {
  FetchBatchData,
  FetchDivisionData,
  FetchStudentData,
} from "../ReusableComponents/Data";

const TanStackTable = ({ USERS, type }) => {
  //..... ......................................for the sdent list as per need......................
  const [studentData, setStudentData] = useState([]);
  const [divisionData, setDivisionData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [studentWithName, setStudentWithName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchStudentData();
        const data1 = await FetchBatchData();
        const data2 = await FetchDivisionData();
        if (data) {
          setStudentData(data);
        }
        if (data1) {
          setBatchData(data1);
        }
        if (data2) {
          setDivisionData(data2);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if both divisionData and batchData are populated
    if (divisionData.length > 0 && batchData.length > 0) {
      const studentDataWithNames = studentData.map((student) => {
        const division = divisionData.find(
          (division) => division._id === student.division
        );
        const divisionName = division ? division.division : "";

        const batch = batchData.find((batch) => batch._id === student.batch);
        const batchName = batch ? batch.name : "";

        return {
          division: divisionName,
          batch: batchName,
          fname: student.fname,
          lname: student.lname,
          regid: student.regid,
          mobile: student.mobile,
          email: student.email,
        };
      });

      setStudentWithName(studentDataWithNames);
    }
  }, [divisionData, batchData, studentData]);

  // ..........................................................................................

  const columnHelper = createColumnHelper();
  // console.log("type : ", USERS)
  const [data, setData] = useState([]);
  const columns = [
    ...(type === "MySubjects"
      ? [
          columnHelper.accessor("subname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Subject",
          }),
          columnHelper.accessor("teacher_id", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Teacher Name",
          }),
          columnHelper.accessor("marks", {
            cell: (info) => (
              <span className="flex gap-2">
                {info.row.original.marks.map((value, index) => (
                  <React.Fragment key={index}>
                    <div>{value.test_type}</div>
                    <p>:</p>
                    <div>{value.marks}</div>
                  </React.Fragment>
                ))}
              </span>
            ),
            header: "Marks",
          }),
          columnHelper.accessor("attendance", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Attendance",
          }),
          columnHelper.accessor("sub_ticket_approval", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Ticket Approval",
          }),
        ]
      : []),

    ...(type === "MyLabs"
      ? [
          columnHelper.accessor("pracsubname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Lab",
          }),
          columnHelper.accessor("teacher_id", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Teacher Name",
          }),
          columnHelper.accessor("marks", {
            cell: (info) => (
              <span className="flex gap-2">
                {info.row.original.marks.map((value, index) => (
                  <React.Fragment key={index}>
                    <div>{value.test_type}</div>
                    <p>:</p>
                    <div>{value.marks}</div>
                  </React.Fragment>
                ))}
              </span>
            ),
            header: "Marks",
          }),
          columnHelper.accessor("attendance", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Attendance",
          }),
          columnHelper.accessor("sub_ticket_approval", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Ticket Approval",
          }),
        ]
      : []),

    ...(type === "CompletedAssignments"
      ? [
          columnHelper.accessor("subject", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Subject",
          }),
          columnHelper.accessor("problemstatement", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "problemstatement",
          }),
          columnHelper.accessor("uploaded_doc_link", {
            cell: (info) => <button>{info.getValue()}</button>,
            header: "Links",
          }),
        ]
      : []),

    ...(type === "IncompletedAssignments"
      ? [
          columnHelper.accessor("subject", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Subject",
          }),
          columnHelper.accessor("problemstatement", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "problemstatement",
          }),
          columnHelper.accessor("uploaded_doc_link", {
            cell: (info) => (
              <>
                <p>{info.getValue()}</p>
                <form className="form">
                  <input type="file" />
                  <button type="submit">Upload</button>
                </form>
              </>
            ),
            header: "Upload",
          }),
        ]
      : []),

    // division
    ...(type === "division"
      ? [
          columnHelper.accessor("division", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Division",
          }),
          columnHelper.accessor("year", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Year",
          }),
          columnHelper.accessor("CCID", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Name Of CC",
          }),
          // Add a column for displaying batches
          columnHelper.accessor("batches", {
            cell: (info) => (
              <span className="flex gap-2">
                {info.row.original.batches.map((batch) => (
                  <div key={batch}>{batch}</div>
                ))}
              </span>
            ),
            header: "Name of Batches",
          }),
        ]
      : []),

    // batches
    ...(type === "batch"
      ? [
          columnHelper.accessor("name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "name Of Batch",
          }),
          columnHelper.accessor("tgname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Name of Teacher Gaurdian",
          }),
        ]
      : []),

    ...(type === "student"
      ? [
          columnHelper.accessor("regid", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "regId",
          }),
          columnHelper.accessor("fname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "First Name",
          }),
          columnHelper.accessor("lname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Last Name",
          }),
          columnHelper.accessor("email", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "email",
          }),
          columnHelper.accessor("mobile", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Mobile",
          }),
          columnHelper.accessor("division", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Division",
          }),
          columnHelper.accessor("batch", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Batch",
          }),
        ]
      : []),

    // facultyOrStudent
    ...(type === "faculty"
      ? [
          columnHelper.accessor("regid", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "regId",
          }),
          columnHelper.accessor("fname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "First Name",
          }),
          columnHelper.accessor("lname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Last Name",
          }),
          columnHelper.accessor("email", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "email",
          }),
          columnHelper.accessor("mobile", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Mobile",
          }),
        ]
      : []),

    // mentorshipgrps for falcuty
    ...(type === "mymentorshipgrps"
      ? [
          columnHelper.accessor("group_id", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Group ID NO.",
          }),
          columnHelper.accessor("type", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Course Type",
          }),
          // Add a column for displaying batches
          columnHelper.accessor("std_ids", {
            cell: (info) => (
              <span className="flex gap-2">
                {info.row.original.std -
                  ids.map((stdid) => <div key={stdid}>{stdid}</div>)}
              </span>
            ),
            header: "Name of Students",
          }),
          columnHelper.accessor("none", {
            cell: (info) => (
              <button className=" bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center">
                Click to Chat
              </button>
            ),
            header: "Chat",
          }),
        ]
      : []),

    // mydivision for faculty
    ...(type === "mydivisions"
      ? [
          columnHelper.accessor("divID", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Divison Id",
          }),
          columnHelper.accessor("subject", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Subject",
          }),
          columnHelper.accessor("Show Students", {
            cell: (info) => {
              const navigate = useNavigate(); // Initialize navigate function using useNavigate hook
              return (
                <button
                  className="bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                  onClick={() =>
                    navigate("/faculty/listofstudents", {
                      props: { studentData: "", typefor: "" },
                    })
                  }
                >
                  Show Students
                </button>
              );
            },
            header: "Student List",
          }),
        ]
      : []),

    // mybatches for faculty
    ...(type === "mybatches"
      ? [
          columnHelper.accessor("batchID", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Batch Id",
          }),
          columnHelper.accessor("subject", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Subject",
          }),
          columnHelper.accessor("Show Students", {
            cell: (info) => {
              const navigate = useNavigate(); // Initialize navigate function using useNavigate hook
              return (
                <button
                  className="bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                  onClick={() =>
                    navigate("/faculty/listofstudents", {
                      props: { studentData: "", typefor: "" },
                    })
                  }
                >
                  Show Students
                </button>
              );
            },
            header: "Student List",
          }),
        ]
      : []),

    ...(type === "studentinfaculty"
      ? [
          columnHelper.accessor("rollno", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "RollNo",
          }),
          columnHelper.accessor("fname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "First Name",
          }),
          columnHelper.accessor("lname", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Last Name",
          }),
          columnHelper.accessor("division", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Division",
          }),
          columnHelper.accessor("batch", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Batch",
          }),
          columnHelper.accessor("Check", {
            cell: (info) => (
              <button className=" bg-green-100 text-black rounded pl-2 pr-2 justify-center items-center">
                yes/no
              </button>
            ),
            header: "Done/Not Done",
          }),
        ]
      : []),
  ];

  useEffect(() => {
    setData([...USERS]); // Update data whenever USERS changes
  }, [USERS]);

  // console.log("Data : ", data , USERS);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto  fill-gray-100">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <img src={Search} alt="Search" />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
        <DownloadTableDataInExel data={data} fileName={"peoples"} />
      </div>

      <table className="border shadow-sm border-gray-100 w-full text-left">
        <thead className="text-white bg-indigo-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize p-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={` ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                } text-white`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center text-black h-32">
              <td colSpan={12}>No Recoard Found!</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-3">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className={`${
            table.getCanPreviousPage() && "hover:bg-indigo-500 "
          } p-1 border rounded-sm h-10 w-12 flex justify-center items-center text-xl text-white bg-indigo-400 border-gray-400 px-2 disabled:opacity-30 `}
        >
          {"<"}
        </button>

        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className={`${
            table.getCanNextPage() && "hover:bg-indigo-500 "
          } p-1 border rounded-sm h-10 w-12 flex justify-center items-center text-xl text-white bg-indigo-400 border-gray-400 px-2 disabled:opacity-30 `}
        >
          {">"}
        </button>

        <span className="flex items-center gap-1 text-lg text-gray-500">
          <div>Page</div>
          <div>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </span>

        <span className="flex items-center text-lg gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border h-10 border-gray-400 p-1 rounded w-16 bg-transparent"
          />
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-1 h-10 rounded-sm font-medium text-white bg-indigo-400 px-2 hover:bg-indigo-500"
        >
          {[5, 10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
