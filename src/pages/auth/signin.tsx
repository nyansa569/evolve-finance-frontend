import "./auth.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/pngg 1.png";
import { Link } from "react-router-dom";
import {
  loginUser,
  requestOTP,
  sendOTPMessage,
} from "../../services/user_services"; // Import login service function
import { useNavigate } from "react-router-dom";

function SigninPage() {
  const [errorMessage, setErrorMessage] = useState(""); // To capture and display errors
  const [loading, setLoaging] = useState(false); // To capture and display errors
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "Customer",
    },
  });

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: form.getValues("email"),
      password: form.getValues("password"),
      role: "CustomerAdmin",
    };
    // console.log(formData);

    try {
      setLoaging(true);
      const response_login = await loginUser(formData); // Call the login service
      const response_otp = await requestOTP({ email: formData.email }); // Call the login service
      // const response_mail = await requestOTP(); // Call the login service
      // console.log("OTP generated successfully:", response_login);
      // console.log("OTP generated successfully:", response_otp);
      const mail_form = {
        email: response_login.user.email,
        otp: response_otp.data.otp,
        name: response_login.user.name,
        messageType: "signin",
      };
      const response_mail = await sendOTPMessage(mail_form); // Call the login service
      // console.log("OTP sent successfully:", response_mail);
      const userDataToStore = {
        ...mail_form,
        ...formData,
        otpType: "signin",
      };
      // console.log("Response login",response_login)
      // localStorage.setItem("token", response_login.token);

      localStorage.setItem("userData", JSON.stringify(userDataToStore));
      // console.log("OTP sent to user successfully:", response_mail);
      setTimeout(() => {
        navigate("/otp-verification");
      }, 2000); // 2 seconds delay before navigating
      setErrorMessage("");
      setLoaging(false);
    } catch (error: any) {
      // console.log(error.message);
      setLoaging(false);
      setErrorMessage("Failed to log in.");
    }
  };

  return (
    <div className="signin-container">
      <section
        className="inner-signin"
        style={{
          height: "50vh",
          width: "42vw",
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
          }}
        >
          Sign In
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
            className="logo-image"
            style={{
              position: "absolute",
              opacity: "0.1",
              height: "350px",
              width: "42vw",
              zIndex: "0",
            }}
          />
          <div className="form-input">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              {...form.register("email")}
              className="signinput"
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              {...form.register("password")}
              className="signinput"
              required
            />
          </div>
          {errorMessage && (
            <p
              className="error-message"
              style={{ color: "red", marginTop: "10px", textAlign: "center" }}
            >
              {errorMessage}
            </p>
          )}
          <Link
            to={"/forgot-password"}
            className="forgotten-pass"
            style={{
              margin: "10px 0",
              fontSize: "1rem",
              cursor: "pointer",
              zIndex: "90090",
            }}
          >
            Forgotten password?
          </Link>
          {/* Sign Up Button */}

          <button
            className="sign-button"
            type="submit"
            style={{
              fontSize: "1.2rem",
              zIndex: "99",
            }}
          >
            {loading ? (
              <div
                className="loader"
                style={{
                  margin: "auto",
                }}
              ></div>
            ) : (
              "Sign in"
            )}
          </button>

          <p style={{ textAlign: "center", zIndex: "99" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="linktosignup"
              style={{ color: "#D9C368" }}
            >
              Create one
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default SigninPage;

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import "./auth.css";
// import React from "react";
// import { useForm } from "react-hook-form";
// import logo from "../../assets/pngg 1.png";
// import { Link } from "react-router-dom";

// function SigninPage() {
//   const form = useForm({
//     defaultValues: {
//       name: "",
//     },
//   });
//   return (
//     <div className="signin-container">
//       <section className="inner-signin"  style={{
//           height: "30vh",
//           width: "36vw",
//           padding: "1rem",
//         }}>
//         <h2 className="sign-heading">Login</h2>
//         <Form {...form}>
//           <form
//             className="sign-form"
//             style={{
//               width: "100%",
//               height: "32vh",
//             }}
//           >
//             <img
//               src={logo}
//               alt="Logo"
//               className="logo-image"
//               style={{ position: "absolute", opacity: "0.1" }}
//             />
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">Email</FormLabel>
//                   <div className="">
//                     <FormControl>
//                       <Input
//                         placeholder="email"
//                         {...field}
//                         className="signinput"
//                       />
//                     </FormControl>
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">Password</FormLabel>
//                   <div className="">
//                     <FormControl>
//                       <Input
//                         placeholder="password"
//                         {...field}
//                         className="signinput"
//                       />
//                     </FormControl>
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <p className="forgotten-pass">forgotten password?</p>
//             <br />

//             <Button className="sign-button">sign in</Button>
//           </form>
//           <p style={{
//             textAlign:"center"
//           }}>
//             Dont have an account?{" "}{" "}{" "}
//             <Link to="/signup" className="linktosignup" style={{
//               color:"#D9C368"
//             }}>
//               Create one
//             </Link>
//           </p>
//         </Form>
//       </section>
//     </div>
//   );
// }

// export default SigninPage;
