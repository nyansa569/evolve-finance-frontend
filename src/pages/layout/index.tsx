import { Outlet } from 'react-router-dom'
import Header from './header'
import "./layout.css"
function Layout() {
  return (
    <div className='w-full min-h-screen outer-layout'>
        <Header />
        <div className="w-full flex-1 ">
          <Outlet />
        </div>
    </div>
  )
}

export default Layout