import { ReactNode } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ErrorPage from "./pages/error";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import NotFound from "./pages/not-found";
import EmailVerification from "./pages/auth/verify-email";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import PasswordReset from "./pages/auth/password-reset";
import OTPscreen from "./pages/auth/otp";
import PasswordChangeSuccess from "./pages/auth/password_change_successful";
import { routes } from "./routes";
import Layout from "./pages/layout";
import DashboardPage from "./pages/dashboard";
import { AuthProvider, useAuth } from "./pages/auth/authprovider";
import "./App.css"

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isPublicRoute } = useAuth();
  const location = useLocation();

  if (isAuthenticated && isPublicRoute(location.pathname)) {
    return <Navigate to="/app/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/app/" replace />} />
        <Route path="/app/*" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            >
              {route.children?.map((childRoute) => (
                <Route
                  key={childRoute.path}
                  path={childRoute.path}
                  element={<childRoute.component />}
                />
              ))}
            </Route>
          ))}
        </Route>

        {/* Public authentication routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <EmailVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/password-reset"
          element={
            <PublicRoute>
              <PasswordReset />
            </PublicRoute>
          }
        />
        <Route
          path="/otp-verification"
          element={
            <PublicRoute>
              <OTPscreen />
            </PublicRoute>
          }
        />
        <Route
          path="/password-change-success"
          element={<PasswordChangeSuccess />}
        />

        {/* Error handling & Not Found */}
        <Route path="/error" element={<ErrorPage redirectTo="/app/home" />} />
        <Route path="*" element={<NotFound redirectTo="/signin" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
