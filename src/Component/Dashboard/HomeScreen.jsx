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
import { getAPICallFunction } from "../../ReactQuery/reactQuery";
import { dashboardTicketapis, Ticketapis } from "../../Api/Api";
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "react-tooltip";
import { ShimmerTitle } from "react-shimmer-effects";





const HomeScreen = () => {
    const {
        ToggleBars,
        setToggleBars, setSelectedSideBarTab,
        SetActiveBars,
        ActiveBars,
        ownerDetails, setIsLoading


    } = useStore();
    const [search, setsearch] = useState("");
    const [Dashboarddata, setdashboarddata] = useState([])
    const [data, setdata] = useState([]);
    const Navigate = useNavigate()
    const [activeButton, setActiveButton] = useState(ActiveBars);
    const [TicketDatas, setTicketDatas] = useState([])



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

    // useEffect(() => {
    //     if (DashRefeshing) {
    //         setdashboarddata(DashRefeshing.data);
    //         // settotalpagecount(DashRefeshing.total_count)
    //         setdata(DashRefeshing.data.data)
    //     }

    // }, [DashRefeshing])



    return (
        <>
            <div className={!ToggleBars ? "HomeScreen" : "MainHomeScreen"}>

                <div className='HomeConatiners'>
                    <div className='row MainCards'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Dashbord</h5>
                                    <img src={Notify} alt="" className='Nofiyimages' />
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
                                            <h5>UDS Contact Peoples</h5>
                                            <div className="d-flex Recentcard2contact  gap-3">
                                                {ownerDetails.l1_user != undefined && ownerDetails.l1_user != null && ownerDetails.l1_user.map((item) => {

                                                    return (
                                                        <div className="contact-card d-flex justify-content-between align-items-center">
                                                            <div className='ContactCards' >
                                                                <div className='Contactimg' >
                                                                    <img src={personimg} />
                                                                </div>
                                                                <div className='InnerPhoneContact'>
                                                                    <div>
                                                                        <h6>{item.first_name}</h6>
                                                                        <p className="text-muted mb-0">Security</p>

                                                                    </div>

                                                                    <div className='Phoneimg' data-tooltip-id="hover-tooltip" data-tooltip-content={item.phone_number}
                                                                    //   onClick={() => window.location.href = `tel:${item.phone_number}`}
                                                                    >
                                                                        <img src={PhoneCall} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })}


                                                <div className="contact-card d-flex justify-content-between align-items-center">
                                                    <div className='ContactCards' >
                                                        <div className='Contactimg2' >
                                                            <img src={personimg} />
                                                        </div>
                                                        <div className='InnerPhoneContact'>

                                                            <div>
                                                                <h6>Priya Dharshini S</h6>
                                                                <p className="text-muted mb-0">House Keeping</p>
                                                            </div>

                                                            <div className='Phoneimg' >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="contact-card d-flex justify-content-between align-items-center">
                                                    <div className='ContactCards' >
                                                        <div className='Contactimg2' >
                                                            <img src={personimg} />
                                                        </div>
                                                        <div className='InnerPhoneContact'>

                                                            <div>
                                                                <h6>Priya Dharshini S</h6>
                                                                <p className="text-muted mb-0">House Keeping</p>
                                                            </div>

                                                            <div className='Phoneimg' >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        :

                        <div className="row mt-3 ticket-dashboard">
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
                                                <h2>{Dashboarddata.open_tracking_count}</h2>
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
                                                <h2>{Dashboarddata.inprocess_tracking_count}</h2>
                                            </div>
                                            <h5>In progress Tickets</h5>
                                        </div>
                                    </div>


                                    {/* <div
                                        className={`col-md-4 mb-3 ${ActiveBars === "Completed" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Completed")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData">
                                                <span className="threeCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.close_tracking_count}</h2>
                                            </div>
                                            <h5>Completed Tickets</h5>
                                        </div>
                                    </div>*/}


                                    <div
                                        className={`col-md-4 mb-3 ${ActiveBars === "Reopen" ? "active-card" : ""}`}
                                        onClick={() => handleButtonClick("Reopen")}
                                    >
                                        <div className="card p-3">
                                            <div className="InnercardImgData">
                                                <span className="FrstCard">
                                                    <img src={Cardimgs} alt="Card Icon" />
                                                </span>
                                                <h2>{Dashboarddata.reopen_tracking_count}</h2>
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
                                                <h2>{Dashboarddata.close_tracking_count}</h2>
                                            </div>
                                            <h5>Closed Tickets</h5>
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
                                        <h5>Ticket Statement</h5>
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
                                                Completed
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
                                                Closed
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
                                                                <div className='containsticketprocess mt-3' key={index}>
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
                                                                                item.status == 2 ? "Completed" :
                                                                                    item.status == 3 ? "Close" : "Reopen"}</span>

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

                                                                                <h6>{item?.sub_category_id?.name}</h6>
                                                                                <p className="text-muted DateFields mb-0">Created Date <span>12-04-2024</span></p>
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
                                        <div className="card p-3">
                                            <h5>Recent Ticket Statement</h5>
                                            <div className="d-flex Statement  align-items-center   mt-3">
                                                <div className='Tcketingimglist'>
                                                    <img src={Tickets} />
                                                </div>
                                                <div className='TicketingCardSecuritys'>
                                                    <div>
                                                        <h6>Security is not arriving</h6>
                                                        <p className="text-muted DateFields mb-0">Created Date <span>28-06-2024</span></p>
                                                    </div>
                                                    <button className="btn track-btn">Track Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-5 Recentcard2">
                                        <div className="card ">
                                            <h5>UDS Contact Peoples</h5>
                                            <div className="d-flex Recentcard2contact flex-column gap-3">

                                                <div className="contact-card d-flex justify-content-between align-items-center">
                                                    <div className='ContactCards' >
                                                        <div className='Contactimg' >
                                                            <img src={personimg} />
                                                        </div>
                                                        <div className='InnerPhoneContact'>
                                                            <div>
                                                                <h6>Sakthivel P</h6>
                                                                <p className="text-muted mb-0">Security</p>

                                                            </div>

                                                            <div className='Phoneimg' >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="contact-card d-flex justify-content-between align-items-center">
                                                    <div className='ContactCards' >
                                                        <div className='Contactimg2' >
                                                            <img src={personimg} />
                                                        </div>
                                                        <div className='InnerPhoneContact'>

                                                            <div>
                                                                <h6>Priya Dharshini S</h6>
                                                                <p className="text-muted mb-0">House Keeping</p>
                                                            </div>

                                                            <div className='Phoneimg' >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="contact-card d-flex justify-content-between align-items-center">
                                                    <div className='ContactCards' >
                                                        <div className='Contactimg2' >
                                                            <img src={personimg} />
                                                        </div>
                                                        <div className='InnerPhoneContact'>

                                                            <div>
                                                                <h6>Priya Dharshini S</h6>
                                                                <p className="text-muted mb-0">House Keeping</p>
                                                            </div>

                                                            <div className='Phoneimg' >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="contact-card d-flex justify-content-between align-items-center">
                                                    <div className='ContactCards' >
                                                        <div className='Contactimg2' >
                                                            <img src={personimg} />
                                                        </div>
                                                        <div className='InnerPhoneContact'>

                                                            <div>
                                                                <h6>Priya Dharshini S</h6>
                                                                <p className="text-muted mb-0">House Keeping</p>
                                                            </div>

                                                            <div className='Phoneimg' >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

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