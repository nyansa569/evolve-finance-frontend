// import { useState, useEffect } from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import ErrorPage from "./pages/error";
// // import HomePage from "./pages/lobby/pages/home";
// import SigninPage from "./pages/auth/signin";
// import SignupPage from "./pages/auth/signup";
// import NotFound from "./pages/not-found";
// import EmailVerification from "./pages/auth/verify-email";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import PasswordReset from "./pages/auth/password-reset";
// import SplashScreen from "./pages/splashscreen/splashscreen";
// import OTPscreen from "./pages/auth/otp";
// import PasswordChangeSuccess from "./pages/auth/password_change_successful";
// import { routes } from "./routes";
// import Layout from "./pages/layout";
// import DashboardPage from "./pages/dashboard";
// import { getUserById } from "./services/user_services";

// // ProtectedRoute component (authentication check)
// const ProtectedRoute = () => {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Now React tracks it
//   const [loading, setLoading] = useState(true); // Track async loading

//   const userId = localStorage.getItem("userId") || "";
//   const role = localStorage.getItem("role") || "";
//   const token = localStorage.getItem("token") || "";

//   useEffect(() => {
//     console.log("Checking authentication...");
    
//     if (!userId || !role || !token) {
//       console.log("Missing authentication credentials, redirecting...");
//       setError("User not authenticated");
//       setIsAuthenticated(false);
//       setLoading(false);
//       return;
//     }
  
//     getUserById(userId, role, token)
//       .then((data) => {
//         console.log("User data received:", data);
//         setUser(data);
//         setIsAuthenticated(true);
//         console.log("Is authenticated",isAuthenticated)
//         localStorage.setItem("user", JSON.stringify(data));
//       })
//       .catch((err) => {
//         console.error("Error fetching user:", err);
//         setIsAuthenticated(false);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []); 
  

//   // useEffect(() => {
//   //   console.log("Loading the page")
//   //   if (!userId || !role || !token) {
//   //     console.log("User not authorised (missing credentials)");
//   //     setError("User not authenticated");
//   //     setIsAuthenticated(false);
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   setLoading(true); // Start loading while fetching user

//   //   getUserById(userId, role, token)
//   //     .then((data) => {
//   //       console.log("User data received:", data);
//   //       setUser(data);
//   //       setIsAuthenticated(true);
//   //       localStorage.setItem("user", JSON.stringify(data)); // Ensure correct storage
//   //     })
//   //     .catch((err) => {
//   //       console.error("Error fetching user:", err);
//   //       setIsAuthenticated(false);
//   //     })
//   //     .finally(() => {
//   //       setLoading(false);
//   //     });
//   // }, [userId, role, token]); // Dependency array ensures it runs when user data changes

//   // ✅ Show a loading indicator instead of redirecting too soon
//   if (loading) {
//     return <SplashScreen onFinish={() => setLoading(false)} />; 
//   }

//   // ✅ Redirect only when the check is complete
//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }

//   return <Outlet />;
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route errorElement={<ErrorPage redirectTo="/signin" />}>
//       {/* All routes are now protected, including "/" (HomePage) */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<Layout />} />

//         {/* Dashboard Routes */}
//         <Route path="/app/*" element={<Layout />}>
//           <Route index element={<DashboardPage />} />
//           {routes.map((route) => (
//             <Route
//               key={route.path}
//               errorElement={<ErrorPage redirectTo="/app/home" />}
//             >
//               <Route path={route.path} element={<route.component />}>
//                 {route.children?.map((childRoute, i) => (
//                   <Route
//                     key={childRoute.path + i.toString()}
//                     path={childRoute.path}
//                     element={<childRoute.component />}
//                   >
//                     {childRoute.children?.map((subChildRoute, j) => (
//                       <Route
//                         key={subChildRoute.path + j.toString()}
//                         path={subChildRoute.path}
//                         element={<subChildRoute.component />}
//                       />
//                     ))}
//                   </Route>
//                 ))}
//               </Route>

//               {(route.subRoutes ?? []).map((subRoute) => (
//                 <Route key={subRoute.path}>
//                   <Route
//                     path={subRoute.path}
//                     element={<subRoute.component />}
//                   />

