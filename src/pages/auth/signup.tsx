import "./auth.css";
import { useState } from "react";
import logo from "../../assets/pngg 1.png";
import { Link } from "react-router-dom";
import { requestOTP, sendOTPMessage } from "../../services/user_services"; // Import the createUser service function
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [errorMessage, setErrorMessage] = useState(""); // To capture and display errors
  const [name, setName] = useState("");
  const [sName, setsName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoaging] = useState(false); // To capture and display errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
      setLoaging(true);
      e.preventDefault();
    const form = {
      name: name + " " + sName,
      contact,
      email,
      password,
      companyName,
      role: "CustomerAdmin",
    };

    // console.log(form);

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
    try {
      const response_otp = await requestOTP({ email });
      const mail_form = {
        email,
        otp: response_otp.data.otp,
        name: name + " " + sName,
        messageType: "signup",
      };
      const response_mail = await sendOTPMessage(mail_form); // Call the login service
      const userDataToStore = {
        ...form,
        otp: response_otp.data.otp,
        otpType: "signup",
      };

      // 🔹 Navigate to the next page after success
      localStorage.setItem("userData", JSON.stringify(userDataToStore));
      setTimeout(() => {
        navigate("/otp-verification");
      }, 2000); // 2 seconds delay before navigating

      // const response = await createUser(form);
      // console.log("User created successfully:", response_otp);
      // console.log("Mail sent successfully:", response_mail);
      setErrorMessage("");
      setLoaging(false);
    } catch (error: any) {
      // console.log(error.message);
      setErrorMessage(error.message || "Failed to create user.");
      setLoaging(false);
    }
  };

  return (
    <div className="signin-container">
      <section
        className="inner-signin"
        style={{
          // height: "55vh",
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
          Sign Up
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
          <div className="user-names">
            {/* First Name */}
            <div className="user-name">
              <label htmlFor="" className="label-signin">
                First Name
              </label>
              <input
                placeholder="first name"
                className="signinput nameinput"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="user-name">
              <label htmlFor="" className="label-signin">
                Last Name
              </label>
              <input
                placeholder="last name"
                className="signinput nameinput"
                onChange={(e) => setsName(e.target.value)}
                required
              />
            </div>
          </div>
          <label htmlFor="" className="label-signin">
            Phone number
          </label>
          <input
            placeholder="phone number"
            className="signinput"
            type="phone"
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <label htmlFor="" className="label-signin">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            className="signinput"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="" className="label-signin">
            Company Name
          </label>
          <input
            type="text"
            placeholder="company name"
            className="signinput"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <label htmlFor="" className="label-signin">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="signinput"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="" className="label-signin">
            Retype Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="signinput"
            onChange={(e) => setRePassword(e.target.value)}
            required
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

          {/* Login Redirect */}
          <br />
          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              to="/signin"
              className="linktosignup"
              style={{ color: "#D9C368" }}
            >
              Log in
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default SignupPage;

// // import { Button } from "@/components/ui/button";
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
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import logo from "../../assets/pngg 1.png";
// import { Link } from "react-router-dom";
// import { createUser } from "../services/user_services"; // Import the createUser service function

// function SignupPage() {
//   const [errorMessage, setErrorMessage] = useState(""); // To capture and display errors
//   const form = useForm({
//     defaultValues: {
//       name: "",
//       sName: "",
//       contact: "",
//       email: "",
//       password: "",
//       userId: "",
//       role: "Customer", // Default role
//       companyName: "", // Optional for some roles
//       terms: "",
//     },
//   });

//   const handleSubmitForm = async (data: any) => {
//     const { name, contact, email, password, userId, role, companyName } = data;
//     console.log(data);
//     try {
//       // Call the createUser function
//       const response = await createUser(
//         name,
//         contact,
//         email,
//         password,
//         userId,
//         role,
//         companyName
//       );
//       console.log("User created successfully:", response);
//       // You can redirect or show success message here
//     } catch (error: any) {
//       console.log(error.message);
//       setErrorMessage(error.message || "Failed to create user.");
//     }
//   };

//   return (
//     <div className="signin-container">
//       <section
//         className="inner-signin"
//         style={{
//           height: "55vh",
//           width: "43vw",
//           padding: "1rem",
//           position: "relative",
//         }}
//       >
//         <h2 className="sign-heading">Sign Up</h2>
//         <br />
//         <br />
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <Form {...form}>
//           <form
//             className="sign-form"
//             onSubmit={form.handleSubmit(handleSubmitForm)}
//             style={{
//               paddingTop: "5rem",
//               width: "100%",
//               height: "40vh",
//             }}
//           >
//             <img
//               src={logo}
//               alt="Logo"
//               className=""
//               style={{
//                 position: "absolute",
//                 opacity: "0.1",
//                 height: "350px",
//                 zIndex: "1",
//               }}
//             />
//             <div className="user-names">
//               {/* First Name */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem className="form-input">
//                     <FormLabel className="form-label">First Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="First name"
//                         {...field}
//                         className="signinput nameinput"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Last Name */}
//               <FormField
//                 control={form.control}
//                 name="sName"
//                 render={({ field }) => (
//                   <FormItem className="form-input">
//                     <FormLabel className="form-label">Last Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Last name"
//                         {...field}
//                         className="signinput nameinput"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Contact */}
//             <FormField
//               control={form.control}
//               name="contact"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">Contact</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Contact number"
//                       {...field}
//                       className="signinput"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Email */}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Email"
//                       {...field}
//                       className="signinput"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Password */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Password"
//                       {...field}
//                       className="signinput"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <p className="pass-text">Must be 8 characters</p>

//             {/* UserId */}
//             <FormField
//               control={form.control}
//               name="userId"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">User ID</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="User ID"
//                       {...field}
//                       className="signinput"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Role */}
//             <FormField
//               control={form.control}
//               name="role"
//               render={({ field }) => (
//                 <FormItem className="form-input">
//                   <FormLabel className="form-label">Role</FormLabel>
//                   <FormControl>
//                     <select {...field} className="signinput">
//                       <option value="Customer">Customer</option>
//                       <option value="CustomerAdmin">CustomerAdmin</option>
//                       <option value="EvolveAdmin">EvolveAdmin</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Company Name (only for "CustomerAdmin") */}
//             {form.watch("role") === "CustomerAdmin" && (
//               <FormField
//                 control={form.control}
//                 name="companyName"
//                 render={({ field }) => (
//                   <FormItem className="form-input">
//                     <FormLabel className="form-label">Company Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Company Name"
//                         {...field}
//                         className="signinput"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}

//             {/* Terms and Conditions */}
//             <div className="terms-conditions">
//               <FormField
//                 control={form.control}
//                 name="terms"
//                 render={({ field }) => (
//                   <FormItem className="form-input">
//                     <div className="flex items-center gap-2">
//                       <FormControl>
//                         <input
//                           type="checkbox"
//                           checked={!!field.value}
//                           onChange={(e) => field.onChange(e.target.checked)}
//                           className="w-4 h-4"
//                         />
//                       </FormControl>
//                       <FormLabel className="form-label">
//                         I agree with the terms and conditions
//                       </FormLabel>
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Sign Up Button */}
//             <Button
//               className="sign-button"
//               onClick={() => console.log("Hello worrld")}
//             >
//               Sign up
//             </Button>

//             {/* Login Redirect */}
//             <br />
//             <p style={{ textAlign: "center" }}>
//               Already have an account?{" "}
//               <Link
//                 to="/signin"
//                 className="linktosignup"
//                 style={{ color: "#D9C368" }}
//               >
//                 Log in
//               </Link>
//             </p>
//           </form>
//         </Form>
//       </section>
//     </div>
//   );
// }

// export default SignupPage;
