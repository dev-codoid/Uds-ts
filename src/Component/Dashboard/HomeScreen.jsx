import React, { useState, useEffect } from 'react'
import "../../Style/Pages/HomeScreen.scss"
import useStore from "../../Store";
import Notify from "../../assets/Dashboard/Vector (2).svg"
import createtickets from "../../assets/Dashboard/Group 383.svg"
import closedtickets from "../../assets/Dashboard/Group 384.svg"
import Pendingtickets from "../../assets/Dashboard/Group 385.svg"
import Tickets from "../../assets/Dashboard/Union.svg"
import personimg from "../../assets/Dashboard/Union (1).svg"

import Cardimgs from "../../assets/Dashboard/Group 425.svg"


import ApprovedTickets from "../../assets/Dashboard/Group 418.svg"
import cancelTickets from "../../assets/Dashboard/Group 419.svg"
import arrivingTickets from "../../assets/Dashboard/Group 420.svg"
import PhoneCall from "../../assets/Dashboard/Union (2).svg"

import { useMutation, useQuery } from "@tanstack/react-query";
import { getAPICallFunction, getexportdatas } from "../../ReactQuery/reactQuery";
import { dashboardTicketapis, Leveluserapi, Ticketapis, ticketexportapi } from "../../Api/Api";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import { ShimmerTitle } from "react-shimmer-effects";
import Select from "react-select";






