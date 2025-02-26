import React, { useEffect, useState } from "react";
import "./Notification.scss";
import close from "./Assets/close.svg";
import mail from "./Assets/mail.svg";
import { getAPICallFunction } from "../../ReactQuery/reactQuery";
import { notificationapi } from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const Notification = props => {
  const { isOpen, setIsOpen } = props;
  const [closing, setClosing] = useState(false);
  const [notifyData, setNotifyData] = useState();
  const [page, setPage] = useState(1);

  const notificationPayload = {
    search: "",
    page_size: 10,
    page: page,
  };
  const [pageData, setPageData] = useState();

  const { data: notificationData, refetch: ticketrecordlisted } = useQuery({
    queryKey: ["TicketDataCalled", notificationPayload],
    queryFn: async () => {
      const response = await getAPICallFunction({
        url: notificationapi,
        payload: notificationPayload,
      });
      return response;
    },
  });

  useEffect(() => {
    if (notificationData) {
      setNotifyData(notificationData?.data);
      setPageData(notificationData.total_count / 10);
    }
  }, [notificationData, page]);
  const formatDate = isoString => {
    const date = new Date(isoString);
    return date
      .toLocaleString("en-US", {
        month: "short", // Jan, Feb, Mar...
        day: "2-digit", // 24
        year: "numeric", // 2024
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12-hour format
      })
      .replace(",", "")
      .replace("AM", "am")
      .replace("PM", "pm");
  };

  const pageCount = () => {
    console.log(notificationData, "sajkdjkasdjsajdsd", pageData);
    if (page < pageData) {
      setPage(page + 1);
    } else {
      toast.warn("Reached Total message");
    }
  };

  return (
    <div
      className="overlay"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="popupsContainer"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="popupHeader">
          <span> Notifications</span>
          <img
            onClick={() => {
              setIsOpen(false);
            }}
            src={close}
            width={20}
          />
        </div>
        <div className="popupBody">
          {notificationData?.data?.map((item, index) => (
            <div key={index} className="messContaioner">
              <div className="messageHeader">
                <img src={mail} width={25} />
                <p className="messageTitle">{item.title}</p>
              </div>
              <p className="notifymessage">{item.body}</p>
              <p className="notifyDate">{formatDate(item.created_date)}</p>
            </div>
          ))}
          <div className="paginationBtn" onClick={pageCount}>
            <button className="readMore">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};