//                   {(subRoute.children ?? []).map((childRoute) => (
//                     <Route
//                       key={childRoute.path}
//                       path={childRoute.path}
//                       element={<childRoute.component />}
//                     />
//                   ))}
//                 </Route>
//               ))}
//             </Route>
//           ))}
//         </Route>

//         {/* Catch-all unauthorized routes */}
//         <Route path="*" element={<NotFound redirectTo="/signin" />} />
//       </Route>

//       {/* Public authentication routes */}
//       <Route path="/signin" element={<SigninPage />} />
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="/verify-email" element={<EmailVerification />} />
//       <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//       <Route path="/password-reset" element={<PasswordReset />} />
//       <Route path="/otp-verification" element={<OTPscreen />} />
//       <Route
//         path="/password-change-success"
//         element={<PasswordChangeSuccess />}
//       />

//       {/* Any other undefined route redirects to Signin */}
//       <Route path="*" element={<Navigate to="/signin" replace />} />
//     </Route>
//   )
// );

// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return isLoading ? (
//     <SplashScreen onFinish={() => setIsLoading(false)} />
//   ) : (
//     <RouterProvider router={router} />
//   );
// }

// export default App;

// ! Second

// import { useState, useEffect } from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import ErrorPage from "./pages/error";
// // import HomePage from "./pages/lobby/pages/home";
// import SigninPage from "./pages/auth/signin";
// import SignupPage from "./pages/auth/signup";
// import NotFound from "./pages/not-found";
// import EmailVerification from "./pages/auth/verify-email";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import PasswordReset from "./pages/auth/password-reset";
// import SplashScreen from "./pages/splashscreen/splashscreen";
// import OTPscreen from "./pages/auth/otp";
// import PasswordChangeSuccess from "./pages/auth/password_change_successful";
// import { routes } from "./routes";
// import Layout from "./pages/layout";
// import DashboardPage from "./pages/dashboard";
// import { getUserById } from "./services/user_services";

// // ProtectedRoute component (authentication check)
// const ProtectedRoute = () => {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Now React tracks it
//   const [loading, setLoading] = useState(true); // Track async loading

//   const userId = localStorage.getItem("userId") || "";
//   const role = localStorage.getItem("role") || "";
//   const token = localStorage.getItem("token") || "";

//   useEffect(() => {
//     console.log("Checking authentication...");

//     if (!userId || !role || !token) {
//       console.log("Missing authentication credentials, redirecting...");
//       setError("User not authenticated");
//       setIsAuthenticated(false);
//       setLoading(false);
//       return;
//     }

//     getUserById(userId, role, token)
//       .then((data) => {
//         console.log("User data received:", data);
//         setUser(data);

//         // ✅ Ensure state update happens correctly
//         setIsAuthenticated(() => true); // Using function update to avoid stale state

//         // ✅ Store the user in localStorage
//         localStorage.setItem("user", JSON.stringify(data));
//       })
//       .catch((err) => {
//         console.error("Error fetching user:", err);
//         setIsAuthenticated(() => false); // Ensure proper update
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   console.log("isAuthenticated", isAuthenticated);

//   // ✅ Show a loading indicator instead of redirecting too soon
//   if (loading) {
//     return <SplashScreen onFinish={() => setLoading(false)} />;
//   }

//   // ✅ Redirect only when the check is complete
//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }

//   return <Outlet />;
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route errorElement={<ErrorPage redirectTo="/signin" />}>
//       {/* All routes are now protected, including "/" (HomePage) */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<Layout />} />

//         {/* Dashboard Routes */}
//         <Route path="/app/*" element={<Layout />}>
//           <Route index element={<DashboardPage />} />
//           {routes.map((route) => (
//             <Route
//               key={route.path}
//               errorElement={<ErrorPage redirectTo="/app/home" />}
//             >
//               <Route path={route.path} element={<route.component />}>
//                 {route.children?.map((childRoute, i) => (
//                   <Route
//                     key={childRoute.path + i.toString()}
//                     path={childRoute.path}
//                     element={<childRoute.component />}
//                   >
//                     {childRoute.children?.map((subChildRoute, j) => (
//                       <Route
//                         key={subChildRoute.path + j.toString()}
//                         path={subChildRoute.path}
//                         element={<subChildRoute.component />}
//                       />
//                     ))}
//                   </Route>
//                 ))}
//               </Route>

