import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <div className="">
          <Outlet />
        </div>
    </div>
  )
}

export default Layout