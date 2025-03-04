import { Link, useLocation } from 'react-router-dom'

type NavlinkProp = {
    label: string;
    link: string;
    className?: string;
  }

function NavItem({link, label,  className}: NavlinkProp) {
    const location = useLocation()
  return (
    <Link 
        to={`${link??location.pathname}`} 
        className={`relative w-full px-4 py-2 text-base justify-between flex items-center text-gray-400 border border-gray-400 rounded-xl ${location.pathname === link &&'text-secondary-500 bg-primary-400 font-semibold border-none'} ${className}`}>
        <div className="flex items-center">
            {label}
        </div>
    </Link>
  )
}

export default NavItem
