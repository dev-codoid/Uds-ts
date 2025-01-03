import { useState, useEffect } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageAuthentication from "./PageAuthentication";
import LoginScreen from "./Component/Login_screen/LoginScreen";
import Dashboard from "./Component/Dashboard/Dashboard";
import Loader from "./Component/Loader/Loader";
import useStore from "./Store";
import Forgotscreen from "./Component/Login_screen/Forgotscreen";
import OtpVerifiy from "./Component/Login_screen/OtpVerifiy";
import PasswordCompo from "./Component/Login_screen/SetPassword";
import HomeScreen from "./Component/Dashboard/HomeScreen";
import Ticketscreen from "./Component/Tickets/Ticketscree";
import TicketCreate from "./Component/Tickets/TicketCreate";
import TicketViews from "./Component/Tickets/TicketViews";
import LowWidthPopup from "./Component/Dashboard/LowithComPopup";


function App() {
  const isTurfLogin = localStorage.getItem("isTicketsLogin");
  const { setIsLoading, isLoading, isNewUser, ownerDetails, isLoading2 } = useStore(
    (state) => state
  );


  const [lowWidthPopup, setLowWidthPopup] = useState(false);


  const checkScreenWidth = () => {
    if (window.innerWidth < 750) {
      setLowWidthPopup(true); // Show the popup if width < 560px
    } else {
      setLowWidthPopup(false); // Hide the popup if width >= 560px
    }
  };

  useEffect(() => {
    checkScreenWidth(); // Check on load
    window.addEventListener("resize", checkScreenWidth); // Check on resize

    return () => {
      window.removeEventListener("resize", checkScreenWidth); // Cleanup listener on unmount
    };
  }, [window]);


  // useEffect(() => {
  //   handleChnage(); // Call handleChnage directly
  //   window.addEventListener("resize", handleChnage); // Add event listener for resize
  //   return () => {
  //     window.removeEventListener("resize", handleChnage); // Clean up event listener on unmount
  //   };
  // }, []); // Empty

  // const handleChnage = () => {

  //   const browserZoomLevel = Math.round(
  //     (window.outerWidth / window.innerWidth) * 100
  //   );
  //   const zoom = (window.innerWidth / 1820) * 100;
  //   document.body.style.zoom = `${Math.round(zoom)}%`;
  // }



  return (
    <>
      {isLoading && <Loader />}
      {isLoading2 && <Loader />}
      {lowWidthPopup == false ?
        <>
          {isTurfLogin === "true" ? (
            <>
              <Dashboard />
              <Routes>
                <Route path="/" index element={<HomeScreen />} />
                <Route path="/tickets" index element={<Ticketscreen />} />
                <Route path="/tickets/raiseticket" index element={<TicketCreate />} />
                <Route path="/tickets/ticketview" index element={<TicketViews />} />

              </Routes>
            </>
          ) : (
            <>

              <Routes>
                <Route path="/" index element={<PageAuthentication />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/forgotpassword" index element={<Forgotscreen />} />            <Route path="/forgotpassword" index element={<Forgotscreen />} />
                <Route path="/otpverify" index element={<OtpVerifiy />} />
                <Route path="/newpassword" index element={<PasswordCompo />} />


              </Routes>
            </>
          )}

        </>
        : <LowWidthPopup />}
    </>
  )
}

export default App
