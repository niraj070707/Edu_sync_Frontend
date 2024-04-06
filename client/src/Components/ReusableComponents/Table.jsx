// TanStack Table
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
// import { USERS } from "../data";
import { useEffect, useState } from "react";
import DownloadTableDataInExel from "./DownloadTableDataInExel";
import DebouncedInput from "./DebounceInput";
import Search from "../../assets/Search.png";

const TanStackTable = ({ USERS, type }) => {
    const columnHelper = createColumnHelper();
    // console.log("type : ", USERS)
    const [data, setData] = useState([]);

    const columns = [
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
                                <div key={batch}>
                                    {batch}
                                </div>
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

        // facultyOrStudent
        ...(type === "facultyOrStudent"
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
                            <tr key={row.id} className={` ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} text-white`}>
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
                    className={`${table.getCanPreviousPage() && "hover:bg-indigo-500 "} p-1 border rounded-sm h-10 w-12 flex justify-center items-center text-xl text-white bg-indigo-400 border-gray-400 px-2 disabled:opacity-30 `}
                >
                    {"<"}
                </button>

                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className={`${table.getCanNextPage() && "hover:bg-indigo-500 "} p-1 border rounded-sm h-10 w-12 flex justify-center items-center text-xl text-white bg-indigo-400 border-gray-400 px-2 disabled:opacity-30 `}
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