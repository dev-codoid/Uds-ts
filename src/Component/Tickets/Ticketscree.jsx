import React, { useEffect, useMemo, useState, useCallback } from 'react'
import useStore from "../../Store";
import ReactTable from '../Reacttable/Reacttable';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAPICallFunction, postAPICallFunction } from "../../ReactQuery/reactQuery";
import { Ticketapis, ticketcategoryapi, ticketsubcategoryapi, Presenturlapi } from "../../Api/Api";
import searchimg from "../../assets/Dashboard/Vector (3).svg";
import high from "../../assets/Dashboard/Group 427319195.svg";
import low from "../../assets/Dashboard/Group 427319197.svg";
import medimum from "../../assets/Dashboard/Group 427319196.svg";
import creationimg from "../../assets/Dashboard/Group 443.svg";
import closepopup from "../../assets/Dashboard/Group 442.svg";
import arrowdrop from "../../assets/Dashboard/Vector (5).svg";
import fileuploads from "../../assets/Dashboard/Vector (6).svg";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import Select from "react-select";
import _, { values } from "lodash";
import backimg from "../../assets/Dashboard/Union (3).svg";
import { useNavigate } from 'react-router-dom';



const Ticketscreen = () => {
    const {
        ToggleBars,
        setToggleBars,
        setIsLoading,
        ownerDetails,
        settheTicketIDs
    } = useStore();
    const [search, setsearch] = useState("")
    const [ticketdatas, setticketdatas] = useState([]);
    const [total_count, settotalpagecount] = useState();
    const [status, setstatus] = useState("");
    const Navigate = useNavigate();
    const [page_size, setpage_size] = useState(10);
    const itemsPerPage = page_size; // Number of items per page
    const totalItems = total_count;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [page, setpage] = useState(1)


    const handleClick = (pageNumber) => {
        const newPageIndex = parseInt(pageNumber, 10);
        console.log(newPageIndex, "newPageIndex");

        setpage(newPageIndex);
    };
    const capitalizeEachWord = (str) => {
        return str
            .split(' ') // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join the words back into a string
    };


    const Ticketspayloads = {
        search: search,
        page_size: page_size,
        page: page,
        status: status,
        clientuser: ownerDetails.id
    };
    console.log(Ticketspayloads, "Ticketspayloads");

    const { data: ticketRefeshing, refetch: ticketRefetchcalls } = useQuery({
        queryKey: ["ticketparameters", search, status, page_size, page],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: Ticketapis,
                payload: Ticketspayloads,
            });
            setIsLoading(false);
            return response;
        },
    });

    useEffect(() => {
        if (ticketRefeshing) {
            setticketdatas(ticketRefeshing.data);
            settotalpagecount(ticketRefeshing.total_count)
        }
    }, [ticketRefeshing])
    const data = useMemo(() => ticketdatas, [ticketdatas]);
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = dateObject.getFullYear();

        return `${day} / ${month} / ${year}`;
    };
    const searchFunction = (e) => {
        debouncedSearch(e.target.value);
    };

    const debouncedSearch = useMemo(
        () =>
            _.debounce((e) => {
                setsearch(e)
            }, 500),
        []
    );
    React.useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const columns = useMemo(
        () => [


            {
                Header: "Ticket Number",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;
                    return (
                        <div className="listTurfImgCell">
                            <p> {data.ticket_number}</p>
                        </div>
                    );
                },
            },


            {
                Header: "Date",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;
                    return (
                        <div className="listTurfImgCell">
                            <p> {formatDate(data.created_at)}</p>
                        </div>
                    );
                },
            },


            {
                Header: "Category",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;
                    return (
                        <div className="listTurfImgCell">
                            <p> {data.sub_category_id?.issue_category_id?.name ?
                                capitalizeEachWord(data.sub_category_id?.issue_category_id?.name.toLowerCase()) :
                                "-"

                            }</p>
                        </div>
                    );
                },
            },
            {
                Header: "Sub Category",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;
                    return (
                        <div className="listTurfImgCell">
                            <p> {data.sub_category_id?.name ?
                                capitalizeEachWord(data.sub_category_id?.name.toLowerCase()) : "-"}</p>
                        </div>
                    );
                },
            },

            {
                Header: "Descriptions",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;
                    return (
                        <div className="listTurfImgCell">
                            <p> {data.remarks ? capitalizeEachWord(data.remarks.toLowerCase()) : "-"}</p>
                        </div>
                    );
                },
            },

            {
                Header: "Status",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;
                    return (
                        <div className="listTurfImgCell">

                            <>
                                <button className='Button'
                                    style={{
                                        background: data.status == 0 ?
                                            "#FDEDE9" : data.status == 2 ? "#E7F8ED" : "#FFF8E5",
                                        color: data.status == 0 ?
                                            "#ED4C28" : data.status == 2 ? "#12B749" : "#FFB800",
                                    }}
                                >{data.status == 0 ? "Open" : data.status == 1 ? "Inprogress" : data.status == 2 ? "Closed" : "Reopen"}</button>

                            </>

                        </div>
                    );
                },
            },
            {
                Header: "Priority",
                accessor: "",
                Cell: ({ cell }) => {
                    let data = cell.row.original;


                    return (
                        <span className='PriorityColumns'>
                            <img src=
                                {data.sub_category_id?.Priority === "0"
                                    ? low
                                    : data.sub_category_id?.Priority === "1"
                                        ? medimum
                                        : data.sub_category_id?.Priority === "2"
                                            ? high
                                            : "---"}
                                alt="" />
                        </span>
                    );
                },
            },
        ],
        []
    );
    const handlestatusClick = (value) => {
        setstatus(value);
    };
    const turfOverViewFunc = (data) => {
         
        settheTicketIDs(data.id)
        Navigate("/tickets/ticketview");
    };

    return (
        <>
            <div className={!ToggleBars ? "HomeScreen" : "MainHomeScreen"}>
                <div className='HomeConatiners'>
                    <div className='row MainCards'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Tickets</h5>
                                    {/* <img src={Notify} alt="" /> */}
                                    <button className="btn raise-ticket-button" onClick={() => Navigate("/tickets/raiseticket")}> Raise a Ticket ?</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        <div className="row ReactTableViews">
                            <div className="card">
                                <div className="card-body">
                                    <div className='col'>
                                        <div className='col-12 FilertParts'>
                                            <div className='innerFilertParts'>
                                                <div className="Groupbtn">
                                                    <button
                                                        className={`btn ${status === "" ? "active" : ""}`}
                                                        onClick={() => handlestatusClick("")}
                                                    >
                                                        All
                                                    </button>
                                                    <button
                                                        className={`btn ${status === 0 ? "active" : ""}`}
                                                        onClick={() => handlestatusClick(0)}
                                                    >
                                                        Open Tickets
                                                    </button>
                                                    <button
                                                        className={`btn ${status === 1 ? "active" : ""}`}
                                                        onClick={() => handlestatusClick(1)}
                                                    >
                                                        Review Tickets
                                                    </button>
                                                    <button
                                                        className={`btn ${status === 2 ? "active" : ""}`}
                                                        onClick={() => handlestatusClick(2)}
                                                    >
                                                        Closed Tickets
                                                    </button>
                                                </div>

                                                <div className='searchfields'>
                                                    <div className='searchfills'>
                                                        <img src={searchimg} />
                                                        <input type='text' placeholder='Search' onChange={(e) => { searchFunction(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className='col-12 ClearArear'>
                                            <div>
                                                <button onClick={() => handleClick("")}>Clear All</button>
                                            </div>
                                        </div> */}
                                        <div className="col-12 TableParts">

                                            <ReactTable data={data} columns={columns} 
                                            MakeCreate={true}
                                            ViewParts={(e) => {
                                                turfOverViewFunc(e)
                                            }}
                                            
                                            />

                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                        {total_count > 10 && (
                            <div className="pagination-section">
                                <div className="entries-container">
                                    <p>Show entries</p>
                                    <select
                                        name="entries"
                                        value={page_size}
                                        onChange={(e) => setpage_size(e.target.value)}
                                    >
                                        <option value="10" disabled={total_count < 10}>
                                            10
                                        </option>
                                        <option value="20" disabled={total_count < 20}>
                                            20
                                        </option>
                                        <option value="30" disabled={total_count < 30}>
                                            30
                                        </option>
                                    </select>
                                </div>
                                <section className="pagination-and-goto">
                                    <div className="pagination">
                                        <button
                                            className="prev-next"
                                            onClick={() => handleClick(page === "" ? 1 : page - 1)}
                                            disabled={page === "" || page === 1}
                                        >
                                            {"<"}
                                        </button>

                                        <button
                                            className="page-number"
                                            onClick={() => handleClick(1)}
                                            style={{
                                                // backgroundColor: page === 1 ? "hsla(207, 61%, 33%, 1)" : "#fff",
                                                color: page === 1 ? "hsla(207, 61%, 33%, 1)" : "hsla(207, 61%, 33%, 1)",
                                                border: page === 1 ? "1px solid hsla(207, 61%, 33%, 1)" : "1px solid #ddd",

                                            }}
                                        >
                                            1
                                        </button>

                                        {page !== "" && page > 3 && <span>...</span>}

                                        {Array.from({ length: totalPages - 2 }, (_, index) => {
                                            const pageNo = index + 2;
                                            if (pageNo > page - 2 && pageNo < page + 2) {
                                                return (
                                                    <button
                                                        key={pageNo}
                                                        // className="page-number"
                                                        className={`page-number ${page === pageNo ? "active" : ""}`}

                                                        onClick={() => handleClick(pageNo)}
                                                        style={{
                                                            border: page != pageNo ? "1px solid hsla(207, 61%, 33%, 1)" : "1px solid gray",

                                                            // backgroundColor: page === pageNo ? "#7ed957" : "#1e1e21",
                                                        }}
                                                    >
                                                        {pageNo}
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })}

                                        {page !== "" && page < totalPages - 1 && <span>...</span>}

                                        {totalPages > 1 && (
                                            <button
                                                // className="page-number"
                                                onClick={() => handleClick(totalPages)}
                                                className={`page-number ${page === totalPages ? "active" : ""}`}

                                                style={{

                                                    border: page != totalPages ? "1px solid hsla(207, 61%, 33%, 1)" : "1px solid #ffff",
                                                    // color: page === totalPages ? "#ffff" : "hsla(207, 61%, 33%, 1)",
                                                }}
                                            >
                                                {totalPages}
                                            </button>
                                        )}

                                        <button
                                            className="prev-next"
                                            onClick={() => handleClick(page + 1)}
                                            disabled={page === totalPages}
                                        >
                                            {">"}
                                        </button>
                                    </div>
                                </section>
                                <div className="goto-page">
                                    <p>Go to page</p>
                                    <input
                                        type="number"
                                        value={page}
                                        className='no-dropdown'
                                        //                                                             onChange={(e) => {
                                        //                                                                 const value = e.target.value;
                                        //                                                                 const newPage = parseInt(value, 10);
                                        //                                                                 if (!value) {
                                        //                                                                     setpage("");
                                        //                                                                     return;
                                        //                                                                 }

                                        //                                                                 if (newPage > 0 && newPage <= totalPages) {
                                        //                                                                     setpage(newPage);
                                        //                                                                 } else {
                                        //                                                                     toast.error("Invalid Page Number");
                                        //                                                                 }
                                        //                                                             }}
                                        onChange={(e) => {
                                            const value = e.target.value.trim(); // Remove leading/trailing spaces
                                            const newPage = parseInt(value, 10);

                                            console.log(value, "sadvalue", !value);

                                            // if (!value || isNaN(newPage)) { // Ensure input is not empty or invalid
                                            //     setpage(""); // Reset the page value to empty
                                            //     return;
                                            // }

                                            if (newPage > 0 && newPage <= totalPages) {
                                                setpage(newPage); // Set valid page number
                                            } else {
                                                toast.error("Invalid Page Number"); // Show error for invalid page range
                                            }
                                        }}


                                    />
                                </div>

                            </div>
                        )}

                    </>
                </div>

            </div>
        </>
    )
}

export default Ticketscreen