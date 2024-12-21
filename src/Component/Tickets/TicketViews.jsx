import React, { useEffect, useMemo, useState, useCallback } from 'react'
import useStore from "../../Store";
import creationimg from "../../assets/Dashboard/Group 427319994.svg";
import closepopup from "../../assets/Dashboard/Group 442.svg";
import ticketimg from "../../assets/Dashboard/Group 427319997.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAPICallFunction, postAPICallFunction, putAPICallFunction } from "../../ReactQuery/reactQuery";
import { Ticketapis, ticketcategoryapi, ticketsubcategoryapi, Presenturlapi, remarksapi, commentapi, feedbackapi } from "../../Api/Api";
import { useNavigate } from 'react-router-dom';
import PhoneCall from "../../assets/Dashboard/Union (2).svg"
import trackingimg from "../../assets/Dashboard/Vector (15).svg"
import notifyimg from "../../assets/Dashboard/Group 427320010.svg"
import thumbsup from "../../assets/Dashboard/plastic-hand-with-thumb-up 1.svg"
import { toast } from "react-toastify";

import images from "../../assets/Dashboard/Union (4).svg";
import downloadimg from "../../assets/Dashboard/Union (5).svg";
import downarrow from "../../assets/Dashboard/Vector (17).svg";

import badimg from "../../assets/Dashboard/Union (8).svg";
import Acceptanceimg from "../../assets/Dashboard/Union (7).svg";
import goodimg from "../../assets/Dashboard/Vector (16).svg";
import excellentimg from "../../assets/Dashboard/Union (6).svg";



import badactiveimg from "../../assets/Dashboard/Vector (18).svg";
import Acceptanceactiveimg from "../../assets/Dashboard/Vector (19).svg";
import goodactiveimg from "../../assets/Dashboard/Union (9).svg";
import excellentactiveimg from "../../assets/Dashboard/Union (10).svg"; /// active




