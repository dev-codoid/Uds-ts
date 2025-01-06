import React, { useEffect, useMemo, useState, useCallback } from 'react'
import useStore from "../../Store";
import creationimg from "../../assets/Dashboard/Group 427319994.svg";
import closepopup from "../../assets/Dashboard/Group 442.svg";
import ticketimg from "../../assets/Dashboard/Group 427319997.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAPICallFunction, postAPICallFunction, putAPICallFunction } from "../../ReactQuery/reactQuery";
import { Ticketapis, ticketcategoryapi, ticketsubcategoryapi, Presenturlapi, remarksapi, commentapi, feedbackapi, tickettimeline, Ticketretrieveapis } from "../../Api/Api";
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

import PhoneCallevel from "../../assets/Dashboard/Group 427320000.svg"
import personimg from "../../assets/Dashboard/profile2.png"

import backimg from "../../assets/Dashboard/Union (3).svg";
import downloadimg2 from "../../assets/Dashboard/Group 427320153.svg"
import high from "../../assets/Dashboard/Group 427319195.svg";
import Userim from "../../assets/Dashboard/Layer_1 (2).svg";
import { Tooltip } from "react-tooltip";




const TicketViews = () => {
    const {
        ToggleBars,
        setToggleBars,
        setIsLoading,
        ownerDetails,
        TicketIDS,
        settheThankpopupticketview,
        thanksContentticketview
    } = useStore();
    const Navigate = useNavigate();
    const [remarksdatastate, setremarksdata] = useState([]);
    const [ticketretrieve, setticketretrieve] = useState([]);
    const [Commentpopup, setcommetpoup] = useState(false);
    const [thankcontent, setthankcontent] = useState(thanksContentticketview)
    const progressWidth = "67%"; // Adjust progress dynamically
    const timelineBackground = "#e0e8f0"; // Background color
    const progressColor = "#20588f"; // Progress color
    const [CommentPart, setcommentpart] = useState({
        status: "2",
        feedbacks: "",
        client_user_id: "",
        ticket_id: TicketIDS,
        satisfaction: "excellent",

    });

    const [FeedbackDatas, setFeedbackDatas] = useState()
    const [remarksreopendatas, setremarksreopendata] = useState({

        documents: [],
        name: "",
    })
    const [ticketStatus, setTicketStatus] = useState({
        status: ""
    })
    const [TIckettimelinerecordDetails, setTicketRecordDetails] = useState([]);



    const [selectedEvent, setSelectedEvent] = useState(0);

    const [clientRemarks, setclientremarks] = useState([])
    const handleClick = (index) => {
        setSelectedEvent(index);
    };



    const [activeFeedback, setActiveFeedback] = useState("excellent"); // Default active state

    // Feedback options data
    const feedbackOptions = [
        { id: "bad", label: "Bad", imgSrc: activeFeedback == "bad" ? badactiveimg : badimg },
        { id: "acceptable", label: "Acceptable", imgSrc: activeFeedback == "acceptable" ? Acceptanceactiveimg : Acceptanceimg },
        { id: "good", label: "Good", imgSrc: activeFeedback == "good" ? goodactiveimg : goodimg },
        { id: "excellent", label: "Excellent", imgSrc: activeFeedback == "excellent" ? excellentimg : excellentactiveimg },
    ];


    const [PresentUrls, setPresentUrls] = useState([]);
    const [presenturlInUrl, seturlandfile] = useState([])

    const [croppedFileState, setcroppedFilestatet] = useState([]);
    const [documentnotuploads, setdosumentuploads] = useState(false)

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);


    const handleChange = (file) => {
        setFile(file);
    };

    const [remainingTime, setremainingTime] = useState(1);


    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Filter files based on type and size
        const validFiles = files.filter((file) => {
            const isPhotoOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
            const isUnderSizeLimit = file.size <= 5 * 1024 * 1024; // 5 MB in bytes

            if (!isPhotoOrVideo) {
                toast.error(`Invalid file type: ${file.name}`);
            }
            if (!isUnderSizeLimit && isPhotoOrVideo) {
                toast.error(`File too large: ${file.name} exceeds 5 MB`);
            }

            return isPhotoOrVideo && isUnderSizeLimit;
        });

        if (validFiles.length === 0) {
            return; // Exit if no valid files
        }

        const newFiles = validFiles.map((file) => URL.createObjectURL(file));
        setUploadedFiles((prev) => [...prev, ...newFiles]);
        setdosumentuploads(true);
        setcroppedFilestatet((prev) => [...prev, ...validFiles]);

        const generateRandomNumber = () => {
            return Math.floor(Math.random() * 100000);
        };
        const createPresentData = (file) => {
            const randomNumber = generateRandomNumber();
            const formattedFilename = `ticketing_system/ticket/${file.name}`; // Adjust the filename as needed
            return {
                multiple_files: [
                    {
                        filename: formattedFilename,
                        file_type: file.type,
                    },
                ],
            };
        };

        validFiles.forEach((file) => {
            const presentData = createPresentData(file);
            createPresntUrlMutation.mutate({ filepart: file, responsedatas: presentData }, {
                onSuccess: (response) => {
                    console.log(`Successfully uploaded: ${file.name}`, response);
                },
                onError: (error) => {
                    console.error(`Error uploading: ${file.name}`, error);
                },
            });
        });
    };

    useEffect(() => {
        if (uploadedFiles.length == 0) {
            setdosumentuploads(false)
        }
    }, [uploadedFiles])


    const handleDrop = useCallback((event) => {
        event.preventDefault();

        const droppedFiles = Array.from(event.dataTransfer.files);

        // Filter files based on type and size
        const validFiles = droppedFiles.filter((file) => {
            const isPhotoOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
            const isUnderSizeLimit = file.size <= 5 * 1024 * 1024; // 5 MB in bytes

            if (!isPhotoOrVideo) {
                toast.error(`Invalid file type: ${file.name}`);
            }
            if (!isUnderSizeLimit && isPhotoOrVideo) {
                toast.error(`File too large: ${file.name} exceeds 5 MB`);
            }

            return isPhotoOrVideo && isUnderSizeLimit;
        });

        if (validFiles.length === 0) {
            return; // Exit if no valid files
        }

        validFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Url = reader.result;
                setUploadedFiles((prevFiles) => [...prevFiles, base64Url]);
            };

            reader.readAsDataURL(file);
        });

        if (validFiles.length > 0) {
            setdosumentuploads(true);

            const generateRandomNumber = () => {
                return Math.floor(Math.random() * 100000);
            };

            const createPresentData = (file) => {
                const randomNumber = generateRandomNumber();
                const formattedFilename = `ticketing_system/ticket/${file.name}`; // Adjust the filename as needed
                return {
                    multiple_files: [
                        {
                            filename: formattedFilename,
                            file_type: file.type,
                        },
                    ],
                };
            };

            validFiles.forEach((file) => {
                const presentData = createPresentData(file);
                createPresntUrlMutation.mutate({ filepart: file, responsedatas: presentData }, {
                    onSuccess: (response) => {
                    },
                    onError: (error) => {
                    },
                });
            });
        }
    }, []);



    console.log(activeFeedback, "activeFeedback");



    const handleDragOver = (event) => {

        event.preventDefault();
        event.stopPropagation();

    };

    // Remove uploaded file
    const removeFile = (index) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
        setcroppedFilestatet((prev) => prev.filter((_, i) => i !== index));
        setPresentUrls((prev) => prev.filter((_, i) => i !== index));
        seturlandfile((prev) => prev.filter((_, i) => i !== index));
    };

    const createPresntUrlMutation = useMutation({
        // mutationFn: async (responsedatas) => { // Accepts data passed via mutate
        // mutationFn: async ({ filepart, responsedatas }) => { // Destructure the object
        mutationFn: async ({ filepart, responsedatas }) => {  // Destructure the object

            console.log(filepart, responsedatas, "filepart, responsedatas");

            setIsLoading(true);


            const response = await postAPICallFunction({
                url: Presenturlapi,
                data: responsedatas, // Use the data passed in mutate
            });
            setIsLoading(false);

            return { ...response, responsedatas, filepart };
        },
        onSuccess: (data) => {
            setIsLoading(false);

            const responsedatas = data.responsedatas; // Extract responsedatas
            const filepart = data.filepart


            const uploadedFiles = data.data.data; // Adjust based on actual response structure
            const newUrls = uploadedFiles.map(url => ({
                url: url, // Adjust this based on the actual response
                type: responsedatas.multiple_files[0].file_type,
                putfiles: filepart
            }));

            setPresentUrls(prevUrls => [...prevUrls, ...newUrls]);

            const SendUrl = String(data.data.data).split("?")[0]; // Extract URL up to '?'

            if (SendUrl) {
                seturlandfile(prevUrls => [...prevUrls, SendUrl]); // Add the URL to the array
            }

        },
        onError: (error) => {
            setIsLoading(false);
            console.log(error, "error");

        },
    });


    const uploadFilesMutation = useMutation({
        mutationFn: async (PresentUrls) => {
            return Promise.all(
                PresentUrls.map(async (item, index) => {

                    const response = await fetch(item.url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': item.type,
                            "x-amz-acl": "public-read",
                        },
                        body: item.putfiles,
                    });
                    if (PresentUrls.length == index + 1) {
                        console.log(PresentUrls, "PresentUrls");

                        // setPresentUrls([]); // Clear the URLs on success
                        ReopensetListed.mutate()

                    }

                    // if (!response.ok) {
                    //     throw new Error(`Failed to upload file to ${item.url}, Status: ${response.status}`);
                    // }
                    return { url: item.url, status: 'success' };
                })
            );
        },
        onSuccess: (data) => {
            // setPresentUrls([]); // Clear the URLs on success
        },
        onError: (error) => {
            console.error("Error uploading files:", error);
            toast.error("Failed to upload some files. Please try again.");
        },
    });


    const handleFeedbackClick = (id) => {
        setActiveFeedback(id);
        setcommentpart({
            ...CommentPart,
            satisfaction: id
        })
    };

    const timelineValues = [
        { label: 'January', value: 1 },
        { label: 'February', value: 2 },
        // add more values
    ];
    console.log(TicketIDS, "sdiuasd TicketIDS");




    const { data: ticketretrieveRefeshing, refetch: ticketreteievRefetchcalls } = useQuery({
        queryKey: ["ticketretrieveparameters"],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: Ticketretrieveapis,
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

            return response;
        },
        onSuccess: (response) => {
            toast.success(response.data.message);
            setIsLoading(false);

            TicketStatusChanges.mutate()

            setcommetpoup(false);

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
                url: Ticketretrieveapis,
                data: Status,
                id: TicketIDS
            });
        },
        onSuccess: (data) => {
            setIsLoading(false);
            // ticketreteievRefetchcalls()


            if (ticketStatus.status == 3) {
                setthankcontent(true);

            }
            else {
                Navigate("/tickets")
            }
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
                url: commentapi,
                payload: remarkspayloads,
            });
            setIsLoading(false);
            return response;
        },
    });///comment 


    const { data: remarksretrieve, refetch: gettheremarksdataretrieve } = useQuery({
        queryKey: ["retrievetheremarksdatas"],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: commentapi,
                payload: remarkspayloads,
            });
            setIsLoading(false);
            return response;
        },
    });// remarks retrieve


    useEffect(() => {
        if (remarksretrieve) {


            setclientremarks(remarksretrieve.data);
        }
    }, [remarksretrieve])


    const RemarkspayloadReopen = {
        name: remarksreopendatas.name,
        documents: remarksreopendatas.documents,
        ticket_id: TicketIDS,
        client_user_id: CommentPart.client_user_id,
    }

    const ReopensetListed = useMutation({
        mutationFn: async () => {

            setIsLoading(true);

            const response = await postAPICallFunction({
                url: commentapi,
                data: RemarkspayloadReopen,

            });
            setIsLoading(false);
            return response;
        },
        onSuccess: (response) => {
            toast.success(response.data.message);
            setIsLoading(false);
            setremarksreopendata({
                name: "",
                documents: ""
            });
            TicketStatusChanges.mutate()
            // gettheTimeFetch()
            setUploadedFiles([]);
            setcroppedFilestatet([]);
            setPresentUrls([]);
            seturlandfile([]);
            setcommetpoup(false);




        },
        onError: () => {
            setIsLoading(false);
        }
    });


    const HandlethRemarksfromclient = () => {
        console.log(remarksreopendatas, "remarksreopendatas");


        if (remarksreopendatas.name != ""
            // && documentnotuploads == true
        ) {

            setremarksreopendata(prevState => ({
                ...prevState,
                documents: presenturlInUrl // Assign the new documents list
            }));

            if (documentnotuploads == true) {
                uploadFilesMutation.mutate(PresentUrls)
            }
            else {
                ReopensetListed.mutate()

            }

        }
        else {
            toast.info("Please enter the valid details");

        }


    }
    const tickettimelinepayloads = {
        ticket_id: TicketIDS,
    }


    const { data: ticketdatas, refetch: gettheTimeFetch } = useQuery({
        queryKey: ["getthetickettimelinerecords"],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: tickettimeline,
                payload: tickettimelinepayloads,
            });
            setIsLoading(false);
            return response;
        },
    });


    const ticketfeebbacjretrieve = {
        ticket: TicketIDS,
    }

    const { data: FeedbackRetrieveedata, } = useQuery({
        queryKey: ["gettheFeedbackretrievrecords"],
        queryFn: async () => {
            setIsLoading(true);

            const response = await getAPICallFunction({
                url: feedbackapi,
                payload: ticketfeebbacjretrieve,
            });
            setIsLoading(false);
            return response;
        },
        enabled: ticketretrieve?.status == 3,
    });


    useEffect(() => {
        if (FeedbackRetrieveedata) {
            setFeedbackDatas(FeedbackRetrieveedata?.data[0])
        }
    }, [FeedbackRetrieveedata])

    useEffect(() => {
        if (FeedbackDatas != undefined) {
            setActiveFeedback(FeedbackDatas?.feedbacks);
            setcommentpart({
                ...CommentPart,
                feedbacks: FeedbackDatas?.feedbacks,
                satisfaction: FeedbackDatas?.satisfaction,
                status: FeedbackDatas?.status,
            })
            setActiveFeedback(FeedbackDatas?.satisfaction)

        }
        else {
            setcommentpart({
                ...CommentPart,
                feedbacks: "",
                satisfaction: "excellent",
            })
            setActiveFeedback("excellent")
        }
    }, [FeedbackDatas])
    console.log(FeedbackRetrieveedata, CommentPart, "FeedbackRetrieveedata", FeedbackDatas);

    useEffect(() => {
        if (ticketdatas) {
            setTicketRecordDetails(ticketdatas.data)

        }
    }, [ticketdatas])


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

    console.log(ticketretrieveRefeshing, "ticketretrieveRefeshing", ticketretrieve, TIckettimelinerecordDetails);


    const HandletheComments = () => {

        if (CommentPart.name != "") {
            FeedbacksTicketsmutation.mutate();
        }
        else {
            toast.info("Please enter the valid details");

        }
    }
    // const capitalizeEachWord = (str) => {
    //     return str
    //         .split(' ') // Split the string into an array of words
    //         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    //         .join(' '); // Join the words back into a string
    // };

    const capitalizeEachWord = (str) => {
        return str && typeof str === 'string'
            ? str
                .split(' ') // Split the string into an array of words
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
                .join(' ') // Join the words back into a string
            : ''; // Return an empty string if the input is invalid
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
                status: "4"
            })
            setcommetpoup(true); /// If the client closing the ticket get the remarks from the client 
        }
        else if (parm == "close") {
            setcommentpart({
                ...CommentPart,
                status: "0"
            })
            setTicketStatus({
                ...ticketStatus,
                status: "3"
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



    function handleDownloadDocuments(urls) {
        for (var i = 0, len = urls.length; i < len; i++) {
            //for valid urls tabs will be opened
            console.log(urls, "urls", urls[i]);

            if ((urls[i])) {
                window.open(urls[i], '_blank');
            }
        }
        swal("Note!", "If all URLs were not opened, they would probably be blocked by your browser. Allow popups in this site for this tool to work properly.", "warning");
    }

    const downloadAll = (remarkdocuments) => {
        const allLinks = remarkdocuments;

        if (!allLinks || allLinks.length === 0) {
            alert("No documents available for download.");
            return;
        }

        allLinks.forEach((link, index) => {
            setTimeout(() => {
                window.open(link, "_blank");
            }, index * 500); // Opens a new window every 500ms (adjust as needed)
        });
    };


    // function convertToMinutes(days, hours, minutes) {
    //     return (days * 24 * 60) + (hours * 60) + minutes;
    // }

    // function convertToTimeFormat(totalMinutes) {
    //     const days = Math.floor(totalMinutes / (24 * 60));
    //     totalMinutes -= days * (24 * 60);

    //     const hours = Math.floor(totalMinutes / 60);
    //     totalMinutes -= hours * 60;

    //     const minutes = totalMinutes;
    //     console.log(days, hours, minutes, "days, hours, minutes");


    //     return { days, hours, minutes };
    // }




    // const overdueFunctions = () => {
    //     const createdAt = ticketretrieve?.created_at;
    //     const TAT = ticketretrieve?.client_id?.l1_user_TAT;
    //     const LevelonbeTAT = ticketretrieve?.client_id?.l1_user_TAT
    //     const Levelonbetypes = ticketretrieve?.client_id?.l1_time_type
    //     function formatTime(ms) {
    //         const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    //         const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //         const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    //         return `${days},${hours},${minutes}`;
    //     }


    //     function formatTimelevel(ms) {
    //         const days = Levelonbetypes == 2 ? ms : 0;
    //         const hours = Levelonbetypes == 1 ? ms : 0;
    //         const minutes = Levelonbetypes == 0 ? ms : 0;
    //         return `${days},${hours},${minutes} `;
    //     }


    //     if (createdAt && TAT) {
    //         const createdDate = new Date(createdAt);


    //         const specificDate = new Date(createdAt);

    //         const currentDate = new Date();
    //         const differenceInMilliseconds = specificDate - currentDate;


    //         const diffInSeconds = Math.abs(differenceInMilliseconds) / 1000; // absolute value in seconds
    //         const diffInMinutes = Math.floor(diffInSeconds / 60);            // in minutes
    //         const diffInHours = Math.floor(diffInMinutes / 60);              // in hours
    //         const diffInDays = Math.floor(diffInHours / 24);                 // in days

    //         const remainingHours = diffInHours % 24;                         // remaining hours after extracting days
    //         const remainingMinutes = diffInMinutes % 60;                     // remaining minutes after extracting hours

    //         const timeDifferenceInMs = currentDate - createdDate;




    //         const timeDifferenceFormatted = formatTime(timeDifferenceInMs);



    //         var timeDifferenceLevel = formatTimelevel(LevelonbeTAT);


    //         const period1Minutes = convertToMinutes(diffInDays, remainingHours, remainingMinutes)
    //         const period2Minutes = convertToMinutes(
    //             Levelonbetypes === "2" ? Number(LevelonbeTAT) : 0,
    //             Levelonbetypes === "1" ? Number(LevelonbeTAT) : 0,
    //             Levelonbetypes === "0" ? Number(LevelonbeTAT) : 0
    //         );



    //         const differenceInMinutes = period1Minutes - period2Minutes;


    //         const result = convertToTimeFormat(differenceInMinutes);




    //         setremainingTime(differenceInMinutes);



    //     }
    //     return "";
    // }


    const overdueFunctions = (ticketretrieve) => {
        const convertToMinutes = (days, hours, minutes) => (days * 24 * 60) + (hours * 60) + minutes;
        let differenceInMinutes
        const convertToTimeFormat = (totalMinutes) => {
            const days = Math.floor(totalMinutes / (24 * 60));
            totalMinutes -= days * (24 * 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes - (hours * 60);
            return { days, hours, minutes };
        };

        const formatTime = (ms) => {
            const days = Math.floor(ms / (1000 * 60 * 60 * 24));
            const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
            return { days, hours, minutes };
        };

        const formatTimeLevel = (ms, Levelonbetypes) => {
            return {
                days: Levelonbetypes === "2" ? ms : 0,
                hours: Levelonbetypes === "1" ? ms : 0,
                minutes: Levelonbetypes === "0" ? ms : 0,
            };
        };

        if (ticketretrieve?.created_at && ticketretrieve?.client_id?.l1_user_TAT) {
            const createdDate = new Date(ticketretrieve.created_at);
            const currentDate = new Date();
            const differenceInMs = currentDate - createdDate;

            const timeDifference = formatTime(differenceInMs);

            const LevelonbeTAT = Number(ticketretrieve.client_id.l1_user_TAT);
            const Levelonbetypes = ticketretrieve.client_id.l1_time_type;

            const period1Minutes = convertToMinutes(
                timeDifference.days,
                timeDifference.hours,
                timeDifference.minutes
            );

            const period2Minutes = convertToMinutes(
                Levelonbetypes === "2" ? LevelonbeTAT : 0,
                Levelonbetypes === "1" ? LevelonbeTAT : 0,
                Levelonbetypes === "0" ? LevelonbeTAT : 0
            );

            differenceInMinutes = period1Minutes - period2Minutes;
            const remainingTimevalues = convertToTimeFormat(differenceInMinutes);
            console.log(differenceInMinutes, "differenceInMnutes", remainingTimevalues);


            return `${differenceInMinutes > 0 ?

                "Overdue" :
                `Minutes left ${differenceInMinutes * -1}`}`;
        }
        return `${differenceInMinutes > 0 || isNaN(differenceInMinutes) ?

            "Overdue" :
            `Minutes left ${differenceInMinutes * -1}`}`;
    };





    function extractTimeFromDate(dateString, options = { hour: "2-digit", minute: "2-digit", second: "2-digit" }) {
        return new Date(dateString).toLocaleTimeString("en-US", options);
    }

    console.log(thankcontent, "sdasd thankcontent", thanksContentticketview);

    return (
        <>

            <div className='PopupCreations'>

                <div className='InnerPopup' >
                    <div className='PopupContent PopupContentviews'>
                        <div className='row PopupRows'>
                            <div className='col-5 PopupRowsinnerleft PopupRowsinnerleftviews'>
                                <div className='Popupcreatetickets'>
                                    <h3>Ticket Details</h3>

                                    <div className='InnerImages'>
                                        <img src={creationimg} alt="" />
                                    </div>
                                </div>

                                {ownerDetails.first_name ?
                                    <div className='CreatedBy'>
                                        <div className='CreateBodyofcontent'>
                                            <div className='createrimgs'><img src={Userim} alt="" />
                                            </div>
                                            <div><p>Created by {capitalizeEachWord(ownerDetails.first_name)} </p></div>

                                        </div>
                                    </div>
                                    : null}


                            </div>
                            <div className=' col-7 RightSideparts RightSidepartsViews'>
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


                                <div className='BeforeInnerdTicketviews'>
                                    <div className='row InnerFormsDetails InnerFormsDetailsviews'>



                                        <div className="card   Inner_ticketID_deatils  shadow-sm p-3 mb-3">
                                            <div className="row align-items-center TicketDetailsRecorded">
                                                <div className="col-md-1 text-center">
                                                    <div className="icon-container  text-white rounded-circle p-3">
                                                        <img src={ticketimg} />
                                                    </div>
                                                </div>
                                                <div className="col-md-10 Ticketingrecords">

                                                    <p className="mb-1 heaerspara">
                                                        <p className='ticketheader Headerticket'>Ticket Number</p> {ticketretrieve?.ticket_number} <br />
                                                    </p>

                                                    <p className="mb-1 heaerspara">
                                                        <p className='ticketheader Headerticket'>Created Date</p> {ticketretrieve?.created_at ? formatDate(ticketretrieve?.created_at) : "--"} <br />
                                                    </p>
                                                    <p className="mb-1 heaerspara">
                                                        <p className='ticketheader Headerticket'>Resolved Date</p> {ticketretrieve?.client_closing_at ? formatDate(ticketretrieve?.client_closing_at) : "--"}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <span>
                                                            <p className='ticketheader Headerticket'>Status</p>{" "}
                                                            <span className="text-success">{ticketretrieve.status == 0 ? "Open" : ticketretrieve.status == 1 ? "In progress" : ticketretrieve.status == 2 ? "Review" : ticketretrieve.status == 3 ? "Resolved" : "Reopen"}</span>
                                                        </span>

                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <span>
                                                            <p className='ticketheader Headerticket' >Priority</p>
                                                            <span
                                                                style={{
                                                                    color: ticketretrieve.priority == 0 ? "green" : ticketretrieve.priority == 1 ? "#e4e42e" : ticketretrieve.priority == 2 && "red"
                                                                }} >{ticketretrieve.priority == 0 ? "Low" : ticketretrieve.priority == 1 ? "Medium" : ticketretrieve.priority == 2 && "High"}</span>
                                                        </span>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className='Innerscrollabledesigns'>
                                            <div className='InnerRecentTicketIndetails'>
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

                                                                <div className="card shadow-sm p-3 ">


                                                                    <p className=" cardpara heaerspara">
                                                                        <span className="ticketheader ticketheadercards">Issue Category</span>
                                                                        {ticketretrieve?.clientsub_category_id?.issue_id?.name
                                                                            ? capitalizeEachWord(ticketretrieve?.clientsub_category_id?.issue_id?.name.toLowerCase())
                                                                            : "--"}
                                                                    </p>
                                                                    <p className=" cardpara heaerspara">
                                                                        <span className="ticketheader ticketheadercards">Sub Category</span>
                                                                        {ticketretrieve?.clientsub_category_id?.name
                                                                            ? capitalizeEachWord(ticketretrieve?.clientsub_category_id?.name.toLowerCase())
                                                                            : "---"}
                                                                    </p>
                                                                    <p className=" cardpara">
                                                                        <span className="ticketheader ticketheadercards">Description</span>
                                                                        {ticketretrieve?.remarks || "No description available"}
                                                                        {/* <span className="ticketsinners">{ticketretrieve?.remarks || "No description available"}</span> */}
                                                                    </p>

                                                                    {ticketretrieve?.documents?.length > 0 ?
                                                                        <p className=" cardpara">

                                                                            <>
                                                                                <span className='ticketheader ticketheadercards '>Attachment</span>
                                                                                <p className='FileAttachments'>
                                                                                    <span className="Attachmentslist">
                                                                                        <img src={images} /> {ticketretrieve?.documents?.length} File Attached

                                                                                    </span>
                                                                                </p>
                                                                            </>

                                                                        </p>
                                                                        : null}

                                                                    {ticketretrieve?.status == 3 || ticketretrieve?.status == 4 ? (
                                                                        <p className=" cardpara">
                                                                            <span className='ticketheader ticketheadercards '>Assignee</span>
                                                                            {/* <p className='FileAttachments'> */}
                                                                            <>
                                                                                {ticketretrieve?.l1_users != undefined &&
                                                                                    ticketretrieve?.l1_users != null &&
                                                                                    ticketretrieve?.l1_users?.map((item) => {

                                                                                        return (
                                                                                            // <span className="Attachmentslist">
                                                                                            //     {capitalizeEachWord(ticketretrieve?.l1_users[0].first_name.toLowerCase())}
                                                                                            //     {capitalizeEachWord(ticketretrieve?.l1_users[0].last_name.toLowerCase())}
                                                                                            // </span>
                                                                                            <>
                                                                                                {capitalizeEachWord(ticketretrieve?.l1_users[0].first_name.toLowerCase())}
                                                                                                {capitalizeEachWord(ticketretrieve?.l1_users[0].last_name.toLowerCase())}
                                                                                            </>

                                                                                        )
                                                                                    })}
                                                                            </>
                                                                        </p>
                                                                    ) : null}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {ticketretrieve?.status != 4 && ticketretrieve?.status != 3 && TIckettimelinerecordDetails != undefined ?
                                                    <div className='issueAssigner' style={{ marginTop: "7px" }}>
                                                        <div className='Issues'>
                                                            <p>Assignee</p>
                                                        </div>
                                                        <div className="card shadow-sm p-2 phonecallcard">
                                                            {ticketretrieve?.l1_users != undefined &&
                                                                ticketretrieve?.l1_users != null &&
                                                                ticketretrieve?.l1_users.map((item) => {

                                                                    return (

                                                                        <div className='LeveluserCards'>

                                                                            <div className='InnercardOflevels'>
                                                                                <div className='LevelUserImg'>
                                                                                    <img src={personimg} />
                                                                                </div>

                                                                                <div className='Contactednames'>
                                                                                    <span>
                                                                                        {capitalizeEachWord(ticketretrieve?.l1_users[0].first_name.toLowerCase())}
                                                                                        {capitalizeEachWord(ticketretrieve?.l1_users[0].last_name.toLowerCase())}
                                                                                    </span>
                                                                                    {/* <p>Site Supervisor</p> */}
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <div className='PhoneNumberShow'>
                                                                                    <img src={PhoneCallevel}
                                                                                        data-tooltip-id="my-tooltip" data-tooltip-content={ticketretrieve?.l1_users[0].phone_number ? ticketretrieve?.l1_users[0].phone_number : ""}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                        </div>


                                                                    )
                                                                })}


                                                        </div>
                                                    </div>
                                                    : null}

                                                {TIckettimelinerecordDetails != undefined ?
                                                    <div className='issueAssigner' style={{ marginTop: "7px" }}>
                                                        <div className='Issues'>
                                                            <p>Tracking</p>
                                                        </div>
                                                        <div className="card shadow-sm p-2 phonecallcard">
                                                            <div className='TimeLIneDayLeft'>
                                                                {ticketretrieve?.status != 3 ?
                                                                    <button className='TimelineButtons'>
                                                                        <>
                                                                            {overdueFunctions(ticketretrieve)}
                                                                        </>
                                                                    </button>
                                                                    : null}
                                                            </div>
                                                            <div className="timeline-containers">


                                                                {TIckettimelinerecordDetails && Object.keys(TIckettimelinerecordDetails).map((key, index) => {
                                                                    const item = TIckettimelinerecordDetails[key]; // Get the status object (e.g., open, inprogress, etc.)
                                                                    const getStatusText = (statusObj, statusKey) => {
                                                                        if (statusObj) {
                                                                            return (
                                                                                <>
                                                                                    <span>
                                                                                        {statusObj.created_date
                                                                                            ? `${new Date(statusObj.created_date).toLocaleDateString("en-GB", {
                                                                                                day: "2-digit",
                                                                                                month: "short",
                                                                                                year: "numeric",
                                                                                            }).replace(",", "")}`
                                                                                            : " "}
                                                                                    </span>
                                                                                </>
                                                                            );
                                                                        }

                                                                    };


                                                                    return (

                                                                        <React.Fragment key={index}>
                                                                            <div className={`timeline-item ${item?.created_date ? "active" : "NotactiveInBars"}`}>
                                                                                <div className={`InnerTimelines ${item?.created_date ? "active" : ""}`}>
                                                                                    <div className="dot"></div>
                                                                                    <span>
                                                                                        {/* {key == "completed" ? "Review" : key == "close" ? "Resolved" : capitalizeEachWord(key)} */}
                                                                                        {item?.status != null &&
                                                                                            capitalizeEachWord(item?.status)}


                                                                                    </span>
                                                                                </div>
                                                                                <div className={`timeline-line ${item?.created_date ? "active" : ""}`}></div>

                                                                                <p className='CreatedDateList'>
                                                                                    <span>{getStatusText(item, key)}</span>

                                                                                    <span>{item.created_date ? extractTimeFromDate(item.created_date) : ""}</span>
                                                                                </p>
                                                                            </div>
                                                                        </React.Fragment>

                                                                    );
                                                                })}








                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}


                                                <div className="card RemarksCards shadow-sm p-3 mb-3">
                                                    <h6>
                                                        <span className='ticketheader RemarksHeaders' >Remarks </span>
                                                    </h6>
                                                    {remarksdatastate.length > 0 ?
                                                        <>
                                                            <p className='Remarkspara'>
                                                                {remarksdatastate.map((item, index) => {

                                                                    return (
                                                                        <>

                                                                            <div key={index} style={{
                                                                                display: "flex",
                                                                                flexDirection: "column"
                                                                                , gap: "5px"
                                                                            }}>

                                                                                <p className="Commentslist">  <span>{capitalizeEachWord(item.name)}</span> <span>{formatDatefeed(item.created_at)}</span> </p>

                                                                                {remarksdatastate[index]?.documents.length > 0 ?
                                                                                    <p className='FileAttachments'
                                                                                        style={{ width: "100%" }}>
                                                                                        <span className="Attachmentslist">     <img src={images} /> {remarksdatastate[index]?.documents.length} File Attached</span>
                                                                                        <span className='Downloadimgoptions'>Download <img src={downloadimg}


                                                                                            onClick={() => downloadAll(remarksdatastate[index]?.documents)}

                                                                                        /></span>
                                                                                    </p>

                                                                                    : null}

                                                                            </div>
                                                                        </>
                                                                    )
                                                                })}



                                                            </p>
                                                        </>
                                                        : <>--</>}
                                                </div>

                                                {/* {clientRemarks != undefined && clientRemarks != null && clientRemarks.length > 0 ?
<div className="card RemarksCards shadow-sm p-3 mb-3">
    <h6>
        <span className='ticketheader RemarksHeaders' >Client Remarks </span>
    </h6>
    {clientRemarks.length > 0 ?
        <>
            <p className='Remarkspara'>
                {clientRemarks.map((item, index) => {

                    return (
                        <>

                            <div key={index} style={{
                                display: "flex",
                                flexDirection: "column"
                                , gap: "5px"
                            }}>

                                <p className="Commentslist">  <span>{item.name}</span> <span>{formatDatefeed(item.created_at)}</span> </p>

                                {clientRemarks[index]?.documents.length > 0 ?
                                    <p className='FileAttachments'
                                        style={{ width: "100%" }}>
                                        <span className="Attachmentslist">     <img src={images} /> {clientRemarks[index]?.documents.length} File Attached</span>
                                        <span className='Downloadimgoptions'>Download <img src={downloadimg}

                                            onClick={() => downloadAll(clientRemarks[index]?.documents)}

                                        /></span>
                                    </p>

                                    : null}

                            </div>
                        </>
                    )
                })}



            </p>
        </>
        : <>--</>}
</div>
: null } */}



                                                {ticketretrieve?.status == 2 || ticketretrieve?.status == 3 ?
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
                                                                    className={`feedback-option ${activeFeedback === option.id ? "active"
                                                                        : FeedbackDatas != undefined && FeedbackDatas?.id ? "disabledthefiled "
                                                                            : ""}`}
                                                                    onClick={() => {
                                                                        if (FeedbackDatas != undefined && FeedbackDatas?.id) {

                                                                        }
                                                                        else {
                                                                            handleFeedbackClick(option.id)
                                                                        }

                                                                    }}
                                                                >
                                                                    <img src={option.imgSrc} alt={option.label} />
                                                                    <span>{option.label}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>


                                                        <div className='FeedbackField FeedbackFieldstatifications'>
                                                            <label className='form-label labelstart'>Please submit your feedback on it.</label>
                                                            <textarea value={CommentPart.feedbacks}
                                                                className={`${FeedbackDatas?.id ? "disabledthefiled" : ""}`}
                                                                disabled={FeedbackDatas?.id ? true : false}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;

                                                                    setcommentpart({
                                                                        ...CommentPart,
                                                                        feedbacks: inputValue.charAt(0).toUpperCase() + inputValue.slice(1),

                                                                    })
                                                                }}>

                                                            </textarea>
                                                        </div>



                                                    </div>
                                                    : ""}


                                            </div>

                                            {ticketretrieve?.status != 3 ?

                                                <>
                                                    {ticketretrieve?.status == 2 || ticketretrieve?.status == 3 ?

                                                        <div className='col-6   Createticketsviewed' style={{ marginTop: "41px !important" }}>
                                                            <button
                                                                className='OpenButtons'
                                                                onClick={() => {
                                                                    HandleFeedbackpopup("Reopen")
                                                                    // HandletheComments();
                                                                }}
                                                            >Reopen</button>
                                                            <button
                                                                className='OpenButtons'
                                                                onClick={() => {
                                                                    if (CommentPart.feedbacks == "") {
                                                                        toast.info("Please enter the valid details");
                                                                    }
                                                                    else {
                                                                        HandleFeedbackpopup("close")
                                                                        HandletheComments();
                                                                    }
                                                                }}
                                                            >Submit</button>
                                                        </div>
                                                        : null}
                                                </>
                                                : null}
                                        </div>
                                    </div>


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
                                        <img src={closepopup} alt="" onClick={() => {
                                            setUploadedFiles([]);
                                            setcroppedFilestatet([]);
                                            setPresentUrls([]);
                                            seturlandfile([]);
                                            setremarksreopendata({
                                                name: "",
                                                documents: ""
                                            });
                                            setcommetpoup(false);


                                        }} />
                                    </div>

                                    <h5 className='pt-3'>{`${ticketStatus.status == 4 ? `Confirm Reopening ` : `Confirm Ticket closure`}`}</h5>

                                    <div className='RemarksForms'>

                                        <div className='FeedbackField  remarksInnerbox'>
                                            <label className='form-label labelstart'>{`${ticketStatus.status == 3 ? `Enter your reason for closing.` : `Please submit your feedback on it.`}`}</label>

                                            <textarea value={remarksreopendatas.name} onChange={(e) => {
                                                const inputValue = e.target.value;
                                                setremarksreopendata({
                                                    ...remarksreopendatas,
                                                    name: inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
                                                })
                                            }}>

                                            </textarea>
                                        </div>



                                        <div className="FeedbackField DocumentUploads remarksInnerbox">
                                            <label className="form-label LabelRemove" >
                                                Documents Upload
                                            </label>
                                            <div
                                                className="form-control InnerControls"

                                                onDrop={handleDrop}
                                                onDragOver={handleDragOver}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}

                                                style={{
                                                    borderRadius: "10px",
                                                    textAlign: "center",
                                                    backgroundColor: isDragging ? "hsla(203, 49%, 81%, 0.25)" : "transparent", // Change background color
                                                    transition: "background-color 0.3s ease", // Smooth transition

                                                }}
                                            >
                                                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
                                                    {PresentUrls.map((file, index) => {

                                                        let displayImg;
                                                        if (file.type === "image/png" || file.type === "image/jpeg") {
                                                            displayImg = high; // Replace with your gallery image variable
                                                        } else if (file.type === "application/pdf") {
                                                            displayImg = thumbsup; // Replace with your PDF icon variable
                                                        } else if (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                                                            displayImg = notifyimg; // Replace with your Excel icon variable
                                                        } else {
                                                            displayImg = thumbsup; // Replace with a default image/icon if none match
                                                        }
                                                        return (
                                                            <>

                                                                <div key={index} style={{
                                                                    position: "relative",
                                                                    width: "38px",
                                                                    height: "38px",
                                                                    borderRadius: "8px",
                                                                }}>
                                                                    <img
                                                                        src={displayImg}
                                                                        alt={`Uploaded File ${index + 1}`}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                            borderRadius: "8px",
                                                                            border: "1px solid #ddd",
                                                                        }}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className=" btn-danger btn-sm DeleteImages"

                                                                        onClick={() => removeFile(index)}
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )
                                                    })}

                                                    {PresentUrls.length == 0 && (
                                                        <div className='InnerImages d-flex flex-wrap align-items-center  justify-content-center' >
                                                            <img src={backimg} />
                                                        </div>
                                                    )}
                                                </div>



                                                <p className="mt-3 " >
                                                    Drag your files here to upload or{" "}
                                                    <label className='Droplabel'
                                                        htmlFor="fileUploadInput"
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        Browse file
                                                    </label>
                                                    <input
                                                        id="fileUploadInput"
                                                        type="file"
                                                        style={{ display: "none" }} // Hidden input
                                                        onChange={handleFileChange} // Handles file selection
                                                        multiple // Allows multiple file selection
                                                    />
                                                </p>

                                            </div>
                                        </div>


                                    </div>



                                    <div className='feedbacksubmition'>
                                        <button
                                            onClick={() => {
                                                HandlethRemarksfromclient()
                                            }}
                                        >{CommentPart.status == 2 ? "Close Ticket" : "Reopen"}</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </>

            )}

            {thankcontent && (
                <>
                    <div className='CommentPopup CommentPopupthanks'>
                        <div className='innercommentpopup'>


                            <div className={`FormPartsthanks ${activeFeedback == "good" || activeFeedback == "excellent" ? "FormPartsthankspopthanksdesigs" : "FormPartsthankspopupTicketingview"} `} >
                                <div className='innerformscomentpart'>
                                    <div className='Notifyimgsthumbs'>
                                        <img src={thumbsup} />
                                    </div>
                                    <div className='closecontent CloseIcons'>
                                        <img src={closepopup} alt="" onClick={(e) => {
                                            {
                                                settheThankpopupticketview(false);
                                                setthankcontent(false);
                                            }
                                        }} />
                                    </div>

                                    <h5 className='pt-4'>{

                                        activeFeedback == "excellent" || activeFeedback == "good" ?
                                            "Thank you!"
                                            : "Feedback Received"}
                                    </h5>


                                    <div className='FeedbackField'>
                                        {activeFeedback == "excellent" || activeFeedback == "good" ?
                                            <label className='form-label'>

                                                We appreciate you taking the time to share your feedback.</label>
                                            :

                                            <label className='form-label'>
                                                Thank you for bringing this to our attention
                                                <br />

                                            </label>

                                        }


                                    </div>
                                    <div className='feedbacksubmition' style={{ bottom: "12px" }}>
                                        <button onClick={(e) => {
                                            settheThankpopupticketview(false)
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

            <Tooltip id="my-tooltip" place="top" effect="solid" />


        </>


    )
}

export default TicketViews