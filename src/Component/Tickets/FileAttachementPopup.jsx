import React, { useState } from "react";
import "../../Style/Pages/FileattachmentPoup.scss";
import closepopup from "../../assets/Dashboard/Group 442.svg";
import images from "../../assets/Dashboard/Union (4).svg";
import Attachment from "../../assets/Dashboard/attachment.svg";

const FileAttachementPopup = (props) => {
  const { setFilePopup, filePopup, Attchment } = props;
  const [files, setFiles] = useState();

  const fileNames = Attchment.map((url) => url.split("/").pop());
  console.log(fileNames, "sdalkjklaslkdklsadkl");
  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="overlay">
        <div className="popups">
          <div className="popupHeader">
            <div></div>

            <span className="TitleHeader">Attachments</span>

            {/* {editData ? "Edit Role " : "Create Role"} */}
            <img
              src={closepopup}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setFilePopup(false);
              }}
            />
            {console.log(Attchment, "asjkdjkaskjdasdkjkjsal")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10%" }}>
            {Attchment.map((url, index) => (
              <div key={index} onClick={() => handleClick(url)}>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={Attachment}
                    style={{ width: "40px", height: "50px" }}
                  />
                  <span style={{ textTransform: "capitalize" }}>
                    {fileNames[index]?.length > 6
                      ? `${fileNames[index].slice(0, 6)}...`
                      : fileNames[index]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileAttachementPopup;
