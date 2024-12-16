import React from "react";
import { useTable } from "react-table";
import "../../Style/Pages/Table.scss"
const ReactTable = ({ columns, data, MakeCreate, ViewParts }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
    const HandleView = (row) => {

        if (MakeCreate) {
            ViewParts(row);
        }
    };

    return (
        <>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
