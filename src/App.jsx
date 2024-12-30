import { useState } from "react";
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


function App() {
  const isTurfLogin = localStorage.getItem("isTicketsLogin");
  const { setIsLoading, isLoading, isNewUser, ownerDetails, isLoading2 } = useStore(
    (state) => state
  );

   console.log(isLoading2 ,"isLoading2isLoading2",isLoading);
   

  return (
    <>
      {isLoading && <Loader />}
      {isLoading2 && <Loader />}

      {isTurfLogin === "true" ? (
        <>
        <Dashboard/>
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
  )
}

export default App
