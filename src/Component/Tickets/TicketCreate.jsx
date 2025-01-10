import React, { useEffect, useMemo, useState, useCallback } from "react";
import useStore from "../../Store";
import ReactTable from "../Reacttable/Reacttable";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAPICallFunction,
  postAPICallFunction,
} from "../../ReactQuery/reactQuery";
import {
  Ticketapis,
  ticketcategoryapi,
  ticketsubcategoryapi,
  Presenturlapi,
  Ticketretrieveapis,
  clientcategoryapi,
  clientsubcategoryapi,
} from "../../Api/Api";
import searchimg from "../../assets/Dashboard/Vector (3).svg";
import high from "../../assets/Dashboard/Group 427319195.svg";
import low from "../../assets/Dashboard/Group 427319197.svg";
import medimum from "../../assets/Dashboard/Group 427319196.svg";
import creationimg from "../../assets/Dashboard/Group 427319979 (1).svg";
import Userim from "../../assets/Dashboard/Layer_1 (2).svg";
import TicketCreation from "../../assets/Dashboard/Creation.svg";
import images from "../../assets/Dashboard/Union (4).svg";
import Attachment from "../../assets/Dashboard/attachment.svg";

import closepopup from "../../assets/Dashboard/Group 442.svg";
import arrowdrop from "../../assets/Dashboard/Vector (5).svg";
import fileuploads from "../../assets/Dashboard/Vector (6).svg";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import Select from "react-select";
import _, { values } from "lodash";
import backimg from "../../assets/Dashboard/Union (3).svg";
import { useNavigate } from "react-router-dom";
import notifyimg from "../../assets/Dashboard/Group 427320010.svg";
import thumbsup from "../../assets/Dashboard/plastic-hand-with-thumb-up 1.svg";
import ticketimg from "../../assets/Dashboard/Union (17).svg";