const TicketViews = () => {
    const {
        ToggleBars,
        setToggleBars,
        setIsLoading,
        ownerDetails,
        TicketIDS
    } = useStore();
    const Navigate = useNavigate();
    const [remarksdatastate, setremarksdata] = useState([]);
    const [ticketretrieve, setticketretrieve] = useState([]);
    const [Commentpopup, setcommetpoup] = useState(false);
    const [thankcontent, setthankcontent] = useState(false)
    const progressWidth = "67%"; // Adjust progress dynamically
    const timelineBackground = "#e0e8f0"; // Background color
    const progressColor = "#20588f"; // Progress color
    const [CommentPart, setcommentpart] = useState({
        status: "2",
        feedbacks: "",
        client_user_id: "",
        ticket_id: TicketIDS,
        satisfaction:"",
    });
    const [ticketStatus , setTicketStatus] = useState({
        status:""
    })

    const events = [
        { date: "2021-01-01", title: "Event 1", description: "Description for event 1" },
        { date: "2021-06-01", title: "Event 2", description: "Description for event 2" },
        { date: "2022-01-01", title: "Event 3", description: "Description for event 3" },
        { date: "2022-06-01", title: "Event 4", description: "Description for event 4" },
        { date: "2023-01-01", title: "Event 5", description: "Description for event 5" },


        { date: "2022-06-01", title: "Event 4", description: "Description for event 4" },
        { date: "2023-01-01", title: "Event 5", description: "Description for event 5" },

    ];

    const [selectedEvent, setSelectedEvent] = useState(0);

    const handleClick = (index) => {
        setSelectedEvent(index);
    };



    const [activeFeedback, setActiveFeedback] = useState("excellent"); // Default active state

    // Feedback options data
    const feedbackOptions = [
        { id: "bad", label: "Bad", imgSrc: activeFeedback =="bad"? badactiveimg :  badimg },
        { id: "acceptable", label: "Acceptable", imgSrc:activeFeedback =="acceptable"? Acceptanceactiveimg:  Acceptanceimg },
        { id: "good", label: "Good", imgSrc: activeFeedback =="good"? goodactiveimg:  goodimg },
        { id: "excellent", label: "Excellent", imgSrc:activeFeedback =="excellent"?  excellentimg :  excellentactiveimg},
    ];



  
   


    const handleFeedbackClick = (id) => {
        setActiveFeedback(id);
        setcommentpart({
            ...CommentPart,
            satisfaction:id
        })
        // HandleFeedbackpopup(id == "excellent" ? "close" : "open");
    };
    console.log(CommentPart ,"activeFeedback");

    const timelineValues = [
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        // add more values
    ];




    const { data: ticketretrieveRefeshing, refetch: ticketreteievRefetchcalls } = useQuery({
        queryKey: ["ticketretrieveparameters"],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: Ticketapis,
                id: TicketIDS,
            });
            setIsLoading(false);
            return response;
        },
    });


    const FeedbacksTicketsmutation = useMutation({
        mutationFn: async () => {

            setIsLoading(true);

            const response = await postAPICallFunction({
                url: feedbackapi,
                data: CommentPart,
            });
            setIsLoading(false);
            TicketStatusChanges.mutate()

            return response;
        },
        onSuccess: (response) => {
            toast.success(response.data.message);

            setIsLoading(false);
            setcommetpoup(false)
            setthankcontent(true);

        },
        onError: () => {
            setIsLoading(false);
        }
    });

    const Status = {
        status: ticketStatus.status
    }

    const TicketStatusChanges = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            return await putAPICallFunction({
                url: Ticketapis,
                data: Status,
                id: TicketIDS
            });
        },
        onSuccess: (data) => {
            setIsLoading(false);
        },
        onError: () => {
            setIsLoading(false);
        },
    });



    const remarkspayloads = {
        ticket: TicketIDS,
    }

    const { data: remarksdata, refetch: gettheremarksdara } = useQuery({
        queryKey: ["gettheremarksdata"],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: remarksapi,
                payload: remarkspayloads,
            });
            setIsLoading(false);
            return response;
        },
    });

    useEffect(() => {
        if (remarksdata) {
            setremarksdata(remarksdata.data)
        }
    }, [remarksdata])


    useEffect(() => {
        if (ticketretrieveRefeshing) {
            setticketretrieve(ticketretrieveRefeshing.data.ticket_data)
            setcommentpart({
                ...CommentPart,
                client_user_id: ticketretrieveRefeshing?.data?.client_user_id?.id
            })

        }
    }, [ticketretrieveRefeshing])



    const HandletheComments = () => {

        if (CommentPart.name != "") {
            FeedbacksTicketsmutation.mutate();
        }
        else {
            toast.info("Please enter the valid details");

        }
    }
    const capitalizeEachWord = (str) => {
        return str
            .split(' ') // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join the words back into a string
    };


    const HandleFeedbackpopup = (parm) => {
        // setcommetpoup(true);
        if (parm == "Reopen") {
            setcommentpart({
                ...CommentPart,
                status: "1"
            })
            setTicketStatus({
                ...ticketStatus,
                status:"4"  
            })
        }
        else if (parm == "close") {
            setcommentpart({
                ...CommentPart,
                status: "0"
            })
            setTicketStatus({
                ...ticketStatus,
                status:"3"  
            })

        }
    }
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = dateObject.getFullYear();

        return `${day} / ${month} / ${year}`;
    };


    const formatDatefeed = (dateString) => {
        const dateObject = new Date(dateString);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = dateObject.getFullYear();

        return `${day}/${month}/${year}`;
    };


    const getFileExtension = (url) => {
        const parts = url.split('.');
        return parts.length > 1 ? parts.pop() : ''; // Return the file extension, or an empty string if none
    };



    const handleDownloadDocuments = (documents) => {
        if (!documents || documents.length === 0) {
            alert("No documents to download.");
            return;
        }

        documents.forEach((doc, index) => {
            try {
                console.log(doc, "documents");

                // Ensure doc is an object and has a valid URL
                if (doc && doc && doc.startsWith("https")) {
                    const link = document.createElement('a');
                    link.href = doc;  // Use the URL from doc.url
                    link.download = doc.name || `document_${index + 1}`;  // Specify the file name

                    document.body.appendChild(link);  // Temporarily add the link to the DOM
                    link.click();  // Trigger the download
                    document.body.removeChild(link);  // Remove the link after the download
                } else {
                    console.warn(`Document at index ${index} does not have a valid URL.`);
                }
            } catch (error) {
                console.error(`Error processing document at index ${index}:`, error);
            }
        });

        // documents.forEach((doc, index) => {
        //     try {
        //         console.log(doc, "documents");

        //         if (doc && doc.startsWith("https")) { // Ensure the URL is valid
        //             const link = document.createElement('a');
        //             link.href = doc.url;  // Use the URL from `doc.url`
        //             link.download = doc.name || `document_${index + 1}`; // Specify the file name
        //             document.body.appendChild(link);  // Temporarily add the link to the DOM
        //             link.click();  // Trigger the download
        //             document.body.removeChild(link);  // Remove the link after the download
        //         } else {
        //             console.warn(`Document at index ${index} does not have a valid URL.`);
        //         }
        //     } catch (error) {
        //         console.error(`Error processing document at index ${index}:`, error);
        //     }
        // });

        // documents.forEach((doc, index) => {
        //     try {
        //         console.log(documents, "documents");

        //         // Ensure the URL starts with 'https'
        //         if (doc && doc.startsWith("https")) {
        //             const link = document.createElement('a');
        //             link.href = doc;  // Use the URL from `doc.url`

        //             // Extract file extension and set it for the download
        //             const extension = getFileExtension(doc);
        //             link.download =  `document_${index + 1}.${extension}`; // Append the extension to the filename

        //             document.body.appendChild(link);  // Temporarily add the link to the DOM
        //             link.click();  // Trigger the download
        //             document.body.removeChild(link);  // Remove the link after the download
        //         } else {
        //             console.warn(`Document at index ${index} does not have a valid URL starting with https.`);
        //         }
        //     } catch (error) {
        //         console.error(`Error processing document at index ${index}:`, error);
        //     }
        // });

    }



    return (
        <>

            <div className='PopupCreations'>

                <div className='InnerPopup' >
                    <div className='PopupContent PopupContentviews'>
                        <div className='row PopupRows'>
                            <div className='col-5 PopupRowsinnerleft'>
                                <div className='Popupcreatetickets'>
                                    <h3>Ticket Details</h3>

                                    <div className='InnerImages'>
                                        <img src={creationimg} alt="" />
                                    </div>
                                </div>

                            </div>
                            <div className='col-7 RightSideparts'>
                                <div className='col-12 ClosePopupDesigns ClosePopupDesignsviews'>
                                    <div
                                        onClick={() => {
                                            Navigate("/tickets")
                                        }}
                                        className='CloseIcons'

                                    >
                                        <img src={closepopup} alt="" />
                                    </div>

                                </div>

                                <div className='row InnerFormsDetails InnerFormsDetailsviews'>




                                    <div className="card shadow-sm p-3 mb-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-2 text-center">
                                                <div className="icon-container  text-white rounded-circle p-3">
                                                    <img src={ticketimg} />
                                                </div>
                                            </div>
                                            <div className="col-md-10 Ticketingrecords">

                                                <p className="mb-1 heaerspara">
                                                    <p className='ticketheader Headerticket'>Ticket ID</p> {ticketretrieve?.ticket_number} <br />
                                                </p>

                                                <p className="mb-1 heaerspara">
                                                    <p className='ticketheader Headerticket'>Created Date</p> {ticketretrieve?.created_at ? formatDate(ticketretrieve?.created_at) : "--"} <br />
                                                </p>
                                                <p className="mb-1 heaerspara">
                                                    <p className='ticketheader Headerticket'>Resolved Date:</p> {ticketretrieve?.closing_date ? formatDate(ticketretrieve?.closing_date) : "--"}
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <span>
                                                        <p className='ticketheader Headerticket'>Status:</p>{" "}
                                                        <span className="text-success">{ticketretrieve.status == 0 ? "Open" : ticketretrieve.status == 1 ? "In progress" : ticketretrieve.status == 2 ? "Completed" : ticketretrieve.status == 3 ? "Close" : "Reopen"}</span>
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="accordion" id="accordionExample">
                                        <div class="card  ">
                                            <div class="card-header HeaderCardsticketdetails" id="headingOne"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                <h5 class="mb-0">
                                                    <button class="btn btn-link d-flex justify-content-between align-items-center"
                                                        type="button">
                                                        Ticket Details
                                                        <span class="icon">
                                                            <img src={downarrow} className='rotate-icon' />
                                                        </span>
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="card-body">

                                                    <div className="card shadow-sm p-3 mb-3">


                                                        <p className="mb-1 cardpara heaerspara">
                                                            <span className="ticketheader ticketheadercards">Issue Category</span>
                                                            {ticketretrieve?.sub_category_id?.issue_category_id?.name
                                                                ? capitalizeEachWord(ticketretrieve?.sub_category_id?.issue_category_id?.name.toLowerCase())
                                                                : "--"}
                                                        </p>
                                                        <p className="mb-1 cardpara heaerspara">
                                                            <span className="ticketheader ticketheadercards">Sub Category</span>
                                                            {ticketretrieve?.sub_category_id?.name
                                                                ? capitalizeEachWord(ticketretrieve?.sub_category_id?.name.toLowerCase())
                                                                : "---"}
                                                        </p>
                                                        <p className="mb-1 cardpara">
                                                            <span className="ticketheader ticketheadercards">Description</span>
                                                            <span className="ticketsinners">{ticketretrieve?.remarks || "No description available"}</span>
                                                        </p>


                                                        <p className="mb-1 cardpara">
                                                            <span className='ticketheader ticketheadercards '>Attachment</span>
                                                            <p className='FileAttachments'>
                                                                <span className="Attachmentslist">     <img src={images} /> {ticketretrieve?.documents?.length} File Attached</span>
                                                                <span className='Downloadimgoptions'>Download <img src={downloadimg}
                                                                    onClick={() => handleDownloadDocuments(ticketretrieve?.documents)}
                                                                /></span>
                                                            </p>


                                                        </p>

                                                        <p className="mb-1 cardpara">
                                                            <span className='ticketheader ticketheadercards '>Assigner</span>
                                                            <p className='FileAttachments'>
                                                                {ticketretrieve?.client_user_id != undefined &&
                                                                    ticketretrieve?.client_user_id != null &&
                                                                    ticketretrieve?.client_user_id?.l1_user.map((item) => {

                                                                        return (
                                                                            <span className="Attachmentslist">{capitalizeEachWord(item.first_name.toLowerCase())}</span>
                                                                        )
                                                                    })}
                                                            </p>
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="timeline-container mt-4">
                                        <div className="timeline">
                                            {events.map((event, index) => (
                                                <div key={index} className="timeline-event">
                                                    <div
                                                        className={`timeline-circle ${selectedEvent === index ? "active" : ""}`}
                                                        onClick={() => handleClick(index)}
                                                    />

                                                    {index < events.length - 1 && <div className={`timeline-line ${selectedEvent === index && index !== 0  ? "active" : ""}`} />}
                                                </div>
                                            ))}
                                        </div>
                                        {selectedEvent !== null && (
                                            <div className="event-details">
                                                <h3>{events[selectedEvent].date}</h3>
                                                <p>{events[selectedEvent].description}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Issue Assigner Section */}
                                    {/* <div className='issueAssigner'>
                                        <div className='Issues'>
                                            <p>Issue assigner</p>
                                        </div>
                                        <div className="card shadow-sm p-2 phonecallcard">

                                            {ticketretrieve?.client_user_id?.l1_user.map((item) => {


                                                <div className="d-flex align-items-center phonetrackingsytems">
                                                    <div className="assigner-avatar me-3">
                                                        <img
                                                            src="https://via.placeholder.com/60"
                                                            className="rounded-circle"
                                                            alt="Assigner"
                                                            width="60"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6>
                                                            <span className='ticketheader '> {item.first_name}</span>
                                                        </h6>
                                                        <small className="text-muted mb-0 heaerspara">{ticketretrieve?.uds_user_id?.user_role?.role}</small>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <button className="btn btn-light  ">
                                                            <div className='Phoneimg'  >
                                                                <img src={PhoneCall} />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>

                                            })}

                                        </div>
                                    </div> */}


                                    {/* timeline process */}
                                    {/* <div className='issueAssigner'>
                                        <div className='Issues'>
                                            <p>Tracking</p>
                                        </div>
                                        <div className="card shadow-sm p-2 phonecallcard  trackersrecords mb-2">
                                            <div className="d-flex align-items-center Trackinginnersdatas">
                                                <div className="TimeLineRecords me-3">
                                                    50%
                                                </div>
                                                <div>
                                                    <h6>Completed, Your Ticket has been update in progress, Please wait.
                                                    </h6>
                                                </div>
                                                <div className="ms-auto">
                                                    <button className="btn daymeteres  ">
                                                        0 day left

                                                    </button>
                                                </div>
                                            </div>

                                            <div
                                                className="timeline-container"
                                                style={{
                                                    backgroundColor: timelineBackground,
                                                    position: "relative", // To position the marker relative to this container
                                                    height: "10px",
                                                    borderRadius: "5px",
                                                    marginBottom: "12px"
                                                }}
                                            >
                                                <div
                                                    className="timeline-progress"
                                                    style={{
                                                        width: progressWidth,
                                                        backgroundColor: progressColor,
                                                        height: "100%",
                                                        borderRadius: "5px 0 0 5px"
                                                    }}
                                                ></div>
                                                <div
                                                    className="timeline-marker"
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: progressWidth, // Align to the end of progress width
                                                        transform: "translate(-50%, -50%)", // Center marker properly
                                                        // backgroundColor: progressColor,
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        borderRadius: "50%",
                                                        padding: "5px 10px",
                                                        border: `2px solid hsla(207, 61%, 33%, 1)`,
                                                        background: "#fff",
                                                        width: "35px",
                                                        height: "35px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <img src={trackingimg} style={{ width: "18px", height: "18px" }} />
                                                </div>
                                            </div>

                                            <div className='respondcards'>
                                                <div className='respondpara'>
                                                    <p>
                                                        Lorem Ipsum has been the industry's standard dummy text?
                                                    </p>
                                                    <button>Respond</button>
                                                </div>


                                            </div>

                                        </div>
                                    </div> */}


                                    {/* Remarks Section */}
                                    <div className="card RemarksCards shadow-sm p-3 mb-3">
                                        <h6>
                                            <span className='ticketheader RemarksHeaders' >Remarks:</span>
                                        </h6>
                                        {remarksdatastate.length > 0 ?
                                            <>
                                                <p className='Remarkspara'>
                                                    {remarksdatastate.map((item) => {
                                                        return (
                                                            <>

                                                                <div>

                                                                    <p className="Commentslist">  <span>{item.name}</span> <span>{formatDatefeed(item.created_at)}</span> </p>
                                                                    <br />
                                                                    <div className='remarksdocumentsimg'>
                                                                        {item?.documents != undefined && item?.documents.length > 0 && item?.documents.map((doc) => {
                                                                            return (
                                                                                <div className='InnerImagesdoc ' >
                                                                                    <img src={doc} onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        window.open(doc)
                                                                                    }} />
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>


                                                                </div>
                                                            </>
                                                        )
                                                    })}



                                                </p>
                                            </>
                                            : <>--</>}
                                    </div>
                                    {ticketretrieve?.status == 1 || ticketretrieve?.status == 2 || ticketretrieve?.status == 4 ?
                                        <div className="card Satisfactioncard shadow-sm p-3 mb-3">
                                            <p className="mb-1 cardpara heaerspara">
                                                <span className='ticketheader ticketheadercards'>Satisfaction</span>
                                            </p>

                                            <p className="mb-1 cardpara heaerspara">
                                                Your feedback brings us great satisfaction and inspires us to improve further!
                                            </p>

                                            <div className="feedback">
                                                {feedbackOptions.map((option) => (
                                                    <div
                                                        key={option.id}
                                                        className={`feedback-option ${activeFeedback === option.id ? "active" : ""}`}
                                                        onClick={() => handleFeedbackClick(option.id)}
                                                    >
                                                        <img src={option.imgSrc} alt={option.label} />
                                                        <span>{option.label}</span>
                                                    </div>
                                                ))}
                                            </div>


                                            <div className='FeedbackField FeedbackFieldstatifications'>
                                                <label className='form-label'>{`Please submit your feedback on it.`}</label>

                                                <textarea value={CommentPart.name} onChange={(e) => {
                                                    setcommentpart({
                                                        ...CommentPart,
                                                        feedbacks: e.target.value
                                                    })
                                                }}>

                                                </textarea>
                                            </div>

                                            <div className='col-6  Createtickets'>
                                            <button
                                                    className='OpenButtons'
                                                    onClick={() => {
                                                        HandleFeedbackpopup("Reopen")
                                                        HandletheComments();
                                                    }}
                                                >Reopen</button>
                                                <button
                                                    className='OpenButtons'
                                                    onClick={() => {
                                                        HandleFeedbackpopup("close")
                                                        HandletheComments();
                                                    }}
                                                >Close</button>

                                            </div>


                                            {/* <div className="Documentslist">
                                            {remarksdatastate.length > 0 ?
                                                <>
                                                    {remarksdatastate.map((item) => {
                                                        return (
                                                            <>

                                                                {item?.documents != undefined && item?.documents.length > 0 && item?.documents.map((doc) => {
                                                                    return (
                                                                        <div className='InnerImagesdoc ' >
                                                                            <img src={doc} onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                window.open(doc)
                                                                            }} />
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>
                                                        )
                                                    })}



                                                </>
                                                : <></>}
                                        </div> */}



                                        </div>
                                        : ""}

                                    {/* <div className="card shadow-sm p-3 mb-3">
                                        <p className="mb-1 cardpara heaerspara">
                                            <span className='ticketheader ticketheadercards'>Documents</span>
                                        </p>


                                        <div className="Documentslist">
                                            {remarksdatastate.length > 0 ?
                                                <>
                                                    {remarksdatastate.map((item) => {
                                                        return (
                                                            <>

                                                                {item?.documents != undefined && item?.documents.length > 0 && item?.documents.map((doc) => {
                                                                    return (
                                                                        <div className='InnerImagesdoc ' >
                                                                            <img src={doc} onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                window.open(doc)
                                                                            }} />
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>
                                                        )
                                                    })}



                                                </>
                                                : <>--</>}
                                        </div>



                                    </div> */}

                                    {/* Satisfactory Resolution Section */}
                                    {/* <div className="text-center">
                                        <p>
                                            <strong>Is this resolution satisfactory for you?</strong>
                                        </p>
                                        <button className="btn btn-outline-danger me-3">No</button>
                                        <button className="btn btn-outline-success">Yes</button>
                                    </div> */}
                                    {/* 
                                    {ticketretrieve?.status == 1 ? (
                                        <div className='col-6  Createtickets'>
                                            <p>
                                                <strong>Is this resolution satisfactory for you?</strong>
                                            </p>
                                            <button onClick={() => {
                                                HandleFeedbackpopup("open")
                                            }} >No</button>
                                            <button
                                                className='OpenButtons'
                                                onClick={() => {
                                                    HandleFeedbackpopup("close")
                                                }}
                                            >Yes</button>

                                        </div>
                                    ) : <></>
                                    } */}



                                </div>



                            </div>
                        </div>

                    </div>
                </div>


            </div>
            {Commentpopup && (

                <>
                    <div className='CommentPopup'>
                        <div className='innercommentpopup'>


                            <div className='FormParts'>
                                <div className='innerformscomentpart'>
                                    <div className='Notifyimgs'>
                                        <img src={notifyimg} />
                                    </div>
                                    <div className='closecontent CloseIcons'>
                                        <img src={closepopup} alt="" onClick={() => { setcommetpoup(false) }} />
                                    </div>

                                    <h5 className='pt-3'>{`${CommentPart.status == 2 ? `Confirm Ticket Closure ` : `Sorry for the disappointing remark`}`}</h5>

                                    <div className='FeedbackField'>
                                        <label className='form-label'>{`${CommentPart.status == 2 ? `Enter your reason for closing.` : `Please submit your feedback on it.`}`}</label>

                                        <textarea value={CommentPart.name} onChange={(e) => {
                                            setcommentpart({
                                                ...CommentPart,
                                                name: e.target.value
                                            })
                                        }}>

                                        </textarea>
                                    </div>
                                    <div className='feedbacksubmition'>
                                        <button
                                            onClick={() => {
                                                HandletheComments()
                                            }}
                                        >{CommentPart.status == 2 ? "Close Ticket" : "Submit Feedback"}</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </>

            )}

            {thankcontent && (
                <>
                    <div className='CommentPopup'>
                        <div className='innercommentpopup'>


                            <div className='FormPartsthanks'>
                                <div className='innerformscomentpart'>
                                    <div className='Notifyimgsthumbs'>
                                        <img src={thumbsup} />
                                    </div>
                                    <div className='closecontent CloseIcons'>
                                        <img src={closepopup} alt="" onClick={() => { setthankcontent(false) }} />
                                    </div>

                                    <h5 className='pt-4'>Thank you!</h5>


                                    <div className='FeedbackField'>
                                        <label className='form-label'>

                                            {/* Your Feedback has been Successfully submitted!
                                            <br />
                                            <br />

                                            Please wait, Our Concern will be respond soon. */}
                                            {/* We appreciate you taking the time to share your
                                            <br />
                                            <br /> thoughts. Your feedback helps us improve and
                                            <br />
                                            <br /> ensure better service. */}
                                            We appreciate you taking the time to share your
                                            <br /> thoughts. Your feedback helps us improve and
                                            <br />
                                            ensure better service.
                                            .</label>


                                    </div>
                                    <div className='feedbacksubmition' style={{ bottom: "12px" }}>
                                        <button onClick={() => {
                                            setthankcontent(false);
                                            Navigate("/tickets")
                                        }}>Close</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </>
            )}

        </>


    )
}

export default TicketViews