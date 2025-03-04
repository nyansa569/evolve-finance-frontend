import "./auth.css";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import logo from "../../assets/pngg 1.png";
import { useNavigate } from "react-router-dom";
import {
  verifyEmail,
  requestOTP,
  sendOTPMessage,
} from "../../services/user_services"; // Import login service function
function ForgotPasswordPage() {
  const [errorMessage, setErrorMessage] = useState(""); // To capture and display errors
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: email,
      role: "Customer",
    };
    ////console.log(formData);

    try {
      const response_verify = await verifyEmail(formData); // Call the login service
      const response_otp = await requestOTP({email}); // Call the login service
      // const response_mail = await requestOTP(); // Call the login service
      ////console.log("OTP generated successfully:", response_verify);
      ////console.log("OTP generated successfully:", response_otp);
      const mail_form = {
        email: formData.email,
        otp: response_otp.data.otp,
        name: "Sir/Madam",
        messageType: "resetpassword",
      };
      const response_mail = await sendOTPMessage(mail_form); // Call the login service
      ////console.log("OTP sent successfully:", response_mail);
      const userDataToStore = {
        ...formData,
        otp: response_otp.data.otp,
        otpType: "resetpassword",
      };

      localStorage.setItem("userData", JSON.stringify(userDataToStore));
      setTimeout(() => {
        navigate("/otp-verification");
      }, 2000); // 2 seconds delay before navigating
    } catch (error: any) {
      ////console.log(error.message);
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
          Forgotten Password
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
            Enter your email address to reset password
          </label>
          <input
            placeholder="username@gmail.com"
            className="signinput"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              textAlign: "center",
              padding: "1rem",
            }}
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
            Submit
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

export default ForgotPasswordPage;
