import React, { useState } from "react";
import styles from "../../Style/LoginScreen/LoginScreen.module.scss";
import loginstyle from "../../assets/Login/Group 134.svg";
import logo from "../../assets/Login/Group 131.svg";
import { toast } from "react-toastify";
import useStore from "../../Store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  putcreatepasswordDetails,
  putAPICallFunction,
} from "../../ReactQuery/reactQuery";
import validator from "validator";
import eyeopenimg from "../../assets/Login/Group 422.svg";
import eyecloseimg from "../../assets/Login/Vector (8).svg";
import upperbackimg from "../../assets/Login/illustrations-57 1.svg";
import { clientpasswordupdate } from "../../Api/Api";

const PasswordChange = () => {
  const {
    setIsNewUser,
    isNewUser,
    setOwnerDetails,
    setIsLoading,
    setSelectedLocationData,
    setOwnerinnerDetails,
    ForgotEmailId,
    Client_idStore,
  } = useStore((state) => state);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    password: "",
    password1: "",
  });
  const [Password, setpassword] = useState({
    password: "",
    // email: ''
    password_changed: true,
  });
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const onHandleChange = (event) => {
    let { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const loginMutate = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await postAdminLogin(userData);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setOwnerDetails(data.data);
      setOwnerinnerDetails(data.data);
      localStorage.setItem("TicketsToken", data.session.token);
      console.log(data, "asdoiasopdiasd data");

      localStorage.setItem("isTicketsLogin", true);
      toast.success("Logged in Successfully");
      navigate("/");
    },
    onError: (error) => {
      console.log(error, "fm");
      setIsLoading(false);
      let status = error.response.status;
      let statusText = error.response.statusText;
      toast.error(status + " " + statusText);
    },
  });
  console.log(localStorage.getItem("TicketsToken"), "iosuoiauISUAS");

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };
  let payload = { data: Password };

  console.log(Password, "Password sd", payload.data);

  const createnewpassword = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await putAPICallFunction({
        url: clientpasswordupdate,
        data: payload.data,
        id: Client_idStore,
      });
      // return await putcreatepasswordDetails(payload);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      console.log(data, "asdasd asdasd");
      toast.success(data.status.message);
      navigate("/login");
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error);
      let status = error.response.status;
      let statusText = error.response.statusText;
      toast.error(status + " " + statusText);
    },
  });
  // console.log(Client_idStore ,"Client_idStore asdasdasd");

  const onFormSubmit = () => {
    if (
      userData.password !== "" &&
      userData.password1 !== "" &&
      userData.password == userData.password1
    ) {
      const isValidPassword = validatePassword(userData.password);
      const isValidPassword1 = validatePassword(userData.password1);
      if (isValidPassword == true && isValidPassword1 == true) {
        let data = {
          password: userData.password,
          password_changed: true,
          // email: ForgotEmailId.email
        };
        setpassword({
          ...data,
        });
        createnewpassword.mutate();
      } else {
        toast.info(
          "*Password must be at least 8 characters long and include an uppercase letter, lowercase letter, digit, and special character."
        );
      }
    } else if (userData.password != userData.password1) {
      toast.info("*Password doest not match");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className={styles.Logincontainer}>
        {/* Left Section */}
        <div className={styles.MainLeft}>
          <div className={styles.leftSection}>
            <img src={loginstyle} />
            {/* <img src={upperbackimg} /> */}
          </div>
        </div>
        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.innerrightsection}>
            <section className={styles.LogoInner}>
              <img src={logo} />
            </section>
            <section className={styles.Logoinner}>
              <h2>Hello! </h2>
            </section>
            <p className={styles.para}>Enter your Login Credentials.</p>
            <form onClick={(e) => e.preventDefault()}>
              <div>
                <label>New Password</label>
                <p className={styles.PasswordPara}>
                  <input
                    type={showPassword1 ? "text" : "password"}
                    name="password1"
                    onChange={(e) => {
                      onHandleChange(e);
                    }}
                    value={userData.password1}
                    style={{ marginRight: "10px", padding: "10px", flex: 1 }}
                  />
                  <img
                    className={styles.PasswordText}
                    src={showPassword1 ? eyeopenimg : eyecloseimg}
                    alt={""}
                    onClick={togglePasswordVisibility1}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  />
                </p>
                {error && userData.password1 == "" ? (
                  <p className={styles.errorContainer}>
                    Valid New Password Required
                  </p>
                ) : (
                  <p></p>
                )}{" "}
              </div>
              <div>
                <label> Confirm Password</label>
                <p className={styles.PasswordPara}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) => {
                      onHandleChange(e);
                    }}
                    value={userData.password}
                    style={{ marginRight: "10px", padding: "10px", flex: 1 }}
                  />
                  <img
                    className={styles.PasswordText}
                    src={showPassword ? eyeopenimg : eyecloseimg}
                    alt={""}
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                  />
                </p>
                {error && userData.password == "" ? (
                  <p className={styles.errorContainer}>
                    Valid Confirm Password Required
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                onClick={onFormSubmit}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
