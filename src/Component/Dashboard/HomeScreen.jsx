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
import { dashboardTicketapis } from "../../Api/Api";
import { useNavigate } from 'react-router-dom';



const HomeScreen = () => {
    const {
        ToggleBars,
        setToggleBars, setSelectedSideBarTab

    } = useStore();
    const [search, setsearch] = useState("");
    const [Dashboarddata, setdashboarddata] = useState([])
    const [data, setdata] = useState([]);
    const Navigate = useNavigate()
    const [activeButton, setActiveButton] = useState("All");



    const Ticketsdash = {
        search: search,
        page_size: 20,
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

    const HandleTicketraise = () => {
        Navigate("/tickets/raiseticket");
        setSelectedSideBarTab("Tickets")
    }

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };


    useEffect(() => {
        if (DashRefeshing) {
            setdashboarddata(DashRefeshing.data);
            // settotalpagecount(DashRefeshing.total_count)
            setdata(DashRefeshing.data.data)
        }

    }, [DashRefeshing])



    return (
        <>
            <div className={!ToggleBars ? "HomeScreen" : "MainHomeScreen"}>

                <div className='HomeConatiners'>
                    <div className='row MainCards'>
                        <div className='col'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>Dashbord</h5>
                                    <img src={Notify} alt="" />
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



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        :

                        <div className="row mt-2 ticket-dashboard">
                            {/* Header Stats */}
                            <div className='row Ticketdetails'>
                                <div className=" Innerticket-dashboard text-center">


                                    <div className="col-md-4 CardDesigns mb-3"
                                        onClick={() => handleButtonClick("All")}
                                    >
                                        <div className="card  p-3">
                                            <div className='InnercardImgData InnercardImgDataTicketcreate'>
                                                <span className='FrstCard'><img src={Cardimgs} /></span>
                                                <h2>{Dashboarddata.total_count}</h2>
                                            </div>

                                            <h5>Total Tickets</h5>

                                        </div>
                                    </div>


                                    <div className="col-md-4 CardDesigns mb-3"
                                        onClick={() => handleButtonClick("Open")}
                                    >
                                        <div className="card  p-3">
                                            <div className='InnercardImgData InnercardImgDataTicketcreate'>
                                                <span className='FrstCard'><img src={Cardimgs} /></span>
                                                <h2>{Dashboarddata.open_tracking_count}</h2>
                                            </div>

                                            <h5>Open Tickets</h5>

                                        </div>
                                    </div>
                                    <div className="col-md-4 CardDesigns mb-3"
                                        onClick={() => handleButtonClick("Inprocess")}
                                    >
                                        <div className="card  p-3">
                                            <div className='InnercardImgData'>
                                                <span className='secondCard'><img src={Cardimgs} /></span>
                                                <h2>{Dashboarddata.inprocess_tracking_count}</h2>

                                            </div>
                                            <h5>Inprogress Tickets</h5>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3"
                                        onClick={() => handleButtonClick("Completed")}
                                    >
                                        <div className="card p-3">
                                            <div className='InnercardImgData'>
                                                <span className='fourCard'><img src={Cardimgs} /></span>
                                                <h2>{Dashboarddata.close_tracking_count}</h2>
                                            </div>
                                            <h5>Closed Tickets</h5>
                                        </div>
                                    </div>


                                    <div className="col-md-4 mb-3"
                                        onClick={() => handleButtonClick("Reopen")}
                                    >
                                        <div className="card p-3">
                                            <div className='InnercardImgData'>
                                                <span className='threeCard' ><img src={Cardimgs} /></span>
                                                <h2>{Dashboarddata.reopen_tracking_count}</h2>
                                            </div>
                                            <h5>Reopen Tickets</h5>
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
                                                className={`btn ${activeButton === "All" ? "active" : ""}`}
                                                onClick={() => handleButtonClick("All")}
                                            >
                                                All
                                            </button>
                                            <button
                                                className={`btn ${activeButton === "Open" ? "active" : ""}`}
                                                onClick={() => handleButtonClick("Open")}
                                            >
                                                Open
                                            </button>
                                            <button
                                                className={`btn ${activeButton === "Inprocess" ? "active" : ""}`}
                                                onClick={() => handleButtonClick("Inprocess")}
                                            >
                                                Inprocess
                                            </button>
                                            <button
                                                className={`btn ${activeButton === "Completed" ? "active" : ""}`}
                                                onClick={() => handleButtonClick("Completed")}
                                            >
                                                Closed
                                            </button>
                                            <button
                                                className={`btn ${activeButton === "Reopen" ? "active" : ""}`}
                                                onClick={() => handleButtonClick("Reopen")}
                                            >
                                                Reopened
                                            </button>
                                            {/* <button
                                                className={`btn ${activeButton === "Resolved" ? "active" : ""}`}
                                                onClick={() => handleButtonClick("Resolved")}
                                            >
                                                Resolved
                                            </button> */}
                                        </div>



                                        <div className='ContainsTickets'>

                                            <div className='containsticketprocess'>
                                                <span className="priority-label inprocess">Inprocess</span>

                                                <div className="ticket-item mb-2">

                                                    <div >
                                                        <img src={ApprovedTickets} />
                                                    </div>
                                                    <div className="d-flex ContainsTicketsInner justify-content-between align-items-center">
                                                        <div className='ticket-itemCols'>

                                                            <h6>House keeping is not arriving</h6>
                                                            <p className="text-muted DateFields mb-0">Created Date <span>12-04-2024</span></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='containsticketprocess'>
                                                <span className="priority-label complete">Completed</span>


                                                <div className="ticket-item mb-2">
                                                    <div >
                                                        <img src={cancelTickets} />
                                                    </div>
                                                    <div className="d-flex ContainsTicketsInner justify-content-between align-items-center">
                                                        <div className='ticket-itemCols'>
                                                            <h6>Security not wear uniform</h6>
                                                            <p className="text-muted DateFields mb-0">Created Date <span>12-04-2024</span></p>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='containsticketprocess'>
                                                <span className="priority-label resolve-priority">Resolved</span>


                                                <div className="ticket-item mb-2">
                                                    <div >
                                                        <img src={arrivingTickets} />
                                                    </div>
                                                    <div className="d-flex ContainsTicketsInner justify-content-between align-items-center">

                                                        <div className='ticket-itemCols'>
                                                            <h6>House keeping Attendance Issue</h6>
                                                            <p className="text-muted DateFields mb-0">Created Date <span>12-04-2024</span></p>                                                </div>



                                                    </div>
                                                </div>
                                            </div>

                                            <div className='containsticketprocess'>
                                                <span className="priority-label reopen-priority">Reopen</span>


                                                <div className="ticket-item mb-2">
                                                    <div >
                                                        <img src={arrivingTickets} />
                                                    </div>
                                                    <div className="d-flex ContainsTicketsInner justify-content-between align-items-center">

                                                        <div className='ticket-itemCols'>
                                                            <h6>Lack of attendance for security</h6>
                                                            <p className="text-muted DateFields mb-0">Created Date <span>12-04-2024</span></p>                                                </div>



                                                    </div>
                                                </div>
                                            </div>


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

        </>

    )
}

export default HomeScreen