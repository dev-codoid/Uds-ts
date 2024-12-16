import React, { useState } from 'react'
import styles from "../../Style/LoginScreen/LoginScreen.module.scss";
import loginstyle from "../../assets/Login/Group\ 134.svg"
import logo from "../../assets/Login/Group 131.svg"
import { toast } from "react-toastify";
import useStore from "../../Store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postforgotpassword } from "../../ReactQuery/reactQuery";
import validator from "validator";


const Forgotscreen = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
    });
    const { setIsNewUser, isNewUser, setOwnerDetails, setIsLoading, setSelectedLocationData, setOwnerinnerDetails, setForgotEmailId, ForgotEmailId,
        ForgotPasswordPage,
        setForgotPasswordInPage,
        setOtpVerifyHoldData,
        OtpVerifyHoldData


    } = useStore(
        (state) => state
    );

    const onHandleChange = (event) => {
        let { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };
    const [error, setError] = useState(false);

    const Forgotpassword = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            return await postforgotpassword(userData);
        },
        onSuccess: (data) => {
            console.log(data ,"sdASIAS data");

            setIsLoading(false);            
            setForgotEmailId(userData)
            toast.success(data.status.message);
            navigate("/otpverify")
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
            Forgotpassword.mutate()
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
                                <label>Email</label>
                                <input type="email" name='email' onChange={(e) => { onHandleChange(e) }}
                                    value={userData.email}
                                />
                                {error && (!validator.isEmail(userData.email) || userData.email === "") ? (
                                    <p className={styles.errorContainer}>Valid Email Required</p>
                                ) : (
                                    <p></p>
                                )}
                            </div>



                            <button type="submit" className={styles.loginButton} onClick={onFormSubmit}>
                                SEND OTP
                            </button>
                        </form>

                    </div>
                </div>
            </div>

        </>

    )
}

export default Forgotscreen