const TicketCreate = () => {
  const {
    ToggleBars,
    setToggleBars,
    setIsLoading,
    ownerDetails,
    settheThankpopup,
    thanksContent,
    setTicketResponse,
    TicketCreateREsponse,
    setIsLoadingtwo,
    settheTicketIDs,
  } = useStore();
  //---creating ticket
  const [TicketCreate, setTicketCreate] = useState(false);
  const [file, setFile] = useState(null);
  const normaldata = {
    documents: [],
    // sub_category_id: "",
    clientsub_category_id: "",
    client_id: ownerDetails?.client_id?.id,
    remarks: "",
    issue_category_id: "",
    priority: "",
    client_subcategory: true,
  };

  const [Ticketdata, setticketdata] = useState(normaldata);
  const [Categoryoptions, setCategpryOptions] = useState([]);

  const [Subcategoryoptions, setSubCategoryoptions] = useState([]);
  const [subcategoryvalues, setsubcategoryvalues] = useState([]);
  const [CategoryValues, setCategoryvalues] = useState([]);
  const [Priorityvalues, setPriorityValues] = useState([]);
  const [Priorityclientvalues, setPriorityclientValues] = useState([]);

  const handleChange = (file) => {
    setFile(file);
  };
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [thankcontent, setthankcontent] = useState(thanksContent);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  let Priorityoptions = [
    {
      value: "0",
      label: "Low",
    },
    {
      value: "1",
      label: "Medium",
    },
    {
      value: "2",
      label: "High",
    },
  ];
  const [PresentUrls, setPresentUrls] = useState([]);
  const [presenturlInUrl, seturlandfile] = useState([]);
  const [categorysearch, setcategorysearch] = useState("");
  const [subcategorysearch, setSubcategorysearch] = useState("");

  const [croppedFileState, setcroppedFilestatet] = useState([]);
  const [documentnotuploads, setdosumentuploads] = useState(false);

  const Navigate = useNavigate();
  const fileTypes = ["JPEG", "PNG", "GIF"];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file) => {
      const isPhotoOrVideo =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      const isPdf = file.type === "application/pdf";
      const isEmail = file.type === "message/rfc822"; // MIME type for email files
      const isUnder5MB = file.size <= 5 * 1024 * 1024; // 5 MB size limit

      return (isPhotoOrVideo || isExcel || isPdf || isEmail) && isUnder5MB;
    });

    const invalidFiles = files.filter((file) => {
      const isPhotoOrVideo =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      const isPdf = file.type === "application/pdf";
      const isEmail = file.type === "message/rfc822";
      const isUnder5MB = file.size <= 5 * 1024 * 1024;

      // Check if the file fails size validation
      if ((isPhotoOrVideo || isExcel || isPdf || isEmail) && !isUnder5MB) {
        toast.error(`${file.name} exceeds the 5 MB size limit.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      // Check if the file fails type validation
      if (!(isPhotoOrVideo || isExcel || isPdf || isEmail)) {
        toast.error(`${file.name} is not a valid file type.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      return !(isPhotoOrVideo || isExcel || isPdf || isEmail) || !isUnder5MB;
    });
    // Exit if no valid files
    if (validFiles.length === 0) {
      return;
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
      const formattedFilename = `ticketing_system/${file.name}`; // Adjust the filename as needed
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
      createPresntUrlMutation.mutate(
        { filepart: file, responsedatas: presentData },
        {
          onSuccess: (response) => {
            console.log(`Successfully uploaded: ${file.name}`, response);
          },
          onError: (error) => {
            console.error(`Error uploading: ${file.name}`, error);
          },
        }
      );
    });
  };

  useEffect(() => {
    if (uploadedFiles.length == 0) {
      setdosumentuploads(false);
    }
  }, [uploadedFiles]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();

    const droppedFiles = Array.from(event.dataTransfer.files);

    // Filter files based on type and size
    // const validFiles = droppedFiles.filter((file) => {
    //     const isPhotoOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
    //     const isUnderSizeLimit = file.size <= 5 * 1024 * 1024; // 5 MB in bytes

    //     if (!isPhotoOrVideo) {
    //         toast.error(`Invalid file type: ${file.name}`);
    //     }
    //     if (!isUnderSizeLimit && isPhotoOrVideo) {
    //         toast.error(`File too large: ${file.name} exceeds 5 MB`);
    //     }

    //     return isPhotoOrVideo && isUnderSizeLimit;
    // });

    const validFiles = droppedFiles.filter((file) => {
      const isPhotoOrVideo =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      const isPdf = file.type === "application/pdf";
      const isEmail = file.type === "message/rfc822"; // MIME type for email files
      const isUnder5MB = file.size <= 5 * 1024 * 1024; // 5 MB size limit

      return (isPhotoOrVideo || isExcel || isPdf || isEmail) && isUnder5MB;
    });

    const invalidFiles = droppedFiles.filter((file) => {
      const isPhotoOrVideo =
        file.type.startsWith("image/") || file.type.startsWith("video/");
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      const isPdf = file.type === "application/pdf";
      const isEmail = file.type === "message/rfc822";
      const isUnder5MB = file.size <= 5 * 1024 * 1024;

      // Check if the file fails size validation
      if ((isPhotoOrVideo || isExcel || isPdf || isEmail) && !isUnder5MB) {
        toast.error(`${file.name} exceeds the 5 MB size limit.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      // Check if the file fails type validation
      if (!(isPhotoOrVideo || isExcel || isPdf || isEmail)) {
        toast.error(`${file.name} is not a valid file type.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      return !(isPhotoOrVideo || isExcel || isPdf || isEmail) || !isUnder5MB;
    });
    // Exit if no valid files
    if (validFiles.length === 0) {
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Url = reader.result;

        console.log(base64Url, "odapisbase64Url");

        // setUploadedFiles((prevFiles) => [
        //     ...prevFiles,
        //     // { file, base64Url },
        //     {  base64Url },

        // ]);
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
        createPresntUrlMutation.mutate(
          { filepart: file, responsedatas: presentData },
          {
            onSuccess: (response) => {},
            onError: (error) => {},
          }
        );
      });
    }
  }, []);

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
    mutationFn: async ({ filepart, responsedatas }) => {
      // Destructure the object
      setIsLoadingtwo(true);

      console.log(filepart, responsedatas, "filepart, responsedatas");

      const response = await postAPICallFunction({
        url: Presenturlapi,
        data: responsedatas, // Use the data passed in mutate
      });
      // setIsLoadingtwo(false)

      return { ...response, responsedatas, filepart };
    },
    onSuccess: (data) => {
      const responsedatas = data.responsedatas; // Extract responsedatas
      const filepart = data.filepart;
      setIsLoadingtwo(false);

      const uploadedFiles = data.data.data; // Adjust based on actual response structure
      const newUrls = uploadedFiles.map((url) => ({
        url: url, // Adjust this based on the actual response
        type: responsedatas.multiple_files[0].file_type,
        putfiles: filepart,
      }));

      setPresentUrls((prevUrls) => [...prevUrls, ...newUrls]);

      const SendUrl = String(data.data.data).split("?")[0]; // Extract URL up to '?'

      if (SendUrl) {
        seturlandfile((prevUrls) => [...prevUrls, SendUrl]); // Add the URL to the array
      }
    },
    onError: (error) => {
      setIsLoadingtwo(false);
    },
  });

  const uploadFilesMutation = useMutation({
    mutationFn: async (PresentUrls) => {
      return Promise.all(
        PresentUrls.map(async (item, index) => {
          const response = await fetch(item.url, {
            method: "PUT",
            headers: {
              "Content-Type": item.type,
              "x-amz-acl": "public-read",
            },
            body: item.putfiles,
          });
          setIsLoadingtwo(true);
          if (PresentUrls.length == index + 1) {
            setPresentUrls([]); // Clear the URLs on success
            CreateTicketsmutation.mutate();
          }

          if (!response.ok) {
            throw new Error(
              `Failed to upload file to ${item.url}, Status: ${response.status}`
            );
          }
          setIsLoadingtwo(false);

          return { url: item.url, status: "success" };
        })
      );
    },
    onSuccess: (data) => {
      setPresentUrls([]); // Clear the URLs on success
    },
    onError: (error) => {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload some files. Please try again.");
    },
  });

  const capitalizeEachWord = (str) => {
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join the words back into a string
  };

  const payloadcategory = {
    search: categorysearch,
    page_size: 20,
    page: 1,
  };
  const { data: Categorydetails, refetch: categoryReCalls } = useQuery({
    queryKey: ["Categorycall", categorysearch],
    queryFn: async () => {
      setIsLoading(true);

      const response = await getAPICallFunction({
        url: clientcategoryapi,
        payload: payloadcategory,
      });
      setIsLoading(false);
      return response;
    },
    // enabled: TicketCreate == true,
  });

  useEffect(() => {
    if (Categorydetails) {
      const Categorydetailsdatas = Categorydetails.data;
      const listofOptions = [];
      Categorydetailsdatas.forEach((element) => {
        listofOptions.push({ value: element.id, label: element.name });
      });

      setCategpryOptions(listofOptions);
    }
  }, [Categorydetails, categorysearch]);

  const subpayload = {
    category: Ticketdata.issue_category_id,
    search: subcategorysearch,
    page_size: 20,
    page: 1,
    active: true,
  };

  // const { data: SubCategorydetails } = useQuery({
  //     queryKey: ["SubCategorycall", Ticketdata.issue_category_id, subcategorysearch],
  //     queryFn: async () => {
  //         if (Ticketdata.issue_category_id === "") {
  //             return [];
  //         }

  //         setIsLoading(true);

  //         try {
  //             const response = await getAPICallFunction({
  //                 url: clientsubcategoryapi,
  //                 payload: subpayload
  //             });
  //             return response;
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     },
  //     enabled: Ticketdata.issue_category_id !== "",
  // });

  // const { data: SubCategorydetails } = useQuery({
  //     queryKey: ["SubCategorycall", Ticketdata.issue_category_id.trim(), subcategorysearch],
  //     queryFn: async () => {
  //         if (Ticketdata.issue_category_id.trim() === "") {
  //             return [];
  //         }

  //         setIsLoading(true);

  //         try {
  //             const response = await getAPICallFunction({
  //                 url: clientsubcategoryapi,
  //                 payload: subpayload,
  //             });
  //             return response;
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     },
  //     enabled: Ticketdata.issue_category_id.trim() !== "",
  // });

  const { data: SubCategorydetails } = useQuery({
    queryKey: [
      "SubCategorycall",
      Ticketdata.issue_category_id,
      subcategorysearch,
    ],
    queryFn: async () => {
      setIsLoading(true);

      const response = await getAPICallFunction({
        url: clientsubcategoryapi,
        payload: subpayload,
      });
      setIsLoading(false);

      return response;
    },
    enabled:
      Ticketdata.issue_category_id !== "" &&
      Ticketdata.issue_category_id != undefined,
  });

  useEffect(() => {
    if (SubCategorydetails) {
      const SubCategorydetailsdata = SubCategorydetails.data;
      const listofsubOptions = [];

      SubCategorydetailsdata.forEach((element) => {
        listofsubOptions.push({
          value: element.id,
          label: element.name,
          priorityvalu: element.Priority,
          priority:
            element.Priority == 1
              ? "Medium"
              : element.Priority == 2
              ? "High"
              : "Low",
        });
      });

      setSubCategoryoptions(listofsubOptions);
    }
  }, [SubCategorydetails, Ticketdata.issue_category_id, subcategorysearch]);
  const CreateTicketsmutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);

      const response = await postAPICallFunction({
        url: Ticketretrieveapis,
        data: Ticketdata,
      });
      setIsLoading(false);

      return response;
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      // Navigate("/tickets")
      setTicketResponse(response.data.data);
      console.log(response?.data?.data, "response?.data?.data");

      settheThankpopup(true);
      setthankcontent(true);

      setIsLoading(false);

      setticketdata(normaldata);
      setsubcategoryvalues([]);
      setCategoryvalues([]);
      setPriorityValues([]);
      setTicketCreate(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const CreateTicket = () => {
    if (
      Ticketdata.remarks != "" &&
      Ticketdata.issue_category_id !== "" &&
      Ticketdata.clientsub_category_id !== "" &&
      Ticketdata.priority !== ""
    ) {
      delete Ticketdata.issue_category_id;

      if (documentnotuploads) {
        setticketdata((prevState) => ({
          ...prevState,
          documents: presenturlInUrl, // Assign the new documents list
        }));
        uploadFilesMutation.mutate(PresentUrls);
      } else {
        CreateTicketsmutation.mutate();
      }
    } else {
      toast.info("Please Fill the Manditory Fields");
    }
  };

  console.log("ticketResponse", TicketCreateREsponse);

  return (
    <>
      {thanksContent === false && (
        <div className="PopupCreations">
          <div className="InnerPopup">
            <div className="PopupContent">
              <div className="row PopupRows">
                <div className="col-5">
                  <div className="Popupcreatetickets">
                    <h3>How can we help?</h3>

                    <div className="InnerImages">
                      <img src={TicketCreation} alt="" />
                    </div>
                  </div>
                  {ownerDetails.first_name ? (
                    <div className="CreatedBy">
                      <div className="CreateBodyofcontent">
                        <div className="createrimgs">
                          <img src={Userim} alt="" />
                        </div>
                        <div>
                          <p>
                            Created by{" "}
                            {capitalizeEachWord(ownerDetails.first_name)}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="col-7 rightsideticketcreations">
                  <div className="col-12 ClosePopupDesigns">
                    <div
                      onClick={() => {
                        Navigate("/tickets");
                        setTicketCreate(false);
                        setticketdata(normaldata);
                        setsubcategoryvalues([]);
                        setCategoryvalues([]);
                        setPriorityValues([]);
                      }}
                    >
                      <img src={closepopup} alt="" />
                    </div>
                  </div>

                  <div className="row InnerFormsDetails">
                    <div className="col-6">
                      <label className="form-label">Problem Category</label>
                      <Select
                        className="Selects"
                        labelledBy="Select"
                        options={Categoryoptions}
                        onChange={(e) => {
                          setCategoryvalues(e);
                          setticketdata({
                            ...Ticketdata,
                            issue_category_id: e.value,
                            clientsub_category_id: "",
                          });
                          setPriorityValues([]);
                          setsubcategoryvalues([]);
                          setPriorityclientValues([]);
                        }}
                        value={CategoryValues}
                        onInputChange={(e) => {
                          setcategorysearch(e);
                        }}
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label">Sub Category</label>
                      <Select
                        className="Selects"
                        labelledBy="Select"
                        options={Subcategoryoptions}
                        onChange={(e) => {
                          setsubcategoryvalues(e);
                          setPriorityValues({
                            value: e.value,
                            label: e.priority,
                          });
                          setticketdata({
                            ...Ticketdata,
                            clientsub_category_id: e.value,
                            // priority: e.priorityvalu
                          });
                          // setPriorityclientValues({ value: e.priorityvalu, label: e.priority })
                        }}
                        value={subcategoryvalues}
                        onInputChange={(e) => {
                          setSubcategorysearch(e);
                        }}
                      />
                    </div>

                    {/* <div className='col-6 mt-3'>
                                            <label className="form-label LabelRemove" >
                                                Priority
                                            </label>
                                            <Select
                                                className="Selects"
                                                labelledBy="Select"
                                                value={Priorityvalues}
                                                isDisabled
                                            />
                                        </div> */}

                    <div className="col-6 mt-3">
                      <label className="form-label ">Priority</label>
                      <Select
                        className="Selects"
                        labelledBy="Select"
                        value={Priorityclientvalues}
                        options={Priorityoptions}
                        onChange={(e) => {
                          setPriorityclientValues(e);

                          setticketdata({
                            ...Ticketdata,
                            priority: e.value,
                          });
                        }}
                      />
                    </div>

                    <div className="col-6 mt-3 TextareaLabel">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          setticketdata({
                            ...Ticketdata,
                            remarks:
                              inputValue.charAt(0).toUpperCase() +
                              inputValue.slice(1),
                          });
                        }}
                        value={Ticketdata.remarks}
                      />
                    </div>

                    <div className="col-12 mt-3 DocumentsUpload">
                      <label className="form-label LabelRemove">
                        Attachments Upload
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
                          backgroundColor: isDragging
                            ? "hsla(203, 49%, 81%, 0.25)"
                            : "transparent", // Change background color
                          transition: "background-color 0.3s ease", // Smooth transition
                        }}
                      >
                        <div className="d-flex flex-wrap align-items-center gap-3">
                          {/* {uploadedFiles.map((file, index) => (
                                                        <div key={index} style={{ position: "relative" }}>
                                                            <img
                                                                src={file}
                                                                alt={`Uploaded File ${index + 1}`}
                                                                style={{
                                                                    width: "100px",
                                                                    height: "100px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "8px",
                                                                    border: "1px solid #ddd",
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm DeleteImages"
                                                                onClick={() => removeFile(index)}
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    ))} */}
                          {
                            // uploadedFiles
                            PresentUrls.map((file, index) => {
                              let displayImg;
                              if (
                                file.type === "image/png" ||
                                file.type === "image/jpeg"
                              ) {
                                displayImg = Attachment; // Replace with your gallery image variable
                              } else if (file.type === "application/pdf") {
                                displayImg = Attachment; // Replace with your PDF icon variable
                              } else if (
                                file.type === "application/vnd.ms-excel" ||
                                file.type ===
                                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                              ) {
                                displayImg = Attachment; // Replace with your Excel icon variable
                              } else {
                                displayImg = Attachment; // Replace with a default image/icon if none match
                              }
                              return (
                                <>
                                  <div
                                    key={index}
                                    style={{
                                      position: "relative",
                                      width: "38px",
                                      height: "38px",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    {console.log(
                                      PresentUrls?.[0]?.putfiles,
                                      "ajsdjashkdjasdjkslkjdas"
                                    )}
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
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {console.log(file, "sdklaklsdlkklaslkd")}
                                      {file?.putfiles?.name?.length > 5
                                        ? `${file?.putfiles.name.slice(
                                            0,
                                            5
                                          )}...`
                                        : file?.putfiles?.name}
                                    </span>
                                    <button
                                      type="button"
                                      className=" btn-danger btn-sm DeleteImages"
                                      onClick={() => removeFile(index)}
                                    >
                                      &times;
                                    </button>
                                  </div>
                                </>
                              );
                            })
                          }

                          {uploadedFiles.length == 0 && (
                            <div className="InnerImages d-flex flex-wrap align-items-center  justify-content-center">
                              <img src={backimg} />
                            </div>
                          )}
                        </div>

                        <p className="mt-3 ">
                          Drag your files here to upload or{" "}
                          <label
                            className="Droplabel Droplabel2"
                            htmlFor="fileUploadInput"
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
                          {/* <br />
                          Maximum file size 5 MB and File supported in JPG or
                          PDF */}
                        </p>
                      </div>
                    </div>

                    <div className="col-12 Createtickets">
                      <button onClick={() => CreateTicket()}>
                        Create Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {thanksContent && (
        <>
          <div className="CommentPopup">
            <div className="innercommentpopup">
              <div className="FormPartsthanks FormPartsticketslist">
                <div className="innerformscomentpart">
                  <div className="Notifyimgsthumbs">
                    <img src={thumbsup} />
                  </div>
                  <div className="closecontent CloseIcons">
                    <img
                      src={closepopup}
                      alt=""
                      onClick={(e) => {
                        setthankcontent(false);
                        settheThankpopup(false);

                        Navigate("/tickets");
                      }}
                    />
                  </div>

                  <div className="ticketnumberlist">
                    <span className="InnerNUmber">
                      <img src={ticketimg} />
                      <span>
                        {"ID  "}
                        {TicketCreateREsponse.ticket_number}
                      </span>
                    </span>
                  </div>
                  <h5 className="pt-4">Ticket Successfully Created!</h5>

                  <div className="FeedbackField">
                    <label className="form-label createdLabels">
                      {/* <p>
                                                Thank you for bringing this to our attention. We’re committed to

                                            </p>
                                            <p>resolving your issue as quickly as possible and appreciate.</p>
                                            <p>your patience.</p> */}
                      {/* <p>Thank you for bringing this to our attention. We’re committed to resolving your issue as quickly as possible and appreciate
                                                your patience.</p> */}
                      <p className="Ticketscreatedsuccessfully">
                        {/* Thank you for bringing this to our attention. We're committed to resolving this issue in the next 48 hours and appreciate
                                                your patience. */}
                        Thank you for bringing this to our attention.
                      </p>
                    </label>
                  </div>
                  <div className="feedbacksubmition">
                    <button
                      onClick={(e) => {
                        setthankcontent(false);
                        settheThankpopup(false);
                        settheTicketIDs(TicketCreateREsponse?.id);
                        Navigate("/tickets/ticketview");
                      }}
                    >
                      View Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TicketCreate;
