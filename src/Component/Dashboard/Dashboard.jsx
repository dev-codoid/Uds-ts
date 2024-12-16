import React, { useState } from 'react'
import "../../Style/Pages/Dashboard.scss"
import logo from "../../assets/Login/Group 131.svg"
import useStore from "../../Store";
import { NavLink } from "react-router-dom";
import Dashboardimg from "../../assets/Dashboard/Group 424 (2).svg"
import Tciketingimg from "../../assets/Dashboard/Group 401.svg"
import personimg from "../../assets/Dashboard/Union (1).svg"


import Dashboardwhiteimg from "../../assets/Dashboard/Vector (13).svg"
import Tciketingwhiteimg from "../../assets/Dashboard/Vector (14).svg"

const Dashboard = () => {
  const {
    selectedSideBarTab,
    setSelectedSideBarTab,
    ownerDetails,
    dashboardLocationList,
    setSelectedLocationData,
    selectedLocationData,
    ToggleBars,
    setToggleBars

  } = useStore();
  const [dropdown, setDropdown] = useState(false)


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
          <div className='InnerBar'>
            {/* {"Logo"} */}

            <div className='InnerBarLogo'>
              <img src={logo} onClick={() => {
                setToggleBars(!ToggleBars);
              }} />

              {/* ----Toggle--img */}
              {/* <img
                // src={logo}
                onClick={() => {
                  setToggleBars(!ToggleBars);
                }} /> */}
            </div>

            {/* {"InnerContent"} */}
            <div className='BarMainList'>
              <section className='MenuMains'>
                {navList.map((item, ind) => {                   

                  return (

                    <>
                      {item.name ?
                        <NavLink
                          key={item.id}
                          className={`MenusNavlink ${selectedSideBarTab == item.name ? "activenav" : "notactive"}`}

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
                        </NavLink> :
                        null}
                    </>

                  );
                })}

              </section>

            </div>


            <div className='LogoOut' onClick={() => { setDropdown(!dropdown) }}  >
              <img src={personimg} />
            </div>

            {dropdown && (
              <div class="dropdown-menuLogout" >

                <a class="dropdown-item" href="#" onClick={() => {
                  setDropdown(false);

                  localStorage.removeItem("TicketsToken");
                  localStorage.removeItem("isTicketsLogin");
                  localStorage.removeItem("Ticking-store");
                  window.location.href = "/login";
                  window.reload();
                }}>Logout</a>
              </div>
            )}

          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard