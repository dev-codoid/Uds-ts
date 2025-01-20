import React, { useState } from "react";
import "../../Style/Pages/Dashboard.scss";
import "../../Style/Pages/HomeScreen.scss";

import logo from "../../assets/Login/Group 1322.svg";
import useStore from "../../Store";
import { NavLink } from "react-router-dom";
import Dashboardimg from "../../assets/Dashboard/Group 424 (2).svg";
import Tciketingimg from "../../assets/Dashboard/Group 401.svg";
import Profileimg from "../../assets/Dashboard/profile2.png";

import personimg from "../../assets/Dashboard/Union (1).svg";

import Dashboardwhiteimg from "../../assets/Dashboard/Vector (13).svg";
import Tciketingwhiteimg from "../../assets/Dashboard/Vector (14).svg";
import LogoutIcon from "@mui/icons-material/Logout";
import closepopup from "../../assets/Dashboard/Group 442.svg";
import emaailImg from "../../assets/Dashboard/Union (32).svg";
import branchimg from "../../assets/Dashboard/Union (24).svg";
import locationimg from "../../assets/Dashboard/Union (29).svg";
import Logoutimg from "../../assets/Dashboard/Union (23).svg";

import PhoneImga from "../../assets/Dashboard/Union (30).svg";

const Dashboard = () => {
  const {
    selectedSideBarTab,
    setSelectedSideBarTab,
    ownerDetails,
    dashboardLocationList,
    setSelectedLocationData,
    selectedLocationData,

    ToggleBars,
    setToggleBars,
  } = useStore();
  const [dropdown, setDropdown] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    console.log(text, "auaOPUS APSOA Stext");

    return text.substring(0, maxLength) + "...";
  };

  const capitalizeEachWord = (str) => {
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join the words back into a string
  };
  const navList = [
    {
      id: 1,
      path: "/",
      name: "Dashboard",
      backmage: Dashboardimg,
      selecteBbackgroundImage: Dashboardwhiteimg,
      class: "page-dash",
    },
    {
      id: 2,
      path: "/tickets",
      name: "Tickets",
      backmage: Tciketingimg,
      selecteBbackgroundImage: Tciketingwhiteimg,
      class: "page-dash",
    },
  ];

  return (
    <>
      <div>
        <div className={!ToggleBars ? "SidebarDesign" : "SidebarDesignClose"}>
          <div className="InnerBar">
            {/* {"Logo"} */}
            <div>
              <div className="InnerBarLogo">
                <img
                  src={logo}
                  onClick={() => {
                    setToggleBars(!ToggleBars);
                  }}
                />

                {/* ----Toggle--img */}
                {/* <img
                // src={logo}
                onClick={() => {
                  setToggleBars(!ToggleBars);
                }} /> */}
              </div>

              {/* {"InnerContent"} */}
              <div className="BarMainList">
                <section className="MenuMains">
                  {navList.map((item, ind) => {
                    return (
                      <>
                        {item.name ? (
                          <NavLink
                            key={ind}
                            className={`MenusNavlink ${
                              selectedSideBarTab == item.name
                                ? "activenav"
                                : "notactive"
                            }`}
                            to={item.path}
                            onClick={() => setSelectedSideBarTab(item.name)}
                          >
                            <div className="sideNavItem">
                              {/* <img
                              src={item.backmage}
                              alt=""
                            /> */}
                              <img
                                src={
                                  selectedSideBarTab === item.name
                                    ? item.selecteBbackgroundImage
                                    : item.backmage
                                }
                                alt=""
                              />
                              <p>{item.name}</p>
                            </div>
                          </NavLink>
                        ) : null}
                      </>
                    );
                  })}
                </section>
              </div>
            </div>
            {/* <div className="LogoOut"> */}
            <div className="DashboardContents">
              {/* <img src={Notify} alt="" className="Nofiyimages" /> */}
              <p
                className="InerBranchNames"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
              >
                <span className="BranchNames">
                  <span>
                    {ownerDetails.client_id?.client_name
                      ? ownerDetails.client_id?.client_name.charAt(0)
                      : ""}
                  </span>
                </span>
                {/* <span
                                                              data-tooltip-id="my-tooltip" data-tooltip-content={ownerDetails.client_id?.client_name ? ownerDetails.client_id?.client_name : ""}
                                                              className='branchFullName'>
                                                              {ownerDetails.client_id?.client_name ? truncateText(capitalizeEachWord(ownerDetails.client_id?.client_name), 35) : "-"}
                                                          </span> */}

                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    ownerDetails.client_id?.client_name &&
                    ownerDetails.client_id.client_name.length > 35
                      ? capitalizeEachWord(
                          ownerDetails.client_id.client_name.toLowerCase()
                        )
                      : ""
                  }
                  className="branchFullName"
                >
                  {ownerDetails.client_id?.client_name
                    ? truncateText(
                        capitalizeEachWord(
                          ownerDetails.client_id.client_name.toLowerCase()
                        ),
                        35
                      )
                    : "-"}
                </span>
              </p>
            </div>

            {dropdown && (
              <div class="dropdown-menuLogout">
                <div className="profile-card">
                  <div className="user-profile">
                    <h4>User Profile</h4>
                    <div className="user-info">
                      <img
                        src={Profileimg}
                        alt="User"
                        className="profile-image"
                      />
                      <div className="details">
                        <p className="NameOfLogins">
                          {ownerDetails?.first_name
                            ? truncateText(
                                capitalizeEachWord(
                                  ownerDetails?.first_name.toLowerCase()
                                ),
                                20
                              )
                            : "-"}
                        </p>
                        <p>
                          <img src={PhoneImga} />{" "}
                          {ownerDetails.phone_number
                            ? ownerDetails?.phone_number
                            : "-"}
                        </p>
                        <p>
                          <img src={emaailImg} />
                          {ownerDetails.email
                            ? truncateText(
                                capitalizeEachWord(
                                  ownerDetails.email.toLowerCase()
                                ),
                                20
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="organization-info">
                    <h4>Your Organisation</h4>
                    <p>
                      {" "}
                      <img src={branchimg} />{" "}
                      {ownerDetails.client_id?.client_name
                        ? truncateText(
                            capitalizeEachWord(
                              ownerDetails.client_id?.client_name.toLowerCase()
                            ),
                            19
                          )
                        : "-"}
                    </p>
                    <p>
                      <img src={locationimg} />
                      {ownerDetails.client_id?.address
                        ? truncateText(
                            capitalizeEachWord(
                              ownerDetails.client_id?.address.toLowerCase()
                            ),
                            20
                          )
                        : "-"}
                    </p>
                  </div>
                  <div
                    className="logout"
                    onClick={() => {
                      localStorage.removeItem("TicketsToken");
                      localStorage.removeItem("isTicketsLogin");
                      localStorage.removeItem("Ticking-store");
                      window.location.href = "/login";
                      window.reload();
                    }}
                  >
                    <img src={Logoutimg} /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
