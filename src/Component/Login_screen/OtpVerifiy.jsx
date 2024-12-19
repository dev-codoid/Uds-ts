import React, { useState, useEffect } from 'react'
import styles from "../../Style/LoginScreen/LoginScreen.module.scss";
import loginstyle from "../../assets/Login/Group\ 134.svg"
import logo from "../../assets/Login/Group 131.svg"
import { toast } from "react-toastify";
import useStore from "../../Store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postAdminLogin, postforgotpassword, postotpverifications } from "../../ReactQuery/reactQuery";
import validator from "validator";
import upperbackimg from "../../assets/Login/illustrations-57 1.svg"


const OtpVerifiy = () => {
    const { setIsNewUser, isNewUser, setOwnerDetails, setIsLoading, setSelectedLocationData, setOwnerinnerDetails, setForgotEmailId, ForgotEmailId,
        ForgotPasswordPage,
        setForgotPasswordInPage,
        setOtpVerifyHoldData,
        OtpVerifyHoldData


    } = useStore(
        (state) => state
    );
    const [otp, setOtp] = useState(Array(6).fill("")); // Initialize state with an array of 6 empty strings
    const [isResendDisabled, setIsResendDisabled] = useState(true); // State to manage resend button state
    const [timer, setTimer] = useState(30); // Timer to display remaining time for resend button

    const navigate = useNavigate();
    const [otpverify, setotpverifydata] = useState()
    // Handle input change
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.match(/[0-9]/) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Focus next input field
            if (index < 5 && value !== "") {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    useEffect(() => {
        // Start the countdown when the component mounts
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown); // Clear interval when time reaches 0
                    setIsResendDisabled(false); // Enable resend button
                    return 30; // Reset timer
                }
                return prevTimer - 1; // Decrease timer by 1 each second
            });
        }, 1000);

        // Cleanup function to clear the interval if the component unmounts
        return () => clearInterval(countdown);
    }, [isResendDisabled]); // Empty dependency array ensures this only runs once when the component mounts

     
    const handleForgotpassword = () => {
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            console.log("OTP submitted: ", otpValue, typeof Number(otpValue));
            const data = {
                OTP: otpValue,
                ...ForgotEmailId
            }
            setotpverifydata(data);
            otpVerifications.mutate()

        } else {
            toast.info("Please enter a valid 6-digit OTP.");
        }
    };

    const Forgotpassword = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            return await postforgotpassword(ForgotEmailId);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            setForgotEmailId(ForgotEmailId)
            setIsResendDisabled(true);
            setTimer(30);
            toast.success(data.data.message);
        },
        onError: (error) => {
            setIsLoading(false);
            let status = error.response.status;
            let statusText = error.response.statusText;
            toast.error(status + " " + statusText);
        },
    });

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "") {
            // Focus on previous input field if current field is empty and backspace is pressed
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();
            }
        }
        // Clear the current field when backspace is pressed and the field is not empty
        if (e.key === "Backspace" && otp[index] !== "") {
            const newOtp = [...otp];
            newOtp[index] = ""; // Empty the current OTP field
            setOtp(newOtp);
        }
    };
    // Resend OTP function
    const handleResendOTP = () => {
        // Disable the resend button for 30 seconds
        Forgotpassword.mutate()

    };
    const otpVerifications = useMutation({
        mutationFn: async () => {
            setIsLoading(true);
            return await postotpverifications(otpverify);
        },
        onSuccess: (data) => {
            setIsLoading(false);
            setOtpVerifyHoldData(data)
            toast.success(data.status.message);
            navigate("/newpassword")
            // setIsResendDisabled(true);
            console.log(data, "daatduaysd iasud ");
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
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            const data = {
                ...ForgotEmailId,
                otp: otpValue,

            }
            setotpverifydata(data);
            otpVerifications.mutate()
        } else {
            toast.info("Please enter a valid 6-digit OTP.");
        }
    }


    return (
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

                        <div >
                            <label>Otp</label>
                            <section>
                                <>
                                    <div className={styles.OtpOuterFields}>
                                        <div className={styles.OtpOuterFields}>
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-${index}`}
                                                    type="text"
                                                    autoComplete="off"
                                                    maxLength="1"
                                                    value={digit}
                                                    className={styles.OtpFields}
                                                    onChange={(e) => handleChange(e, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}

                                                />
                                            ))}

                                        </div>
                                    </div>


                                    <div style={{ marginTop: "10px" }}>


                                        <p className={styles.ResentOtpField}>Didn't get it?

                                            <span
                                                onClick={() => {
                                                    if (isResendDisabled == false) {
                                                        handleResendOTP()
                                                    }
                                                }}
                                                // disabled={isResendDisabled}
                                                className={styles.ResendOtp}
                                            >
                                                {isResendDisabled ? `Resend OTP in ${timer}s` : "RESEND OTP"}

                                            </span>
                                        </p>


                                    </div>



                                </>

                            </section>

                        </div>

                        <button type="submit" className={styles.loginButton} onClick={onFormSubmit}>
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </div>)
}

export default OtpVerifiy