//               {(route.subRoutes ?? []).map((subRoute) => (
//                 <Route key={subRoute.path}>
//                   <Route
//                     path={subRoute.path}
//                     element={<subRoute.component />}
//                   />

//                   {(subRoute.children ?? []).map((childRoute) => (
//                     <Route
//                       key={childRoute.path}
//                       path={childRoute.path}
//                       element={<childRoute.component />}
//                     />
//                   ))}
//                 </Route>
//               ))}
//             </Route>
//           ))}
//         </Route>

//         {/* Catch-all unauthorized routes */}
//         <Route path="*" element={<NotFound redirectTo="/signin" />} />
//       </Route>

//       {/* Public authentication routes */}
//       <Route path="/signin" element={<SigninPage />} />
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="/verify-email" element={<EmailVerification />} />
//       <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//       <Route path="/password-reset" element={<PasswordReset />} />
//       <Route path="/otp-verification" element={<OTPscreen />} />
//       <Route
//         path="/password-change-success"
//         element={<PasswordChangeSuccess />}
//       />

//       {/* Any other undefined route redirects to Signin */}
//       <Route path="*" element={<Navigate to="/signin" replace />} />
//     </Route>
//   )
// );

// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return isLoading ? (
//     <SplashScreen onFinish={() => setIsLoading(false)} />
//   ) : (
//     <RouterProvider router={router} />
//   );
// }

// export default App;

// ! third
// import { useState, useEffect } from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import ErrorPage from "./pages/error";
// // import HomePage from "./pages/lobby/pages/home";
// import SigninPage from "./pages/auth/signin";
// import SignupPage from "./pages/auth/signup";
// import NotFound from "./pages/not-found";
// import EmailVerification from "./pages/auth/verify-email";
// import ForgotPasswordPage from "./pages/auth/forgot-password";
// import PasswordReset from "./pages/auth/password-reset";
// import SplashScreen from "./pages/splashscreen/splashscreen";
// import OTPscreen from "./pages/auth/otp";
// import PasswordChangeSuccess from "./pages/auth/password_change_successful";
// import { routes } from "./routes";
// import Layout from "./pages/layout";
// import DashboardPage from "./pages/dashboard";
// import { getUserById } from "./services/user_services";

// // ProtectedRoute component (authentication check)
// const ProtectedRoute = () => {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState("");
//   // const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [loading, setLoading] = useState(false);
//   let loading = false;
//   let isAuthenticated = false;

//   const userId = localStorage.getItem("userId") || "";
//   const role = localStorage.getItem("role") || "";
//   const token = localStorage.getItem("token") || "";

//   const fetchUserByID = async () => {
//     loading = true;
//     console.log("Is loading...", loading);
//     try {
//       const response = await getUserById(userId, role, token);
//       console.log("response", response);
//       setUser(response);
//       isAuthenticated = true;
//       console.log("Is authenticated", isAuthenticated);
//       localStorage.setItem("user", JSON.stringify(response));
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       setError("Failed to fetch user data");
//     }
//     loading = false;
//     console.log("Is loading...", loading);
//   };

//   useEffect(() => {
//     if (!userId || !role || !token) {
//       console.log("Missing authentication credentials, redirecting...");
//       setError("User not authenticated");
//       isAuthenticated = false;
//       loading = false;
//       return;
//     }
//     fetchUserByID();
//   }, [userId, role, token]);

//   // ✅ Show a loading indicator instead of redirecting too soon
//   if (loading) {
//     return <SplashScreen onFinish={() => true} />;
//   }
//   // ✅ Redirect only when the check is complete
//   if (!isAuthenticated) {
//     console.log("Final is auth to check", isAuthenticated);
//     return <Navigate to="/signin" replace />;
//   }

