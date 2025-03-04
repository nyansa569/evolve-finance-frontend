import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../services/user_services";
import  SplashScreen  from "../../splashscreen/splashscreen";

// Extend the Window interface to include sessionTimer and inactivityTimer
declare global {
  interface Window {
    sessionTimer?: NodeJS.Timeout;
    inactivityTimer?: NodeJS.Timeout;
  }
}

interface AuthContextType {
  isAuthenticated: boolean;
  signinAuthStaff: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const publicRoutes = [
  "/signin",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/password-reset",
  "/otp-verification",
  "/password-change-success",
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    const role = localStorage.getItem("role") || "";
    const token = localStorage.getItem("token") || "";

    // //console.log("Retrieving token from auth provider: ", token)
    // //console.log("Retrieving role from auth provider: ", role)
    // //console.log("Retrieving userId from auth provider: ", userId)
    
    if (token) {
      const validateToken = async () => {
        try {
          const response = await getUserById(userId, role, token);
          // //console.log("response from auth provider is: ", response)
          if (response?.status === 200) {
            // //console.log("response is successful");
            localStorage.setItem("userEvlvCSM", JSON.stringify(response.data));
            setIsAuthenticated(true);
            // startSessionTimer();
          } else {
            // //console.log("response is not successful");
            logout();
          }
        } catch (error) {
          logout();
        } finally {
          setLoading(false);
        }
      };
      validateToken();
    } else {
      setLoading(false);
      // navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  }, []);

  const signinAuthStaff = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    startSessionTimer();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const startSessionTimer = () => {
    clearTimeout(window.sessionTimer);
    clearTimeout(window.inactivityTimer);

    window.sessionTimer = setTimeout(logout, 30 * 60 * 1000);
    resetInactivityTimer();
  };

  const resetInactivityTimer = () => {
    clearTimeout(window.inactivityTimer);
    window.inactivityTimer = setTimeout(logout, 10 * 60 * 1000);
  };

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signinAuthStaff, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType & { isPublicRoute: (path: string) => boolean } => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const isPublicRoute = (path: string) => publicRoutes.includes(path);

  return { ...context, isPublicRoute };
};