const HomeScreen = () => {
    const {
        ToggleBars,
        setToggleBars, setSelectedSideBarTab,
        SetActiveBars,
        ActiveBars,
        ownerDetails, setIsLoading,
        settheTicketIDs,
        setPriorityValuesstore,
        PrioritValues


    } = useStore();
    const [search, setsearch] = useState("");
    const [Dashboarddata, setdashboarddata] = useState([])
    const [data, setdata] = useState([]);
    const Navigate = useNavigate()
    const [activeButton, setActiveButton] = useState(ActiveBars);
    const [TicketDatas, setTicketDatas] = useState([])
    const [LevelOfuser, setLevelOfusers] = useState([])
    let Priorityoptions = [
        {
            value: "",
            label: "ALL"
        },
        {
            value: "0",
            label: "LOW"
        },
        {
            value: "1",
            label: "MEDIUM"

        },
        {
            value: "2",
            label: "HIGH"

        }
    ]
    const [PriorityValues, setPriorityValues] = useState(PrioritValues?.value)
    const [prioritySelect, setpriorityselect] = useState(PrioritValues)


    const Ticketsdash = {
        // search: search,
        // page_size: 20,
    };
    const { data: DashRefeshing, refetch: ticketDashRefetchcalls } = useQuery({
        queryKey: ["Dashboardparameters", search],
        queryFn: async () => {
            const response = await getAPICallFunction({
                url: dashboardTicketapis,
                payload: Ticketsdash,
            });
            return response;
        },
    });


    const TicketPayloadsPass = {
        search: "",
        page_size: 10,
        page: 1,
        status: activeButton == "All" ? "" : activeButton == "Open" ? "0" : activeButton == "Inprocess" ? "1" :
            activeButton == "Completed" ? "2" : activeButton == "Close" ? "3" : activeButton == "Reopen" && "4",
    };



    const { data: TicketRecordlist, refetch: ticketrecordlisted } = useQuery({
        queryKey: ["TicketDataCalled", ActiveBars],
        queryFn: async () => {
            setIsLoading(true);
            const response = await getAPICallFunction({
                url: Ticketapis,
                payload: TicketPayloadsPass,
            });
            setIsLoading(false);
            return response;
        },
    });


    const { data: LevelofUsers } = useQuery({
        queryKey: ["TicketDataCalled"],
        queryFn: async () => {
            setIsLoading(true);
            const response = await getAPICallFunction({
                url: Leveluserapi,
            });
            setIsLoading(false);
            return response;
        },
    });

    useEffect(() => {
        if (LevelofUsers) {
            setLevelOfusers(LevelofUsers.data);
        }

    }, [LevelofUsers])


    const capitalizeEachWord = (str) => {
        return str
            .split(' ') // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join the words back into a string
    };


    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = dateObject.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const HandleTicketraise = () => {
        Navigate("/tickets/raiseticket");
        setSelectedSideBarTab("Tickets")
    }

    const handleButtonClick = (button) => {
        setActiveButton(button);
        SetActiveBars(button)
    };


    useEffect(() => {
        if (TicketRecordlist) {
            setTicketDatas(TicketRecordlist.data);
        }

    }, [TicketRecordlist])

    useEffect(() => {
        if (DashRefeshing) {
            setdashboarddata(DashRefeshing.data);
            // settotalpagecount(DashRefeshing.total_count)
            setdata([DashRefeshing.data.recent_ticket])
        }

    }, [DashRefeshing])

    const ticketOverViewFunc = (datas) => {
        settheTicketIDs(datas?.id)
        setSelectedSideBarTab("Tickets")
        Navigate("/tickets/ticketview");
    };
    const MoveTotheNextTab = () => {
        Navigate("/tickets");
        setSelectedSideBarTab("Tickets")

    }

    const ExportPayloads = {
        priority: PriorityValues,
        status: activeButton == "All" ? "" : activeButton == "Open" ? "0" : activeButton == "Inprocess" ? "1" :
            activeButton == "Completed" ? "2" : activeButton == "Close" ? "3" : activeButton == "Reopen" && "4",
    }
    const exporttheticketrecords = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            const response = await getexportdatas({
                url: ticketexportapi,
                payload: ExportPayloads, // Use the data passed in mutate
            });
            setIsLoading(false);

            return { ...response };
        },
        onSuccess: (data) => {
            setIsLoading(false);
            console.log(data, "aspodaposdi aospdia sd");
            window.open(data.data)


        },
        onError: (error) => {
            setIsLoading(false);
            console.log(error, "error");

        },
    });



    const HandleTheExports = () => {
        exporttheticketrecords.mutate()


    }
    return (
        <>
            <div className={!ToggleBars ? "HomeScreen" : "MainHomeScreen"}>

                <div className='HomeConatiners'>
                    <div className='row MainCards'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Dashbord</h5>
                                    {/* <img src={Notify} alt="" className='Nofiyimages' /> */}
                                    <div className='row ExportForms' style={{ display:'none'}}>
                                <div
                                    class=" field-div col-sm-2"
                                    style={{ zIndex: "20", marginTop: "-19px" ,display:"none"}}

                                >
                                    <label
                                        class="form-label"

                                    >
                                        Priority
                                    </label>

                                    <Select
                                        className="Selects"
                                        styles={{ position: "relative", top: "60px" }}

                                        placeholder="search"
                                        options={Priorityoptions}
                                        onChange={(e) => {
                                            setpriorityselect(e)
                                            setPriorityValues(e.value)
                                            setPriorityValuesstore(e)
                                        }}
                                        value={prioritySelect}
                                    />
                                </div>



                                <div className="col-sm-2" style={{ paddingTop: "4px" }}>
                                    <button
                                        align="center"
                                        type="button"
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            background: "transparent",
                                            border: "none",
                                            outline: "none"
                                        }}
                                        className="DownloadBTNS"
                                        onClick={(e) => {
                                            HandleTheExports()
                                        }}
                                    >
                                        <a class="dnbtn"></a>
                                    </button>
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {Dashboarddata.total_count == 0 ?
                        <>
                            <div className='row  ticketingdashboardcreates'>
                                <div className='row mt-1 ticket-dashboard_newcreate'>
                                    <div className='WelcomeCards'>
                                        <div className='Welcomecontents'>
                                            <h2>Welcome New User</h2>
                                            <span>
                                                "How can we assist you with your issue or request to
                                                <br />ensure a swift and satisfactory resolution?"

                                            </span>
                                            <button onClick={() => { HandleTicketraise() }}>Raise a Ticket ?</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='TicketCreateDashboards '>
                                    <div className="col-5 Recentcard2">
                                        <div className="card ">
                                            <h5>UDS Contact People</h5>
                                            <div className="d-flex Recentcard2contact  gap-3">
                                                {LevelOfuser != undefined && LevelOfuser.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div className="contact-card d-flex justify-content-between align-items-center">
                                                                <div className='ContactCards' >
                                                                    <div className={index % 2 === 0 ? 'Contactimg' : 'Contactimg2'} >
                                                                        <img src={personimg} />
                                                                    </div>
                                                                    <div className='InnerPhoneContact'>
                                                                        <div>
                                                                            <h6>{capitalizeEachWord(item.first_name.toLowerCase())}</h6>
                                                                            <p className="text-muted mb-0">{capitalizeEachWord(item?.user_role?.role.toLowerCase())}</p>

                                                                        </div>

                                                                        <div className='Phoneimg' data-tooltip-id="hover-tooltip" data-tooltip-content={item.phone_number}>
                                                                            <img src={PhoneCall} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        </>


                                                    )
                                                })}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        :

                        <div className="row mt-3 ticket-dashboard">

                            <div className='row ExportForms' style={{display:"none"}}>
                                <div
                                    class=" field-div col-sm-2"
                                    style={{ zIndex: "20", marginTop: "-19px" }}

                                >
                                    <label
                                        class="form-label"

                                    >
                                        Priority
                                    </label>

                                    <Select
                                        className="Selects"
                                        styles={{ position: "relative", top: "60px" }}

                                        placeholder="search"
                                        options={Priorityoptions}
                                        onChange={(e) => {
                                            setpriorityselect(e)
                                            setPriorityValues(e.value)
                                            setPriorityValuesstore(e)
                                        }}
                                        value={prioritySelect}
                                    />
                                </div>



                                <div className="col-sm-2" style={{ paddingTop: "4px" }}>
                                    <button
                                        align="center"
                                        type="button"
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            background: "transparent",
                                            border: "none",
                                            outline: "none"
                                        }}
                                        className="DownloadBTNS"
                                        onClick={(e) => {
                                            HandleTheExports()
                                        }}
                                    >
                                        <a class="dnbtn"></a>
                                    </button>
                                </div>
                            </div>
                            {/* Header Stats */}
                            <div className='row Ticketdetails'>
                                <div className=" Innerticket-dashboard text-center">

                                    <div
                                        className={`col-md-4 CardDesigns mb-3 ${ActiveBars === "All" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("All")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData InnercardImgDataTicketcreate">
                                                <span className="FrstCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.total_count}</h2>
                                            </div>
                                            <h5>Total Tickets</h5>
                                        </div>
                                    </div>

                                    <div
                                        className={`col-md-4 CardDesigns mb-3 ${ActiveBars === "Open" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Open")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData InnercardImgDataTicketcreate">
                                                <span className="FrstCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.open_ticketing_count}</h2>
                                            </div>
                                            <h5>Open Tickets</h5>
                                        </div>
                                    </div>

                                    <div
                                        className={`col-md-4 CardDesigns mb-3 ${ActiveBars === "Inprocess" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Inprocess")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData">
                                                <span className="secondCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.inprocess_ticketing_count}</h2>
                                            </div>
                                            <h5>In progress Tickets</h5>
                                        </div>
                                    </div>


                                    <div
                                        className={`col-md-4 mb-3 ${ActiveBars === "Completed" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Completed")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData">
                                                <span className="threeCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.completed_ticketing_count}</h2>
                                            </div>
                                            <h5>Review Tickets</h5>
                                        </div>
                                    </div>


                                    <div
                                        className={`col-md-4 mb-3 ${ActiveBars === "Reopen" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Reopen")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData">
                                                <span className="FrstCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.reopen_ticketing_count}</h2>
                                            </div>
                                            <h5>Reopen Tickets</h5>
                                        </div>
                                    </div>




                                    <div
                                        className={`col-md-4 mb-3 ${ActiveBars === "Close" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Close")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData">
                                                <span className="fourCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.close_ticketing_count}</h2>
                                            </div>
                                            <h5>Resolved Tickets</h5>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='row RaisetheTickets '>
                                <div className=' col-12 requestToday'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <p>"How can we assist you with your issue or request to ensure a swift and satisfactory resolution?"</p>

                                        </div>
                                    </div>
                                    <button className="btn raise-ticket-button" onClick={() => HandleTicketraise()} > Raise a Ticket ?</button>

                                </div>
                            </div>


                            {/* Recent Ticket Statement */}
                            <div className="row RecentTicket mt-4">

                                <div className="col RecentcardTickets mb-3">
                                        <div className="card p-3">

                                            <div className='TickerSTatementHeaders'>
                                                <h5>Ticket Statement</h5>
                                                <button onClick={() => MoveTotheNextTab()}>View all</button>
                                            </div>

                                            <p className='Borderpara'></p>
                                            <div className="Groupbtn mb-3">
                                                <button
                                                    className={`btn ${ActiveBars === "All" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("All")}
                                                >
                                                    All
                                                </button>
                                                <button
                                                    className={`btn ${ActiveBars === "Open" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("Open")}
                                                >
                                                    Open
                                                </button>
                                                <button
                                                    className={`btn ${ActiveBars === "Inprocess" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("Inprocess")}
                                                >
                                                    In progress
                                                </button>



                                                <button
                                                    className={`btn ${ActiveBars === "Completed" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("Completed")}
                                                >
                                                    Review
                                                </button>
                                                <button
                                                    className={`btn ${ActiveBars === "Reopen" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("Reopen")}
                                                >
                                                    Reopened
                                                </button>

                                                <button
                                                    className={`btn ${ActiveBars === "Close" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("Close")}
                                                >
                                                    Resolved
                                                </button>
                                                {/* <button
                                                    className={`btn ${ActiveBars === "Resolved" ? "active" : ""}`}
                                                    onClick={() => handleButtonClick("Resolved")}
                                                >
                                                    Resolved
                                                </button> */}
                                            </div>



                                            <div className='ContainsTickets'>

                                                {TicketDatas.length != 0 ?
                                                    <>
                                                        {TicketDatas != undefined && TicketDatas.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <div className='containsticketprocess mt-3' key={index}
                                                                        onClick={() => { ticketOverViewFunc(item) }}                                                                >
                                                                        <span className="priority-label inprocess"

                                                                            style={{
                                                                                background: item.status == 0 ? "hsla(170, 75%, 41%, 1)" : // Open - light background
                                                                                    item.status == 1 ? "hsla(32, 92%, 59%, 1)" : // In Progress - yellow background
                                                                                        item.status == 2 ? "hsla(170, 75%, 41%, 1)" : // Completed - light green background
                                                                                            item.status == 3 ? "hsla(140, 82%, 39%, 1)" : // Close - light green background for Close
                                                                                                "hsla(11, 85%, 54%, 1)", // Default for Reopen - light red background
                                                                                color: "#fff",
                                                                            }}

                                                                        >

                                                                            {item.status == 0 ? "Open" :
                                                                                item.status == 1 ? "In progress" :
                                                                                    item.status == 2 ? "Review" :
                                                                                        item.status == 3 ? "Resolved" : "Reopen"}</span>

                                                                        <div className="ticket-item mb-2">

                                                                            <div >
                                                                                <img src={
                                                                                    item.status == 0 ? cancelTickets :
                                                                                        item.status == 1 ? arrivingTickets :
                                                                                            item.status == 2 ? ApprovedTickets :
                                                                                                item.status == 3 ? ApprovedTickets : arrivingTickets


                                                                                } />
                                                                            </div>
                                                                            <div className="d-flex ContainsTicketsInner justify-content-between align-items-center">
                                                                                <div className='ticket-itemCols'>

                                                                                    <h6>{item?.clientsub_category_id?.name ? capitalizeEachWord(item?.clientsub_category_id?.name.toLowerCase()) : ""}</h6>
                                                                                    <p className="text-muted DateFields mb-0">Created Date <span>{formatDate(item.created_at)}</span></p>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                    : <ShimmerTitle line={2} gap={10} variant="primary" />}




                                            </div>
                                        </div>
                                </div>


                                <div className='col-5 FirstCards'>
                                    <div className="col-5 Recentcard mb-3">
                                        {data != undefined && data.map((item) => {
                                            return (

                                                <>
                                                    <div className="card p-3">
                                                        <h5>Recent Ticket Statement</h5>
                                                        <div className="d-flex Statement  align-items-center   mt-3">
                                                            <div className='Tcketingimglist'>
                                                                <img src={Tickets} />
                                                            </div>
                                                            <div className='TicketingCardSecuritys'>
                                                                <div>
                                                                    <h6>{item.clientsub_category_id?.name ? capitalizeEachWord(item.clientsub_category_id?.name.toLowerCase()) : ""}</h6>
                                                                    <p className="text-muted DateFields mb-0">Created Date <span>{item.created_at ? formatDate(item.created_at) : ""}</span></p>
                                                                </div>
                                                                <button className="btn track-btn" onClick={() => { ticketOverViewFunc(item) }}>Track Now</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}

                                    </div>


                                    <div className="col-5 Recentcard2">
                                        <div className="card ">
                                            <h5>UDS Contact People</h5>
                                            <div className="d-flex Recentcard2contact flex-column gap-3">
                                                {LevelOfuser != undefined && LevelOfuser.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div className="contact-card d-flex justify-content-between align-items-center">
                                                                <div className='ContactCards' >
                                                                    <div className={index % 2 === 0 ? 'Contactimg' : 'Contactimg2'} >
                                                                        <img src={personimg} />
                                                                    </div>
                                                                    <div className='InnerPhoneContact'>
                                                                        <div>
                                                                            <h6>{capitalizeEachWord(item.first_name.toLowerCase())}</h6>
                                                                            <p className="text-muted mb-0">{capitalizeEachWord(item?.user_role?.role.toLowerCase())}</p>

                                                                        </div>

                                                                        <div className='Phoneimg' data-tooltip-id="hover-tooltip" data-tooltip-content={item.phone_number}>
                                                                            <img src={PhoneCall} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        </>


                                                    )
                                                })}




                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    }


                </div>
            </div>
            <Tooltip id="submit-tooltip" place="top" />
            <Tooltip id="hover-tooltip" place="top" />


        </>

    )
}

export default HomeScreen