/* eslint-disable */
import logo from "../../assets/pngg 1.png";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { resetPassword, sendOTPMessage } from "../../services/user_services"; // Import the createUser service function
import { useNavigate } from "react-router-dom";

function PasswordReset() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // To capture and display errors
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState<{
    email: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    if (!isChecked) {
      setErrorMessage("Please accept the terms and conditions");
      return;
    } else if (password != rePassword) {
      setErrorMessage("Passwords do not match");
      return;
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and contain a number."
      );
      return;
    }
    const form = {
      email: userData!.email,
      password,
    };

    try {
      const response_reset_password = await resetPassword(form);
      // console.log("password changed successfully", response_reset_password);
      const mail_form = {
        email: userData!.email,
        otp: "otp",
        name: "User",
        messageType: "resetsuccessful",
      };
      const response_mail = await sendOTPMessage(mail_form); // Call the login service
      // console.log("Email sent successful", response_mail)
      setTimeout(() => {
        navigate("/signin");
      }, 2000); // 2 seconds delay before navigating
    } catch (error: any) {
      // console.log(error.message);
      setErrorMessage(error.message || "Failed to reset password");
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
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmitForm}
          style={{
            display: "flex",
            flexDirection: "column",
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
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="signinput"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              zIndex: "9090",
            }}
            required
          />
          <label htmlFor="" className="label-signin">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="signinput"
            onChange={(e) => setRePassword(e.target.value)}
            required
            style={{
              zIndex: "9090",
            }}
          />
          <p className="pass-text">Must be 8 characters</p>
          {/* Terms and Conditions */}
          <div className="terms-conditions">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                // checked={!!field.value}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4"
                style={{
                  zIndex: "9090",
                }}
              />

              <p className="form-label">
                I agree with the terms and conditions
              </p>
            </div>
          </div>
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
              zIndex: "9090",
            }}
          >
            Reset Password
          </button>
        </form>
      </section>
    </div>
  );
}

export default PasswordReset;