//   return <Outlet />;
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
    // <Route errorElement={<ErrorPage redirectTo="/signin" />}>
    //   {/* All routes are now protected, including "/" (HomePage) */}
    //   <Route element={<ProtectedRoute />}>
    //     <Route path="/" element={<Layout />} />

    //     {/* Dashboard Routes */}
    //     <Route path="/app/*" element={<Layout />}>
    //       <Route index element={<DashboardPage />} />
    //       {routes.map((route) => (
    //         <Route
    //           key={route.path}
    //           errorElement={<ErrorPage redirectTo="/app/home" />}
    //         >
    //           <Route path={route.path} element={<route.component />}>
    //             {route.children?.map((childRoute, i) => (
    //               <Route
    //                 key={childRoute.path + i.toString()}
    //                 path={childRoute.path}
    //                 element={<childRoute.component />}
    //               >
    //                 {childRoute.children?.map((subChildRoute, j) => (
    //                   <Route
    //                     key={subChildRoute.path + j.toString()}
    //                     path={subChildRoute.path}
    //                     element={<subChildRoute.component />}
    //                   />
    //                 ))}
    //               </Route>
    //             ))}
    //           </Route>

    //           {(route.subRoutes ?? []).map((subRoute) => (
    //             <Route key={subRoute.path}>
    //               <Route
    //                 path={subRoute.path}
    //                 element={<subRoute.component />}
    //               />

    //               {(subRoute.children ?? []).map((childRoute) => (
    //                 <Route
    //                   key={childRoute.path}
    //                   path={childRoute.path}
    //                   element={<childRoute.component />}
    //                 />
    //               ))}
    //             </Route>
    //           ))}
    //         </Route>
    //       ))}
    //     </Route>

    //     {/* Catch-all unauthorized routes */}
    //     <Route path="*" element={<NotFound redirectTo="/signin" />} />
    //   </Route>

    //   {/* Public authentication routes */}
    //   <Route path="/signin" element={<SigninPage />} />
    //   <Route path="/signup" element={<SignupPage />} />
    //   <Route path="/verify-email" element={<EmailVerification />} />
    //   <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    //   <Route path="/password-reset" element={<PasswordReset />} />
    //   <Route path="/otp-verification" element={<OTPscreen />} />
    //   <Route
    //     path="/password-change-success"
    //     element={<PasswordChangeSuccess />}
    //   />

    //   {/* Any other undefined route redirects to Signin */}
    //   <Route path="*" element={<Navigate to="/signin" replace />} />
    // </Route>
//   )
// );

// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   return isLoading ? (
//     <SplashScreen onFinish={() => setIsLoading(false)} />
//   ) : (
//     <RouterProvider router={router} />
//   );
// }

// export default App;


//! Auth provider one
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserById } from "../../../services/user_services";
// import { SplashScreen } from "../../splashscreen/splashscreen";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("userId") || "";
//     const role = localStorage.getItem("role") || "";
//     const token = localStorage.getItem("token") || "";
//     if (token) {
//       // Simulate token validation with the server
//       const validateToken = async () => {
//         try {
//           // Replace with actual API call to validate token
//           const response = await getUserById(userId, role, token);

//           if (response.data.status === "success") {
//             setIsAuthenticated(true);
//             startSessionTimer();
//           } else {
//             localStorage.removeItem("token");
//             localStorage.removeItem("userId");
//             setIsAuthenticated(false);
//             navigate("/signin");
//           }
//         } catch (error) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userId");
//           setIsAuthenticated(false);
//           navigate("/signin");
//         } finally {
//           setLoading(false);
//         }
//       };

//       validateToken();
//     } else {
//       setLoading(false);
//       navigate("/signin");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const handleActivity = () => {
//       resetInactivityTimer();
//     };

//     window.addEventListener("mousemove", handleActivity);
//     window.addEventListener("keypress", handleActivity);

//     return () => {
//       window.removeEventListener("mousemove", handleActivity);
//       window.removeEventListener("keypress", handleActivity);
//     };
//   }, []);

//   const signinAuthStaff = (token) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//     startSessionTimer();
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setIsAuthenticated(false);
//     navigate("/signin");
//   };

//   const startSessionTimer = () => {
//     // Clear any existing timers
//     clearTimeout(window.inactivityTimer);
//     clearTimeout(window.sessionTimer);

//     // Set a timer for 30 minutes to expire the session
//     window.sessionTimer = setTimeout(logout, 30 * 60 * 1000);

//     // Set a timer for 10 minutes of inactivity
//     resetInactivityTimer();
//   };

//   const resetInactivityTimer = () => {
//     clearTimeout(window.inactivityTimer);
//     window.inactivityTimer = setTimeout(logout, 10 * 60 * 1000);
//   };

//   if (loading) {
//     return <SplashScreen onFinish={() => setLoading(false)} />; // Or any loading indicator you prefer
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, signinAuthStaff, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

