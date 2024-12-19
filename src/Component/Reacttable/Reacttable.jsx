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
                                        (column.Header === "Created date" || column.Header === "Status" || column.Header === "Priority")
                                            ? column.getSortByToggleProps()
                                            : {}
                                    )}
                                    style={{
                                        cursor: (column.Header === "Created date" || column.Header === "Status" || column.Header === "Priority") ? 'pointer' : 'default'
                                    }}


                                    
        

                                >

                                    {column.render("Header")}

                                    {/* Always display the sorting indicator */}
                                    {(column.Header === "Created date" || column.Header === "Status" || column.Header === "Priority") && (
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

                <tbody {...getTableBodyProps()} className="tbodyReact">
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
                </tbody>
            </table>

        </>

    );
};

export default ReactTable;
