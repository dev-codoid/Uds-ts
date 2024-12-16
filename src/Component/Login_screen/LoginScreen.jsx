import React, { useState } from 'react'
import styles from "../../Style/LoginScreen/LoginScreen.module.scss";
import loginstyle from "../../assets/Login/Group\ 134.svg"
import logo from "../../assets/Login/Group 131.svg"
import Emailimg from "../../assets/Login/Vector (7).svg"
import passwordimg from "../../assets/Login/Group 421.svg"
import eyeopenimg from "../../assets/Login/Group 422.svg"
import eyecloseimg from "../../assets/Login/Vector (8).svg"

import upperbackimg from "../../assets/Login/illustrations-57 1.svg"



import { toast } from "react-toastify";
import useStore from "../../Store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "../../ReactQuery/reactQuery";
import validator from "validator";



const LoginScreen = () => {
    const { setIsNewUser, isNewUser, setOwnerDetails, setIsLoading, setSelectedSideBarTab, setOwnerinnerDetails } = useStore(
        (state) => state
    );

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        password: "",
        email: "",
    });
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onHandleChange = (event) => {
        let { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };
    console.log(userData, "userData");
    const loginMutate = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            return await postAdminLogin(userData);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            setOwnerDetails(data.data);
            setOwnerinnerDetails(data.data)
            localStorage.setItem("TicketsToken", data.session.token);
            console.log(data, "asdoiasopdiasd data");
            setSelectedSideBarTab("Dashboard")
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

    const onFormSubmit = () => {
        if (userData.password !== "" && userData.email !== "" &&
            validator.isEmail(userData.email)

        ) {
            loginMutate.mutate()
        }
        else {
            setError(true);
        }
    }
    return (
        <>
            <div className={styles.Logincontainer}>
                {/* Left Section */}
                <div className={styles.MainLeft}>
                    <div className={styles.leftSection}>
                        <img src={loginstyle} />
                        <img src={upperbackimg} />

                    </div>

                </div>
                {/* Right Section */}
                <div className={styles.rightSection}>
                    <div className={styles.innerrightsection}>
                        <section className={styles.LogoInner}>
                            <img src={logo} />
                       </section>
                        <section className={styles.Logoinner}>
                            <h2>Hey, Hello</h2>
                        </section>
                        <p className={styles.para}>Enter your Login Credentials.</p>
                        <form onClick={(e) => e.preventDefault()}>
                            <div>
                                <label className={styles.labelcontent}>Email  <span><img src={Emailimg} alt=""/></span></label>
                                <input type="email" name='email' onChange={(e) => { onHandleChange(e) }}
                                    value={userData.email}
                                />
                                {error && (!validator.isEmail(userData.email) || userData.email === "") ? (
                                    <p className={styles.errorContainer}>Valid Email Required</p>
                                ) : (
                                    <p></p>
                                )}
                            </div>

                            <div>
                                <label className={styles.labelcontent}>Password <span><img src={passwordimg} alt=""/></span></label>
                                <p className={styles.PasswordPara}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onChange={onHandleChange}
                                        value={userData.password}
                                        style={{ marginRight: '10px', padding: '10px', flex: 1 }}
                                    />
                                    <img
                                        className={styles.PasswordText}
                                        src={showPassword ? eyeopenimg : eyecloseimg} 
                                        alt={""}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                                    />
                                </p>
                                {error && userData.password == "" ? (
                                    <p className={styles.errorContainer}>Valid Password Required</p>
                                ) : (
                                    <p></p>
                                )}
                            </div>

                            {/* <p className={styles.forgotpassword} onClick={() => { navigate("/forgotpassword") }}>Forgot Password ?</p> */}
                            <button type="submit" className={styles.loginButton} onClick={onFormSubmit}>
                                LOGIN
                            </button>
                        </form>

                    </div>
                </div>
            </div>

        </>)
}

export default LoginScreen