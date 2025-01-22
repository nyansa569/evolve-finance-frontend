import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error'
import LobbyLayout from './pages/lobby/layout'
import HomePage from './pages/lobby/pages/home'
import SigninPage from './pages/auth/signin'
import SignupPage from './pages/auth/signup'
import Layout from './pages/dashboard/layout'
import DashboardPage from './pages/dashboard/pages/dashboard'
import { routes } from './routes'
import NotFound from './pages/not-found'
import EmailVerification from './pages/auth/verify-email'
import ForgotPasswordPage from './pages/auth/forgot-password'
import PasswordReset from './pages/auth/password-reset'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage redirectTo="/" />}>
      <Route path={"/*"} element={<LobbyLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} /> 
      </Route>

      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      <Route path="/app/*" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            errorElement={<ErrorPage redirectTo="/app/home" />}
          >
            <Route path={route.path} element={<route.component />}>
              {route.children?.map((childRoute, i) => (
                <Route
                  key={childRoute.path + i.toString()}
                  path={childRoute.path}
                  element={<childRoute.component />}
                >
                  {childRoute.children?.map((subChildRoute, j) => (
                    <Route
                      key={subChildRoute.path + j.toString()}
                      path={subChildRoute.path}
                      element={<subChildRoute.component />}
                    />
                  ))}
                </Route>
              ))}
            </Route>

            {(route.subRoutes ?? []).map((subRoute) => (
              <Route key={subRoute.path}>
                <Route path={subRoute.path} element={<subRoute.component />} />

                {(subRoute.children ?? []).map((childRoute) => (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={<childRoute.component />}
                  />
                ))}
              </Route>
            ))}
          </Route>
        ))}

        <Route path="*" element={<NotFound redirectTo="/app/home" />} />
      </Route>

      <Route
        path="*"
        element={<NotFound containerClassName="h-dvh" redirectTo="/" />}
      />
    </Route>,
  ),

)

function App() {
  return <RouterProvider router={router} />;
}

export default App;
