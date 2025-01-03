import React from "react";
import { useTable, useSortBy } from "react-table"; // Add useSortBy here
import "../../Style/Pages/Table.scss"
const ReactTable = ({ columns, data, MakeCreate, ViewParts }) => {


    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy); // useSortBy here for sorting




    const HandleView = (row) => {

        if (MakeCreate) {
            ViewParts(row);
        }
    };
    console.log(columns, "columns");


    return (
        <>

            <table {...getTableProps()}>
                {/* <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead> */}
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (

                                <th
                                    {...column.getHeaderProps(
                                        // Apply sorting props only to the specified columns
                                        (column.Header == "Ticket Number" || column.Header === "Created Date" || column.Header === "Status" || column.Header === "Priority")
                                            ? column.getSortByToggleProps()
                                            : {}
                                    )}
                                    style={{
                                        cursor: (column.Header == "Ticket Number" || column.Header === "Created Date" || column.Header === "Status" || column.Header === "Priority") ? 'pointer' : 'default'
                                    }}





                                >

                                    {column.render("Header")}

                                    {/* Always display the sorting indicator */}
                                    {(column.Header == "Ticket Number" || column.Header === "Created Date" || column.Header === "Status" || column.Header === "Priority") && (
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽" // If sorted descending, show 🔽
                                                    : " 🔼" // If sorted ascending, show 🔼
                                                : " 🔽"}


                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {/* <tbody {...getTableBodyProps()} className="tbodyReact">
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className={MakeCreate ? "ViewListtable" : ""}
                                onClick={(e) => HandleView(row.original)}>
                                {row.cells.map((cell) => {
                                    return (
                                        <>
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>

                                        </>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody> */}
                {data != undefined &&
                    data.length > 0 ? (
                    <tbody {...getTableBodyProps()} className="tbodyReact">
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={`InnerBodyTR ${MakeCreate ? "ViewListtable" : ""
                                        }`}
                                    onClick={(e) => HandleView(row.original)}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                            <p className="Nodataavaliable">No data available</p>
                        </td>
                    </tr>
                )}

            </table>

        </>

    );
};

export default ReactTable;
