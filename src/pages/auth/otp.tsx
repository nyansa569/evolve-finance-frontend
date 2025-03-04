import "./auth.css";
import React, { useState, useEffect } from "react";
import logo from "../../assets/pngg 1.png";
import {
  createUser,
  loginUser,
  sendOTPMessage,
  verifyOTP,
} from "../../services/user_services"; // Import the createUser service function
import { useNavigate } from "react-router-dom";
function OTPscreen() {
  const [errorMessage, setErrorMessage] = useState(""); // To capture and display errors
  const [otpInput, setOTPInput] = useState(""); // To capture and display errors

  const navigate = useNavigate();

  const [userData, setUserData] = useState<{
    name: string;
    contact: string;
    email: string;
    password: string;
    role: string;
    otpType: string;
    companyName: string;
  } | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData) {
      // console.error("User data is missing");
      setErrorMessage("User data is missing. Please try again.");
      return;
    }

    const form = {
      name: userData.name,
      contact: userData.contact,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      otpType: userData.otpType,
      companyName: userData.companyName
    };
    // console.log("checking the OTPs...");

    try {
      // console.log("checking the OTPs...");
      // const response_otp = await verifyOTP({
      //   email: form.email,
      //   otp: otpInput,
      // }); // Call the login service
      // console.log("OTP verified successfully:", response_otp);

      let response;
      if (userData.otpType == "signup") {
        response = await createUser(form);
        // console.log("user created successfully", response);
        const mail_form = {
          email: userData!.email,
          otp: "otp",
          name: userData!.name,
          messageType: "signupsuccessful",
        };
        const response_mail = await sendOTPMessage(mail_form);
        // console.log("Email sent successful", response_mail);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("role", "CustomerAdmin");
      } else if (userData.otpType == "signin") {
        response = await loginUser(form);
        // console.log("user logged in successfully", response);
        const mail_form = {
          email: userData!.email,
          otp: "otp",
          name: userData!.name,
          messageType: "signinsuccessful",
        };
        // console.log("User data...", mail_form);
        const response_mail = await sendOTPMessage(mail_form);
        // console.log("Email sent successful", response_mail);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("role", "CustomerAdmin");
        localStorage.setItem("token", response.token);
      } else if (userData.otpType == "resetpassword") {
        navigate("/password-reset"); // Remove setTimeout
        return;
      }

      // Ensure response has the token
      // console.log("Response from server:", response);

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
      } else if (response?.token) {
        localStorage.setItem("token", response.token);
      } else {
        console.error("Token not found in response:", response);
        throw new Error("Authentication failed. No token received.");
      }

      // console.log(
      //   "Token stored in local storage:",
      //   localStorage.getItem("token")
      // );
      // console.log(
      //   "User ID in local storage:",
      //   localStorage.getItem("userId")
      // );
      // console.log(
      //   "Role in local storage:",
      //   localStorage.getItem("role")
      // );

      localStorage.removeItem("userData");
      // console.log("nNavigating to home")
      // Remove the setTimeout, navigate immediately
      // console.log("Navigating to dashboard")
      navigate("/app/");

      setErrorMessage("");
    } catch (error: any) {
      console.error("Authentication error:", error.message);
      setErrorMessage(error.message || "Failed to create user.");
    }
  };

  return (
    <div className="signin-container">
      <section
        className="inner-signin"
        style={{
          // height: "55vh",
          width: "50vw",
          padding: "1rem",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          className="sign-heading"
          style={{
            marginBottom: "2rem",
            fontSize: "1.7rem",
            textAlign: "center",
          }}
        >
          OTP verification
        </h1>

        <form
          onSubmit={handleSubmitForm}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className=""
            style={{
              position: "absolute",
              opacity: "0.1",
              height: "350px",
              zIndex: "0",
            }}
          />
          <label htmlFor="" className="label-signin">
            Enter verification code sent to your email
          </label>
          <input
            placeholder="enter code here..."
            className="signinput"
            onChange={(e) => setOTPInput(e.target.value)}
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              padding: "0.5rem",
            }}
            required
          />
          <br />
          <br />

          {errorMessage && (
            <p
              className="error-message"
              style={{ color: "red", marginTop: "10px" }}
            >
              {errorMessage}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            className="sign-button"
            type="submit"
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
              zIndex: "9999999",
            }}
          >
            Verify
          </button>
          <p
            style={{
              textDecoration: "underline",
              padding: "2rem",
              zIndex: "9999999",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </p>
        </form>
      </section>
    </div>
  );
}

export default OTPscreen;
